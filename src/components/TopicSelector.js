import { Box, Checkbox, CheckboxGroup } from '@twilio-paste/core';
import React from 'react';

export const TopicSelector = ({ onChange }) => {
  const [checkedItems, setCheckedItems] = React.useState({
    'code-submissions': false,
    launch: false,
  });

  const allChecked = Object.values(checkedItems).every(Boolean);

  const checkboxRef = React.createRef();

  const handleCheck = (e) => {
    const name = e.target.value;
    const checked = e.target.checked;
    setCheckedItems((checkedItems) => {
      const newCheckedItems =
        name === 'select-all'
          ? { 'code-submissions': true, launch: true }
          : { ...checkedItems, [name]: checked };
      if (typeof onChange === 'function') {
        onChange(
          Object.entries(newCheckedItems)
            .filter(([key, value]) => value)
            .map(([key, value]) => key)
        );
      }
      return newCheckedItems;
    });
  };

  return (
    <Box marginBottom="space100" textAlign="left">
      <CheckboxGroup
        name="tags"
        legend="Select what type of notifications you'd like to receive"
        isSelectAll
      >
        <Checkbox
          ref={checkboxRef}
          id="select-all"
          indeterminate={!allChecked}
          value="select-all"
          checked={allChecked}
          onChange={handleCheck}
        >
          Select All
        </Checkbox>
        <Checkbox id="mission-critical" value="mission-critical" checked={true}>
          Mission Critical Updates
        </Checkbox>
        <Checkbox
          id="code-submissions"
          value="code-submissions"
          checked={checkedItems['code-submissions']}
          onChange={handleCheck}
        >
          Code Submissions Deadline Reminders
        </Checkbox>
        <Checkbox
          id="launch"
          value="launch"
          checked={checkedItems['launch']}
          onChange={handleCheck}
        >
          Launch Notifications
        </Checkbox>
      </CheckboxGroup>
    </Box>
  );
};
