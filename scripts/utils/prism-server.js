const { createServer } = require('@stoplight/prism-http-server');
const {
  getHttpOperationsFromSpec,
} = require('@stoplight/prism-cli/dist/operations');
const { createLogger } = require('@stoplight/prism-core');

async function createPrismServer(url, port) {
  const operations = await getHttpOperationsFromSpec(url);

  const server = createServer(operations, {
    components: {
      logger: createLogger('TestLogger', { level: 'fatal' }),
    },
    cors: true,
    config: {
      checkSecurity: true,
      validateRequest: false,
      validateResponse: false,
      mock: { dynamic: false },
      errors: false,
    },
  });
  await server.listen(port);

  return {
    close: server.close.bind(server),
  };
}

module.exports = { createPrismServer };
