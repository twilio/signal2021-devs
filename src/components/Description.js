import {
  Anchor,
  Avatar,
  Card,
  Heading,
  MediaBody,
  MediaFigure,
  MediaObject,
  Paragraph,
  Text
} from '@twilio-paste/core';
import { EditIcon } from '@twilio-paste/icons/esm/EditIcon';
import { NewIcon } from '@twilio-paste/icons/esm/NewIcon';
import { UploadToCloudIcon } from '@twilio-paste/icons/esm/UploadToCloudIcon';
import { Stack } from '@twilio-paste/stack';
import { styled } from '@twilio-paste/styling-library';
import React from 'react';

const Image = styled('img')`
  width: 100%;
`;

const _StackWrapper = styled('div')`
  margin-bottom: 20px;
`;


const SubmissionStep = ({ children, icon, name }) => {
  return (
    <MediaObject as="div" verticalAlign="center">
      <MediaFigure as="div" spacing="space40">
        <Avatar size="sizeIcon90" name="name" icon={icon} />
      </MediaFigure>
      <MediaBody as="div">{children}</MediaBody>
    </MediaObject>
  );
};

const Code = ({children}) => {
  return <Text fontWeight="fontWeightNormal" fontFamily="fontFamilyCode">{children}</Text>
}

export const Description = () => {
  return (
    <Card as="section">
      <Heading as="h2" variant="heading30">
        Send your code to space!
      </Heading>
      <Image src="//i.ytimg.com/vi/LurbzrKVGrk/maxresdefault.jpg"/>
      <Paragraph>
        To help celebrate&nbsp;
        <Anchor 
          href="https://signal.twilio.com" 
          showExternal={true}>
            SIGNAL 2021
        </Anchor>
        and the launch of&nbsp;
        <Anchor 
          href="https://www.twilio.com/quest" 
          showExternal={true}>
            TwilioQuest 3.2
        </Anchor>,
        we are very excited to offer the SIGNAL developer community a
        once-in-a-lifetime opportunity to <b>send code to space</b>!
        Aboard a high-altitude balloon, we will capture video footage of your 
        code running in space, with the curvature of the Earth in the background. 
        After the flight, we will send video of your code running in space to 
        all partcipants as proof of your accomplishment.
      </Paragraph>
      <_StackWrapper>
        <Stack orientation="vertical" spacing="space40">
          <SubmissionStep icon={NewIcon}>
            <Text as="strong">
              Come up with your idea - what code or message would you like to 
              send into space?
            </Text>
          </SubmissionStep>
          <SubmissionStep icon={EditIcon}>
            <Text as="strong">Build it using HTML, CSS, and JavaScript. If you are using <Anchor href="https://twil.io/signal-developer-mode">SIGNAL Developer Mode</Anchor> you can run <Code>twilio signal:checkout 4966b05</Code> to get started.</Text>
          </SubmissionStep>
          <SubmissionStep icon={UploadToCloudIcon}>
            <Text as="strong">Submit it on{' '}
            <Anchor href="https://github.com/twilioquest/talon" showExternal>
              GitHub
            </Anchor> by opening a pull request.</Text>
          </SubmissionStep>
        </Stack>
      </_StackWrapper>
      <Paragraph>
        <b>The mission is limited to only 180 participants</b>, so be sure
        to <Anchor href="https://github.com/twilioquest/talon" showExternal>
        get your pull request in</Anchor> right away!
      </Paragraph>
    </Card>
  );
};
