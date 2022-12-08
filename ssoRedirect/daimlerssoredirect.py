#!/usr/bin/env python3

'''
First Installation?
Then execute the following command before using this script:
python -m pip install -r requirements.txt
'''

__author__    = "dkahl"
__copyright__ = "Copyright 2020, abat+ GmbH"
__version__   = "0.0.1"
__email__     = "dustin.kahl@abatplus.de"
__status__    = "Beta"

#standard
import sys
import time
import base64
import getpass
import argparse

from urllib3.exceptions import InsecureRequestWarning

#requirements
import requests
from flask import Flask, make_response, redirect

#configure global
requests.packages.urllib3.disable_warnings(category=InsecureRequestWarning)

#globals
g_is_python3 = (3, 0) <= sys.version_info

g_return_value_success = 0
g_return_value_error = 1

g_status_code_login = 200
g_status_code_redirected_login = 200
g_status_code_user_service = 200

g_cookie_name_xsrf_token = "XSRF-TOKEN"
g_cookie_name_tex = "TEX"

g_cookie_value_tex = None

g_app = Flask(__name__)

def perfom_sso_login_and_use_cookie_to_get_access_token(baseurl, username, password):
    session = requests.Session()

    delta = 0.0

    url = "/".join((baseurl, "app/"))

    t0 = time.time()
    resp = session.get(url, verify=False)
    delta += time.time() - t0

    if g_status_code_login != resp.status_code:
        print("Expected status code {} from login but got {}.".format(g_status_code_login, resp.status_code))
        return None

    if not resp.url:
        print("Got no redirect url from login.")
        return None

    cookies = session.cookies.get_dict()
    if not g_cookie_name_xsrf_token in cookies:
        print("Warning: Expected the cookie with name {} to be inside of the cookie jar but got {}.".format(g_cookie_name_xsrf_token, cookies))
        return None

    url = resp.url
    xsrf = cookies.get(g_cookie_name_xsrf_token)

    #import urlparse
    #parsed = urlparse.urlparse(url)
    #urlparse.parse_qs(parsed.query)['def']

    import urllib.parse as urlparse
    from urllib.parse import parse_qs
    parsed = urlparse.urlparse(url)
    result = parse_qs(parsed.query)
    resume = result.get("resume")[0]

    params = {
        "_csrf": xsrf,
        "pingResume": resume,
        "username": username,
        "password": password
    }

    t0 = time.time()
    resp = session.post(url, params=params, verify=False)
    delta += time.time() - t0

    if g_status_code_redirected_login != resp.status_code:
        print("Expected status code {} from redirected login but got {}.".format(g_status_code_redirected_login, resp.status_code))
        return None

    cookies = session.cookies.get_dict()
    if not g_cookie_name_tex in cookies:
        print("Warning: Expected the cookie with name {} to be inside of the cookie jar but got {}.".format(g_cookie_name_tex, cookies))
        return None
        
    #return cookies.get(g_cookie_name_tex)
    
    url = "/".join((baseurl, "user", "api", "v1", "info"))
    
    t0 = time.time()
    resp = session.get(url, verify=False)
    delta += time.time() - t0
    
    if g_status_code_user_service != resp.status_code:
        print("Expected status code {} from login but got {}.".format(g_status_code_user_service, resp.status_code))
        return None
    
    user = resp.json()
    
    access_token = user.get("accessToken")
    if not access_token:
        print("Expected a valid access token in the response of the user service but got none.")
        return None
    
    return access_token

@g_app.route("/")
def set_cookie_and_redirect():
    resp = make_response(redirect("https://localhost:8088?auth={}".format(g_cookie_value_tex)))
    #resp = make_response(redirect("https://plus-recon-dev.de050.corpintra.net"))
    
    #resp.headers["Authorization"] = "Bearer {}".format(g_cookie_value_tex)
    #resp.set_cookie(g_cookie_name_tex, g_cookie_value_tex)
    #resp.set_cookie(g_cookie_name_tex, g_cookie_value_tex, domain="localhost")
    return resp

def main():
    parser = argparse.ArgumentParser()
    
    parser.add_argument("-b", "--baseurl", help="the base url from which you will get redirected if you're not logged in.", default="https://plus-recon-int.de050.corpintra.net")
    parser.add_argument("-u", "--username", help="the username of the CD-User. insecure recommended to use console input instead.")
    parser.add_argument("-p", "--password", help="the password of the CD-User. insecure recommended to use console input instead.")

    args = parser.parse_args()

    username = args.username
    if not username:
        try:
            prompt = "Please enter the username of your Daimler CD-User: "
            username = input(prompt) if g_is_python3 else raw_input(prompt)
        except:
            return 1
    
    if not username:
        print("Warning: No username was entered. The username is set to empty string.")
    
    password = args.password
    if not password:
        try:
            password = getpass.getpass("Please enter the password of your Daimler CD-User: ")
        except:
            return 1
    
    if not password:
        print("Warning: No password was entered. The password is set to empty string.")
    
    access_token = perfom_sso_login_and_use_cookie_to_get_access_token(args.baseurl, username, password)
    if not access_token:
        return 1
    
    global g_cookie_value_tex
    g_cookie_value_tex = access_token

    print("Got Authorization Bearer {}".format(access_token))
    
    g_app.run(host="0.0.0.0", port=8089)

    return 0

if __name__ == "__main__":
    sys.exit(main())