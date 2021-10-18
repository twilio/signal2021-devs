# Talon 1 Microsite

## About

This project was built as part of the [SIGNAL 2021 Developer Spotlight Session][signal session]. It served as the demo application that we developed on during the session but it's also the code that powers the actual [Talon 1] microsite.

## Supercharge your Twilio Development

This page serves as a collection of all of the resources and demo code covered during the [SIGNAL session]. If you want to try out the different tools you can use the [Twilio CLI] and SIGNAL [Developer Mode] and it's `checkout` functionality by copy pasting the respective code snippet at the beginning of each section which will open all relevant resources or clone the respective projects onto your system.

**Example**:

```bash
twilio signal:checkout 6f7d66b
```

### Prototyping

```bash
twilio signal:checkout b380e61
```

**Covered Products**

- [Twilio CodeExchange][codeexchange] - Your go-to spot to find prototypes and proof of concept applications
- [Quick Deploy] - Find applications that you can deploy with the push of a button into your own Twilio account
- [Verified Broadcast Template] - The template we used during the session to build a subscribe/notify functionality
- [Twilio Functions]

**Source Code**

- [Verified Broadcast Source Code]

**Relevant Docs**

- [Twilio Functions Docs][twilio functions]
- [Available Runtime Handler Versions][runtime handler]
- [Request Headers and Cookies Access][headers cookies]

### Local Development

```bash
twilio signal:checkout 051c794
```

**Covered Products**

- [Twilio CLI]
- [Serverless Toolkit]
- [Twilio Paste]

**Source Code**

_Setup Project_

```
twilio serverless:init example --template=verified-broadcast
```

_Run local development_

```
cd example
twilio serverless:start
```

_Setup build tools and scripts in your package.json_

```bash
npm install --save-dev react react-dom prop-types parcel-bundler concurrently ncp rimraf
```

In your [`package.json`](package.json)

```diff
  "scripts": {
+    "prebuild": "rimraf dist"
+    "build": "parcel build src/index.html -d dist",
+    "postbuild": "ncp assets dist",
+    "predeploy": "npm run build",
    "deploy": "twilio-run deploy",
+    "start:web": "parcel watch src/index.html -d dist",
+    "start:twilio": "twilio-run",
+    "prestart": "ncp assets dist",
-    "start": "twilio-run",
+    "start": "concurrently npm:start:web npm:start:twilio"
  },
```

_Modify [`.twilioserverlessrc`](.twilioserverlessrc) to specify an output directory for Assets_

```diff
{
	"commands": {},
	"environments": {},
	"projects": {},
	// "assets": true 	/* Upload assets. Can be turned off with --no-assets */,
-	// "assetsFolder": "" 	/* Specific folder name to be used for static assets */,
+	"assetsFolder": "dist" 	/* Specific folder name to be used for static assets */,
	// "buildSid": null 	/* An existing Build SID to deploy to the new environment */,
```

_Twilio Paste UI Code_

[Checkout the code in the `src/` directory ](src/)

**Relevant Docs**

- [Twilio CLI Docs][twilio cli]
- [Serverless Toolkit Docs][serverless toolkit]
- [Twilio Paste Getting Started][paste quickstart]
- [Using a Front-End Framework with Twilio Serverless][frontend serverless]
- [Using Functions with TypeScript][functions ts]

### DevOps | CI/CD

```bash
twilio signal:checkout 7b42975
```

**Covered Products**

- [Twilio Provider][terraform provider] for [Terraform]
- [Twilio Open API Specs][twilio openapi]
- [Serverless Toolkit] (specifically [`twilio-run`][twilio-run])

**Source Code**

_Terraform script for establishing resources_

- [Check out the `main.tf` file](main.tf)

_Deployment process_

- [Check out the `deploy.bash` script](scripts/deploy.bash)

_Automatic End-to-End (E2E) test with Mock API_

- [`ci-test-server.js` for the script that sets up the different servers and runs Cypress](scripts/ci-test-server.js)
- [`e2e_spec.js` for the actual Cypress Test](cypress/integration/e2e_spec.js)
- [`MockHttpClient.js` for the HTTP Client to use in the Twilio library](scripts/utils/MockHttpClient.js)
- [`prism-server.js` for the code to set up a mock server using OpenAPI specs](scripts/utils/prism-server.js)

_GitHub Actions CI/CD Example_

- [Check out the `main.yml` file](.github/workflows/main.yml)

**Relevant Docs**

- [Mock API Generation Docs][mockapi]
- [OpenAPI Structure Docs][openapi docs]
- [Terraform Examples]
- [Guide on using the Serverless Toolkit in CI/CD][functions cicd]
- [Guide for using Terraform and Twilio Serverless][terraform serverless]

### Monitoring Insights

```bash
twilio signal:checkout 797e820
```

**Covered Products**

- [Twilio Event Streams][event streams]
- [Segment Twilio Developer Plan][twilio developer plan]
- [Segment Developer Toolkit]
- [Segment Dashboard]

**Source Code**

_Create track events from the UI_

In [`useOtp.js`](src/hooks/useOtp.js):

```diff
  function sendVerifyToken(phoneNumber) {
+    analytics.track('Start subscription');

    fetch('/start-verify', {
```

_Retrieving an anonymous ID to send to the backend_

In [`useOtp.js`](src/hooks/useOtp.js):

```diff
+    let anonymousId;
+    try {
+      anonymousId = analytics.user().anonymousId();
+    } catch (err) {
+      anonymousId = undefined;
+    }

    fetch('/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
-      body: JSON.stringify({ to: phoneNumber, code, tags }),
+      body: JSON.stringify({ to: phoneNumber, code, tags, anonymousId }),
    })
```

_Create a track event from Twilio Functions_

In [`subscribe.js`](functions/subscribe.js)

```diff
    } else {
+      if (event.anonymousId) {
+        analytics.track({
+          anonymousId: event.anonymousId,
+          event: 'Failed Verification',
+        });
+        await analytics.flush();
+      }
      console.error('Incorrect token.');
      response.setStatusCode(401);
```

**Relevant Docs**

- [Event Streams Docs]
- [Analytics.js 2.0 docs][segment js docs]
- [Analytics for Node.js docs][segment node docs]

### Other Tools

- **International Docs**:
  - 🇩🇪 &nbsp;[Deutsche/German Docs][docs de] `a4854ba`
  - 🇫🇷 &nbsp;[Français/French Docs][docs fr] `afad3fd`
  - 🇯🇵 &nbsp;[日本語/Japanese Docs][docs ja] `1754b6b`
- [Twilio Microvisor Pilot Docs][microvisor] `f10ab46`
- [Twilio Go Client][go client] `236261c`
- [Twilio Video Insights][video insights] `8509081`

## Run the demo application

For a full set of instructions on how to set up this application for local development check out the [contributing guide](CONTRIBUTING.md).

## License

MIT

[signal session]: https://signal.twilio.com/sessions/647473
[developer mode]: https://twil.io/signal-developer-mode
[twilio functions]: https://www.twilio.com/docs/runtime?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[serverless toolkit]: https://www.twilio.com/docs/labs/serverless-toolkit?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[terraform provider]: https://github.com/twilio/terraform-provider-twilio
[codeexchange]: https://www.twilio.com/code-exchange?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[quick deploy]: https://www.twilio.com/code-exchange?q=&f=serverless&utm_source=github&utm_medium=readme&utm_campaign=signal2021
[signal 2021]: https://signal.twilio.com
[talon 1]: https://talon1.twil.io
[segment]: https://segment.com?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[segment dashboard]: https://app.segment.com?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[twilio developer plan]: https://segment.com/twilio-developer-plan/?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[segment developer toolkit]: https://segment.com/product/developer-toolkit/?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[verified broadcast template]: https://www.twilio.com/code-exchange/verified-broadcast-sms?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[twilio cli]: https://www.twilio.com/docs/twilio-cli/quickstart?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[mock api guide]: https://www.twilio.com/docs/openapi/?utm_source=github&utm_medium=readme&utm_campaign=signal2021mock-api-generation-with-twilio-openapi-spec
[twilio openapi]: https://github.com/twilio/twilio-oai/
[verified broadcast source code]: https://github.com/twilio-labs/function-templates/tree/main/verified-broadcast
[runtime handler]: https://www.twilio.com/docs/runtime/runtime-handler?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[headers cookies]: https://www.twilio.com/docs/runtime/functions/headers-and-cookies?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[twilio paste]: https://paste.twilio.design
[paste quickstart]: https://paste.twilio.design/getting-started/engineering
[terraform]: https://www.terraform.io/
[installing terraform]: https://learn.hashicorp.com/tutorials/terraform/install-cli
[twilio-run]: https://npm.im/twilio-run
[mockapi]: https://www.twilio.com/docs/openapi/mock-api-generation-with-twilio-openapi-spec?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[openapi docs]: https://www.twilio.com/docs/openapi/structure-of-twilio-openapi-spec?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[terraform examples]: https://github.com/twilio/terraform-provider-twilio/tree/main/examples
[functions cicd]: https://www.twilio.com/docs/labs/serverless-toolkit/guides/continous-deployment?utm_source=github&utm_medium=readme&utm_campaign=signal2021continous-deployment
[functions ts]: https://www.twilio.com/docs/labs/serverless-toolkit/guides/typescript?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[event streams]: https://www.twilio.com/event-streams?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[event streams docs]: https://www.twilio.com/docs/events?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[segment js docs]: https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[segment node docs]: https://segment.com/docs/connections/sources/catalog/libraries/server/node/?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[docs de]: https://www.twilio.com/de/docs?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[docs fr]: https://www.twilio.com/fr/docs?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[docs ja]: https://www.twilio.com/ja/docs?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[microvisor]: https://www.twilio.com/blog/microvisor-pilot-documentation-2021?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[go client]: https://github.com/twilio/twilio-go
[frontend serverless]: https://www.twilio.com/docs/labs/serverless-toolkit/guides/front-end-framework-serverless?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[video insights]: https://www.twilio.com/docs/video/troubleshooting/insights?utm_source=github&utm_medium=readme&utm_campaign=signal2021
[terraform serverless]: https://www.twilio.com/docs/labs/serverless-toolkit/guides/terraform?utm_source=github&utm_medium=readme&utm_campaign=signal2021
