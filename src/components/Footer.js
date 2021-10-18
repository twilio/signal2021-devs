import { Anchor, Box, Flex, Text } from '@twilio-paste/core';
import { LogoTwilioIcon } from '@twilio-paste/icons/esm/LogoTwilioIcon';
import React from 'react';

export const Footer = () => {
  return (
    <Box as="footer" padding="space40" color="colorTextBrandInverse">
      <Text
        textAlign="center"
        color="colorTextWeak"
        as="p"
        marginBottom="space30"
      >
        This application was built as a demo application for SIGNAL 2021 using{' '}
        <Anchor href="https://paste.twilio.design">Twilio Paste</Anchor>.{' '}
      </Text>
      <Text textAlign="center" color="colorTextWeak" as="p">
        Find the source code at{' '}
        <Anchor
          href="https://github.com/twilio/signal2021-devs"
          showExternal 
          color="colorTextWeak"
        >
          github.com/twilio/signal2021-devs
        </Anchor>
      </Text>
      <Flex hAlignContent="center" padding="space50">
        <LogoTwilioIcon decorative={false} title="Made by Twilio" />
      </Flex>
    </Box>
  );
};
