# template-react
## Purpose

This is a template for new web UI projects, based on **React**, **Material UI** and **Mercedes-Benz CI**.

## Dependencies

The intention regarding dependencies is, to keep them minimal.

-   [React](https://www.npmjs.com/package/react)
-   Material UI [Core](https://www.npmjs.com/package/@material-ui/core) & [Icons](https://www.npmjs.com/package/@material-ui/icons)
-   [Typescript 4](https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/)
-   [Webpack 5](https://www.npmjs.com/package/webpack)
-   [Babel](https://www.npmjs.com/package/Babel)
-   [Jest](https://jestjs.io/docs/tutorial-react) with [enzyme](https://enzymejs.github.io/enzyme/) for unit testing
-   [Cypress](https://docs.cypress.io/guides/overview/why-cypress) for integration testing
    -   Cypress component testing is in `Alpha` status and hence not used, see [docs](https://docs.cypress.io/guides/component-testing/introduction).
-   [Prettier](https://www.npmjs.com/package/prettier) for code formatting/linting

</br>

## HOW-TO

### Setup locally for developers
Install dependencies and tools to work with package scripts

```sh
npm install
```

(in case you get an `npm ERR! code E401; npm ERR! Incorrect or missing password.` run:
```sh
npm run artifactory:login
```
for adding your credentials for `https://artifacts.i.mercedes-benz.com`. Use your personal API-KEY from there instead of a password)
</br>
</br>

### Work with with the React App

Run the app locally in development mode

```sh
npm start
```

Run all unit tests locally

```sh
npm run test
```

Run all unit tests in watch-mode

```sh
npm run test:watch
```

Run all unit tests and create a test-coverage report

```sh
npm run test:coverage
```

Run a local production build (only for testing production build ⚠️)

```sh
npm run build
```

### Setup daimler npm registry
For `@mercedes-benz` npm packages, developers need to setup their local environment to be able to install these packages from the Daimler artifactory.

See [.npmrc](./.npmrc) for instructions how to do so.

### Build and run Docker images

Build the image locally

```sh
docker build -t <image-tag> .
```

Run the image locally, on port 8080

```sh
docker run -d -p 8080:80 <image-tag>
```

### Add translation texts

1. Register new translation key in `src/common/i18n/I18nTexts.ts`
2. Add key with translation to the respective JSON files in `src/common/i18n/<language>`
3. Use the `useTranslation` hook in the component and pass the key to it, e.g.:

```tsx
const translate = useTranslation();
return (<label>{translate('translation-key')}</label>);
```

### Test a component

We use [Jest](https://jestjs.io) as a test runner and [enzyme](https://enzymejs.github.io/enzyme/) to help with component testing.
With enzyme, we use [Shallow Rendering](https://enzymejs.github.io/enzyme/docs/api/shallow.html) to focus on testing the component at hand (and not its children).

\*\*Note: There is no official support form React 17 with enzyme yet ([see this GitHub issue](https://github.com/enzymejs/enzyme/issues/2429)), hence we use a widely adopted [community adapter](https://www.npmjs.com/package/@wojtekmaj/enzyme-adapter-react-17).

### Generate new API models

The [openapi-generator](https://github.com/OpenAPITools/openapi-generator) is used to generate APIs based on a backend service's API definition. It will always delete and re-create existing APIs.
Generate new APIs with 

```sh
cd api
npx ts-node generator.ts <service-name> <api-endpoint> <service-version>
// e.g. npx ts-node generator myService https://xxx.app.corpintra.net/ v1
```

These arguments in the example above are also the default values. Use package script `api:generate` as a short-form to run the generator with default parameters.

Or use the debug target `Launch API Generator` (uses default params/arguments)

---
## Initial setup
- when using **atlassian JIRA** extension:
    edit `.vscode/settings.json`: search for the "atlascode.jira" settings and replace all occurrences of **XXX** with the abbreviation of your project used in JIRA (like 'REC' for recon, 'EPS' ...)
- set up your environments (LOCAL, DEV, INT, PROD) in `public/apiConfig.js`
  - change the key of the environment your want to use to `env`
  - import configuration in components via importing the default export from `src/configuration/configuration`
---
## Fruther information you may find at certain locations

- [./src/common/i18n/README.md](./src/common/i18n/README.md)
- [./ssoRedirect/README.md](./src/ssoRedirect/README.md)


## Code-Guide
See GitHub page for the **[React-Frontend Coding guide (DOs and DON&lsquo;Ts)](https://pages.git.daimler.com/plusng/template-react/)**

---
## Accessing Dev-Server running in WSL2 from another PC/mobile device

WSL has its own network adapter. So if you need to access the Dev-Server from another device in your local network you need to do the following two steps:
1. Add **portforwarding** to WSL:
    - open a powershell as administrator
    - add the fowarding rule like: (replace `192.168.178.42` by the ip addess of your PC)
    ```ps
    netsh interface portproxy add v4tov4 listenport=3000 listenaddress=192.168.178.42 connectport=3000 connectaddress=$($(wsl hostname -I).Trim())
    ```      
    - see if the rule was properly set:
    ```ps
    netsh interface portproxy show v4tov4
    ```
    (if you like to remove/delete later on the portforwarding use "`netsh interface portproxy delete v4tov4 listenport=3000 listenaddress=192.168.178.42`")

2. Add a **firewall rule** to the windows firewall allowing connections to port 3000:
    - open "Windows Defender Firewall" settings by running `wf.msc` (e.g. Windows + R)
    - select "Incoming Rules" (on the left)
    - click "New rule..." (on the right)
      - select "Port" --> Next
      - enter "3000" --> Next
      - keep "Allow connection" --> Next
      - deselect "Public" --> Next
      - gice it a name like "Web-Debug on Port 3000" --> Done

