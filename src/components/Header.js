import {styled } from '@twilio-paste/styling-library';
import { Box, Text } from '@twilio-paste/core';
import React from 'react';

const _Header = styled(Box)`
  text-align: center;
`;

const _Heading = styled('h1')`
  color: ${props => props.theme.textColors.colorTextInverse};
  text-transform: uppercase;
  margin: 10px 0;
`;

const _Subtitle = styled('p')`
  color: ${props => props.theme.textColors.colorTextInverse};
  text-transform: uppercase;
  font-style: italic;
  margin: 0;
`;

export const Header = () => {
  return (
    <_Header as="header" marginBottom="space40" paddingTop="space40">
      <img src="//www.twilio.com/quest/next/img/shield.png"/>
      <Text textAlign="center">
        <_Heading>Talon 1</_Heading>
        <_Subtitle>Code in the final frontier</_Subtitle>
      </Text>
    </_Header>
  );
};
