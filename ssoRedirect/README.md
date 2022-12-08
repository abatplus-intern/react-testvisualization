This python script makes local development with enabled OIDC possible.

You must have installed python on your local machine. After that start the script with `python daimlerssoredirect.py`.

You have to log in with your Daimler CD user credentials. The access token will be injected in url after redirect from `http://localhost:8089` to `http://localhost:8088`. Also you must start the react applicaton on port 8089. For debugging you can use the configured debug profile of `launch.json` called `Launch OIDC Chrome against localhost`.

In our react code there is a context provider named `OidcBaererProxyProvider`. This context provider takes care of getting the access token. Following the access token is used in all http request as `Authorization Baerer Token`. You can see that in our `restUtils.ts`.
