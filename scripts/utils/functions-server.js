const { LocalDevelopmentServer } = require('@twilio/runtime-handler/dev');
const { fsHelpers } = require('@twilio-labs/serverless-api');

function listen(app, port) {
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      resolve(server);
    });
  });
}

const BROADCAST_NOTIFY_SERVICE_SID = 'ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const VERIFY_SERVICE_SID = 'VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const TWILIO_PHONE_NUMBER = '+12223334444';

async function createFunctionsServer(port) {
  const functionsServer = new LocalDevelopmentServer(port, {
    baseDir: __dirname,
    env: {
      ACCOUNT_SID: 'AC11111111111111111111111111111111',
      AUTH_TOKEN: '11111111111111111111111111111111',
      PASSCODE: 'test-only',
      BROADCAST_NOTIFY_SERVICE_SID,
      VERIFY_SERVICE_SID,
      TWILIO_PHONE_NUMBER,
    },
    port: port,
    url: 'localhost:3000',
    detailedLogs: false,
    live: false,
    logs: false,
    legacyMode: false,
    appName: 'test',
    forkProcess: false,
    enableDebugLogs: false,
    routes: await fsHelpers.getListOfFunctionsAndAssets(process.cwd(), {
      functionsFolderNames: ['functions'],
      assetsFolderNames: ['dist'],
    }),
  });

  const server = await listen(functionsServer.getApp(), port);

  return server;
}

module.exports = { createFunctionsServer };
