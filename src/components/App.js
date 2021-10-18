import { Column, Grid } from '@twilio-paste/core/grid';
import { Theme } from '@twilio-paste/core/theme';
import { Stack } from '@twilio-paste/stack';
import { styled } from '@twilio-paste/styling-library';
import React from 'react';
import { CountdownList } from './Countdown';
import { Description } from './Description';
import { Footer } from './Footer';
import { Header } from './Header';
import { Subscribe } from './Subscribe';

const _Container = styled('div')`
  height: 100%;
  width: 100%;
  border: none;
  overflow: auto;
  background-color: ${(props) =>
    props.theme.backgroundColors.colorBackgroundBodyInverse};
  color: ${(props) => props.theme.textColors.colorTextInverse};
`;

// Wrap your root component with the Theme.Provider like so:
export const App = () => {
  const events = [
    {
      date: 'Oct 20 2021 16:00:00 GMT-0700',
      name: 'Code Submission Deadline',
    },
    {
      date: 'Oct 21 2021 09:00:00 GMT-0700',
      name: 'Mission Launch',
    },
    {
      date: 'Oct 21 2021 16:30:00 GMT-0700',
      name: '🌮🔦💥',
    },
  ];

  return (
    <Theme.Provider theme="default">
      <_Container>
        <Grid gutter="space30" vertical={[true, false, false]}>
          <Column span={[12, 10, 8, 6]} offset={[0, 1, 2, 3]}>
            <Stack orientation="vertical" spacing="space60">
              <Header />
              <Description />
              <CountdownList eventList={events} />
              <Subscribe />
              <Footer />
            </Stack>
          </Column>
        </Grid>
      </_Container>
    </Theme.Provider>
  );
};
