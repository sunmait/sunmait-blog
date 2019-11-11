import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabPanel } from './TabPanel'
import { ChangePassword } from './ChangePassword'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: 200, 
  },
  tab: {
    fontSize: 13,
  },
  insideTabs: {
    width: '100%',
  }
}));

export const Settings = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} className={classes.tabs}>
        <Tab className={classes.tab} label="Приватность" />
        <Tab className={classes.tab} label="Изменить пароль" />
        <Tab className={classes.tab} label="Item Three" />
      </Tabs>
      <TabPanel value={value} index={0} className={classes.insideTabs}>
        <ChangePassword />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.insideTabs}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.insideTabs}>
        Item Three
      </TabPanel>
    </div>
  );
};
