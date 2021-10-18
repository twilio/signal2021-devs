import React from 'react';

export function useOtpSubscription() {
  const [error, setError] = React.useState(null);
  const [codeSent, setCodeSent] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState(null);

  function sendVerifyToken(phoneNumber) {
    analytics.track('Start subscription');

    fetch('/start-verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to: phoneNumber }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          setPhoneNumber(phoneNumber);
          setConfirmed(false);
          setCodeSent(true);
        } else {
          setError(data.error);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  function verifyTokenAndSubscribe(code, tags) {
    if (!phoneNumber) {
      setError('Missing phone number');
      return;
    }

    tags = Array.isArray(tags) && tags.length > 0 ? tags : undefined;

    let anonymousId;
    try {
      anonymousId = analytics.user().anonymousId();
    } catch (err) {
      anonymousId = undefined;
    }

    fetch('/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to: phoneNumber, code, tags, anonymousId }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          setConfirmed(true);
        } else {
          setError(data.error);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  function cancel() {
    setPhoneNumber(null);
    setCodeSent(false);
    setConfirmed(false);
  }

  return {
    error,
    codeSent,
    confirmed,
    sendVerifyToken,
    verifyTokenAndSubscribe,
    cancel,
  };
}
