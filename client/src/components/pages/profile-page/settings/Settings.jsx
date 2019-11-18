import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';
import { TabPanel } from './TabPanel';
import { ChangePassword } from './ChangePassword';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    transition: '0.5s',
    minWidth: 180,
    '@media (max-width:500px)': {
      minWidth: 120,
      position: 'relative',
      left: 0,
    },
  },
  closeTabs: {
    position: 'absolute',
    transition: '0.5s',
    left: -300,
  },
  tab: {
    fontSize: 13,
    '@media (max-width:440px)': {
      fontSize: 10,
    },
  },
  insideTabs: {
    width: '100%',
  },
  fab: {
    position: 'absolute',
    left: -30,
    top: 240,
    transform: 'rotate(90deg)',
    '@media (min-width:501px)': {
      left: -300,
    },
  },
  open: {
    marginBottom: 20,
    fontSize: 10,
  },
}));

export const Settings = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [isOpenPanel, setOpenedPanel] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const setShowPanel = () => {
    setOpenedPanel(!isOpenPanel);
  };

  const resize = () => {
    document.body.clientWidth <= 500 && setOpenedPanel(false);
    document.body.clientWidth > 500 && setOpenedPanel(true);
  };

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={isOpenPanel ? classes.tabs : classes.closeTabs}
        data-cy='settings-tabs'
      >
        <Tab className={classes.tab} label="Notification"  data-cy='settings-tabs-tab'/>
        <Tab className={classes.tab} label="Change password" data-cy='settings-tabs-tab'/>
        <Tab className={classes.tab} label="Privacy" data-cy='settings-tabs-tab'/>
      </Tabs>
      <TabPanel value={value} index={0} className={classes.insideTabs}>
        <h2>Notification</h2>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.insideTabs}>
        <ChangePassword />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.insideTabs}>
        <h2>Privacy</h2>
      </TabPanel>
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={setShowPanel}>
        <span className={classes.open}>Menu</span>
      </Fab>
    </div>
  );
};
