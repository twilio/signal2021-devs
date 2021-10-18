import { Box, Column, Flex, Grid, Text } from '@twilio-paste/core';
import { styled } from '@twilio-paste/styling-library';
import React from 'react';

const _TimerContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const calculateTimeLeft = (date) => {
  let difference = +new Date(date) - +new Date();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

function useCountdown(to) {
  const [data, setData] = React.useState(calculateTimeLeft(to));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setData(calculateTimeLeft(to));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [to]);

  return data;
}

const TimeDisplay = ({ value, name }) => {
  const stringValue = value < 10 ? `0${value}` : value;

  return (
    <Flex vertical hAlignContent="center">
      <Text
        fontSize="fontSize110"
        marginBottom="space40"
        padding="space20"
        paddingLeft="space50"
        paddingRight="space50"
        color="colorTextInverse"
      >
        {stringValue}
      </Text>
      <Text color="colorTextInverse" marginBottom="space50">
        {name}
      </Text>
    </Flex>
  );
};

export const Countdown = ({ to, eventName }) => {
  const { days, hours, minutes, seconds } = useCountdown(to);

  return (
    <Box as="section">
      <Grid gutter="space30">
        <Column span={8} offset={2}>
          <Text
            marginTop="space50"
            textAlign="center"
            fontSize="fontSize40"
            color="colorTextInverse"
            marginBottom="space50"
          >
            <b>{eventName}</b>
          </Text>
          <_TimerContainer>
            <TimeDisplay value={days} name="days" />
            <TimeDisplay value={hours} name="hours" />
            <TimeDisplay value={minutes} name="minutes" />
            <TimeDisplay value={seconds} name="seconds" />
          </_TimerContainer>
        </Column>
      </Grid>
    </Box>
  );
};

export const CountdownList = ({ eventList }) => {
  const [event] = eventList.filter((event) => {
    const timeLeft = calculateTimeLeft(event.date);
    return !(
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    );
  });

  return event ? (
    <Countdown
      to={event.date}
      eventName={event.name}
      shouldRenderIfZero={false}
    />
  ) : null;
};
