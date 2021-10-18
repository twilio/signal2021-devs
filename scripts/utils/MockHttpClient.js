const { RequestClient } = require('../../node_modules/twilio/index');

class MockHttpClient {
  constructor() {
    this.requestClient = new RequestClient();
  }

  async request(opts) {
    opts.uri = opts.uri.replace(
      `https://verify.twilio.com`,
      'http://localhost:4002'
    );
    const result = await this.requestClient.request(opts);
    if (result.body.meta) {
      result.body.meta.next_page_url = null;
      result.body.meta.previous_page_url = null;
      result.body.meta.key = Object.keys(result.body)[0];
    }

    return result;
  }
}

exports.MockHttpClient = MockHttpClient;
