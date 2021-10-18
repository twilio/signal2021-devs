describe('E2E Broadcast', () => {
  it('successfully sends a broadcast with the right password', () => {
    cy.visit('/broadcast.html');

    cy.log('Fill in what message to send');
    cy.get('[data-cy="message-body"]').type('This is an automated message.');
    cy.get('[data-cy="to-everyone"]').click();
    cy.log('Enter password');
    cy.get('[data-cy="passcode"]').type('test-only');
    cy.log('Send message');
    cy.get('[data-cy="submit"]').click();
    cy.log('Verify that the message was sent.');
    cy.get('[data-cy="status"]').contains('Successfully sent');
  });
});

describe('POST /broadcast', () => {
  it('denies access without valid password', () => {
    cy.request({
      method: 'POST',
      url: '/broadcast',
      headers: {
        Authorization: `Basic ${Buffer.from(`admin:invalid`).toString(
          'base64'
        )}`,
      },
      body: {
        body: 'Hello from the test suite',
        tag: undefined,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.success).to.eq(false);
      expect(response.body.error).to.eq('INVALID CREDENTIALS');
    });
  });

  it('successfully sends notification with valid password', () => {
    cy.request({
      method: 'POST',
      url: '/broadcast',
      headers: {
        Authorization: `Basic ${Buffer.from(`admin:test-only`).toString(
          'base64'
        )}`,
      },
      body: {
        body: 'Hello from the test suite',
        tag: undefined,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body.success).to.eq(true);
    });
  });
});
