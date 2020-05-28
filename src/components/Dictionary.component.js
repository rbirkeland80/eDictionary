import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AddWords from '../containers/AddWords.container';
import WordsList from '../containers/WordsList.container';
import TabPanel from './TabPanel.component';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));
const checkColumns = ['Word', 'Translation', 'Added', 'Eng to Ukr', 'Ukr to Eng'];
const checkFieldsList = 'value translation createdAt canEToU, canUtoE';
const learnColumns = ['Word', 'Translation', 'Description', 'Added'];
const learnFieldsList = 'value translation description createdAt';

const Dictionary = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Learn" />
          <Tab label="Check" />
          <Tab label="Add new words" />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <WordsList queryFields={learnFieldsList} columns={learnColumns} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <WordsList queryFields={checkFieldsList} columns={checkColumns} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <AddWords />
      </TabPanel>
    </div>
  );
};

Dictionary.propTypes = {};

export default Dictionary;
