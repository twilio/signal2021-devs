import {
  Anchor,
  Box,
  Button,
  Card,
  Heading,
  HelpText,
  Input,
  Label,
  MediaBody,
  MediaFigure,
  MediaObject,
  Paragraph,
  Text,
  Toaster,
  useToaster,
} from '@twilio-paste/core';
import { Column, Grid } from '@twilio-paste/core/grid';
import { CheckboxCheckIcon } from '@twilio-paste/icons/esm/CheckboxCheckIcon';
import React, { useEffect, useState } from 'react';
import { useOtpSubscription } from '../hooks/useOtp';
import { OtpModal } from './OtpModal';
import { TopicSelector } from './TopicSelector';

const SuccessSubscription = () => {
  return (
    <MediaObject as="div">
      <MediaFigure as="div" spacing="space0">
        <CheckboxCheckIcon decorative={true} color="colorTextSuccess" />
      </MediaFigure>
      <MediaBody as="div">
        <Text textAlign="left">
          You've successfully subscribed for updates.
        </Text>
      </MediaBody>
    </MediaObject>
  );
};

export const Subscribe = () => {
  const toaster = useToaster();
  const otp = useOtpSubscription();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [tags, setTags] = useState([]);

  const onChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setVerifying(true);
    otp.sendVerifyToken(phoneNumber);
  };

  const handleOtpConfirmation = (code) => {
    otp.verifyTokenAndSubscribe(code, tags);
  };
  const handleOtpClose = () => {
    otp.cancel();
    setVerifying(false);
  };

  useEffect(() => {
    if (otp.confirmed) {
      setVerifying(false);
      toaster.push({
        message: 'You were successfully subscribed for updates.',
        variant: 'success',
        dismissAfter: 4000,
      });
    }
  }, [otp.confirmed]);

  const isOtpModalOpen = otp.codeSent && !otp.confirmed;

  const isSubscribed = otp.confirmed;

  return (
    <>
      <Box marginTop="space100" marginBottom="space100">
        <Card padding="space70">
          <Text as="div" textAlign="center">
            <Heading as="h4" variant="heading40">
              Sign Up for Mission Updates
            </Heading>
            <Paragraph>
              Don't miss any moment of this historic event! Sign up for SMS
              updates to get notified about major events.
            </Paragraph>
            <form onSubmit={onSubmit}>
              <Box marginBottom="space100" textAlign="left">
                <Label htmlFor="phone_number" required>
                  Phone Number
                </Label>
                <Input
                  disabled={isSubscribed}
                  aria-describedby="phone_number_help_text"
                  id="phone_number"
                  name="phoneNumber"
                  type="text"
                  placeholder="Enter your phone number..."
                  value={phoneNumber}
                  onChange={onChange}
                  required
                />
                <HelpText id="phone_number_help_text">
                  Please enter the phone number you'd like to be notified on
                  in international format. For example: +122233334444
                </HelpText>
              </Box>
              <TopicSelector
                onChange={(tags) => {
                  console.log(tags);
                  setTags(tags);
                }}
              />
              <Button
                type="submit"
                disabled={isSubscribed}
                loading={verifying}
              >
                Subscribe for Mission Updates
              </Button>
              {/* {isSubscribed ? <SuccessSubscription /> : null} */}
            </form>
          </Text>
          <Text
            as="p"
            fontSize="fontSize10"
            textAlign="center"
            padding="space50"
          >
            Your phone number will only be used to notify you about the
            events you subscribed to as part of this demo application in
            accordance to our{' '}
            <Anchor href="https://www.twilio.com/legal/privacy">
              Privacy Policy
            </Anchor>
            .
          </Text>
        </Card>
        <OtpModal
          isOpen={isOtpModalOpen}
          onClose={handleOtpClose}
          onConfirm={handleOtpConfirmation}
        />
      </Box>
      <Toaster {...toaster} />
    </>
  );
};
