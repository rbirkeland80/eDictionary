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
import { USER_KEY } from '../constants/localStorageKeys.constants';
import TabPanel from '../components/TabPanel.component';
import CheckFilter from '../components/CheckFilter.component';
import AddWordsValidationDialog from '../dialogs/AddWordsValidationDialog.component';
import AddWords from './AddWords.container';
import Login from './Login.container';
import Logout from './Logout.container';
import WordsList from './wordList/index';

const { GENERATE_QUIZ_REQUEST, SET_MODAL_DATA, SET_MODAL_STATE, SET_TAB_VALUE } = ActionTypes;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

const Dictionary = ({
  addWordsValidationErrors,
  clearModalData,
  generateQuiz,
  modalOpened,
  setModalState,
  setTabValue,
  tabValue,
  user
}) => {
  const classes = useStyles();
  const curUser = user || localStorage.getItem(USER_KEY);

  const closeModal = (modal, clearData) => {
    setModalState(modal);

    if (clearData) {
      clearModalData();
    }
  };

  const handleChange = (event, newValue) => {
    if (!curUser) {
      return;
    }

    setTabValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={tabValue} onChange={handleChange} centered>
          <Tab label="Learn" disabled={!curUser} />
          <Tab label="Check" disabled={!curUser} />
          <Tab label="Add new words" disabled={!curUser} />
          <Tab label="Log in" className={`${curUser ? "invisible" : ""}`} />
          <Tab label="Log out" className={`${!curUser ? "invisible" : ""}`} />
        </Tabs>
      </AppBar>

      <TabPanel value={tabValue} index={0}>
        <WordsList listType={LEARN} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <WordsList listType={CHECK} filter={CheckFilter} filterAction={generateQuiz} />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <AddWords />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Login />
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Logout />
      </TabPanel>

      {
        modalOpened &&
        <AddWordsValidationDialog
          errors={addWordsValidationErrors}
          modalOpened={modalOpened}
          handleClose={() => closeModal(ADD_WORD_VALIDATION_ERROR, true)}
        />
      }
    </div>
  );
};

Dictionary.propTypes = {
  addWordsValidationErrors: PropTypes.arrayOf(PropTypes.object),
  clearModalData: PropTypes.func.isRequired,
  generateQuiz: PropTypes.func.isRequired,
  modalOpened: PropTypes.bool.isRequired,
  setModalState: PropTypes.func.isRequired,
  setTabValue: PropTypes.func.isRequired,
  tabValue: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string
  })
};

const mapStateToProps = state => ({
  addWordsValidationErrors: state.modals.modalData,
  user: state.user,
  modalOpened: state.modals[ADD_WORD_VALIDATION_ERROR],
  tabValue: state.currentTab.tabValue
});

const mapDispatchToProps = dispatch => ({
  clearModalData: () => dispatch({ type: SET_MODAL_DATA, payload: null }),
  generateQuiz: payload => dispatch({ type: GENERATE_QUIZ_REQUEST, payload }),
  setModalState: type => dispatch({ type: SET_MODAL_STATE, payload: { type, value: false } }),
  setTabValue: payload => dispatch({ type: SET_TAB_VALUE, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
