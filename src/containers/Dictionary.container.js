import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ActionTypes from '../redux/actions';
import { CHECK, LEARN } from '../constants/listTypes.constants';
import { ADD_WORD_VALIDATION_ERROR } from '../constants/modals.constants';
import TabPanel from '../components/TabPanel.component';
import AddWordsValidationDialog from '../components/AddWordsValidationDialog.component';
import CheckFilter from '../components/CheckFilter.component';
import AddWords from './AddWords.container';
import WordsList from './WordsList.container';

const { SET_MODAL_DATA, SET_MODAL_STATE, SET_TAB_VALUE } = ActionTypes;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

const Dictionary = ({
  addWordsValidationErrors,
  clearModalData,
  modalOpened,
  setModalState,
  setTabValue,
  tabValue
}) => {
  const classes = useStyles();

  const closeModal = (modal, clearData) => {
    setModalState(modal);

    if (clearData) {
      clearModalData();
    }
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={tabValue} onChange={handleChange} centered>
          <Tab label="Learn" />
          <Tab label="Check" />
          <Tab label="Add new words" />
        </Tabs>
      </AppBar>

      <TabPanel value={tabValue} index={0}>
        <WordsList listType={LEARN} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <WordsList listType={CHECK} filter={CheckFilter} />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <AddWords />
      </TabPanel>

      <AddWordsValidationDialog
        errors={addWordsValidationErrors}
        modalOpened={modalOpened}
        handleClose={() => closeModal(ADD_WORD_VALIDATION_ERROR, true)}
      />
    </div>
  );
};

Dictionary.propTypes = {
  addWordsValidationErrors: PropTypes.arrayOf(PropTypes.object),
  clearModalData: PropTypes.func.isRequired,
  modalOpened: PropTypes.bool.isRequired,
  setModalState: PropTypes.func.isRequired,
  setTabValue: PropTypes.func.isRequired,
  tabValue: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  addWordsValidationErrors: state.modals.modalData,
  modalOpened: state.modals[ADD_WORD_VALIDATION_ERROR],
  tabValue: state.currentTab.tabValue
});

const mapDispatchToProps = dispatch => ({
  clearModalData: () => dispatch({ type: SET_MODAL_DATA, payload: null }),
  setModalState: type => dispatch({ type: SET_MODAL_STATE, payload: { type, value: false } }),
  setTabValue: payload => dispatch({ type: SET_TAB_VALUE, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
