import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { flatten, map } from 'ramda';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';

import { CHECK, LEARN } from '../../constants/listTypes.constants';
import { COLUMNS } from '../../constants/tableHeader.constants';
import { CONFIRM_DELETE_WORD } from '../../constants/modals.constants';
import ConfirmDeleteWordDialog from '../../dialogs/ConfirmDeleteWordDialog.container';
import ActionTypes from '../../redux/actions';
import EnhancedTableHead from './EnhancedTableHead.container';
import FilterWrapper from './FilterWrapper.container';
import Pager from './Pager.container';
import EnhancedTableBody from './EnhancedTableBody.container';

const {
  DELETE_WORD_REQUEST,
  FETCH_WORDS_REQUEST,
  SET_MODAL_DATA,
  SET_MODAL_STATE
} = ActionTypes;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  }
}));

const WordsList = ({
  deleteModalOpened,
  deleteWord,
  filter,
  filterAction,
  getWords,
  listType,
  setModalData,
  setModalState,
  tables,
  words
}) => {
  const classes = useStyles();
  const columns = COLUMNS[listType];
  const list = words[listType];
  const filterIsApplied = tables[`${listType}_filterIsApplied`];
  const filterSettings = tables[`${listType}_filterSettings`];
  const { sortDirection, sortProp } = tables[`${listType}_sortSettings`];
  const { page, rowsPerPage } = tables[`${listType}_pagerSettings`];
  const fields = flatten(
    map(f => f.additionalProp ? [f.prop, f.additionalProp] : [f.prop], columns)
  );

  useEffect(() => {
    const baseReqData = { fields, skip: page * rowsPerPage, limit: rowsPerPage, sortDirection, sortProp };
    const req = filterIsApplied ? filterAction : getWords;
    const reqData = filterIsApplied
      ? { reqData: { ...filterSettings, ...baseReqData }, listType }
      : { ...baseReqData, listType };

    req(reqData);
  }, [listType, page, rowsPerPage, sortDirection, sortProp]);

  const confirmDeleteWord = (id) => {
    deleteWord({ id, listType });
    setModalData(null);
    setModalState(CONFIRM_DELETE_WORD, false);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {
          (filter && list) &&
          <FilterWrapper
            fields={fields}
            filter={filter}
            listType={listType}
            wordIds={list.list.map(i => i._id)}
          />
        }

        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" size="small">
            <EnhancedTableHead listType={listType} />

            <EnhancedTableBody listType={listType} />
          </Table>
        </TableContainer>

        <Pager count={(list && list.count) || 0} listType={listType} />
      </Paper>

      {
        deleteModalOpened &&
        <ConfirmDeleteWordDialog modalOpened={deleteModalOpened} handleClose={confirmDeleteWord} />
      }
    </div>
  );
};

WordsList.propTypes = {
  deleteModalOpened: PropTypes.bool.isRequired,
  deleteWord: PropTypes.func.isRequired,
  filter: PropTypes.elementType,
  filterAction: PropTypes.func.isRequired,
  getWords: PropTypes.func.isRequired,
  listType: PropTypes.oneOf([CHECK, LEARN]).isRequired,
  setModalData: PropTypes.func.isRequired,
  setModalState: PropTypes.func.isRequired,
  tables: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  deleteModalOpened: state.modals[CONFIRM_DELETE_WORD],
  tables: state.tables,
  words: state.words
});

const mapDispatchToProps = dispatch => ({
  deleteWord: payload => dispatch({ type: DELETE_WORD_REQUEST, payload }),
  getWords: payload => dispatch({ type: FETCH_WORDS_REQUEST, payload }),
  setModalData: payload => dispatch({ type: SET_MODAL_DATA, payload }),
  setModalState: (type, value) => dispatch({ type: SET_MODAL_STATE, payload: { type, value } })
});

export default connect(mapStateToProps, mapDispatchToProps)(WordsList);