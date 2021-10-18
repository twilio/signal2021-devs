const cypress = require('cypress');
const { createFunctionsServer } = require('./utils/functions-server');
const { createPrismServer } = require('./utils/prism-server');

async function run() {
  console.log('>>> Starting Twilio Notify Mock Server...');
  const notifyServer = await createPrismServer(
    'https://raw.githubusercontent.com/twilio/twilio-oai/main/spec/json/twilio_notify_v1.json',
    4001
  );

  console.log('>>> Starting Twilio Verify Mock Server...');
  const verifyServer = await createPrismServer(
    'https://raw.githubusercontent.com/twilio/twilio-oai/main/spec/json/twilio_verify_v2.json',
    4002
  );

  console.log('>>> Starting Local Functions Server...');
  const functionsServer = await createFunctionsServer(3000);

  console.log('>>> Running Cypress...');
  await cypress.run();

  console.log('>>> Shutting things down...');
  functionsServer.close();
  verifyServer.close();
  notifyServer.close();
}

run().catch(console.error);
