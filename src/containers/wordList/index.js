import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { flatten, map } from 'ramda';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Switch from '@material-ui/core/Switch';
import Icon from '@material-ui/core/Icon';

import { CHECK, LEARN } from '../../constants/listTypes.constants';
import { ACTION_DELETE, ACTIONS, COLUMNS } from '../../constants/tableHeader.contants';
import { CONFIRM_DELETE_WORD } from '../../constants/modals.constants';
import ConfirmDeleteWordDialog from '../../dialogs/ConfirmDeleteWordDialog.container';
import ActionTypes from '../../redux/actions';
import EnhancedTableHead from './EnhancedTableHead.container';
import FilterWrapper from './FilterWrapper.container';
import Pager from './Pager.container';

const {
  DELETE_WORD_REQUEST,
  FETCH_WORDS_REQUEST,
  GENERATE_QUIZ_REQUEST,
  SET_MODAL_DATA,
  SET_MODAL_STATE,
  UPDATE_WORD_REQUEST
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
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const parseValue = (type, prop, row, cb) => {
  if (type === 'date') {
    return row[prop]
      ? format(new Date(row[prop]), 'MMM dd, yyyy')
      : null;
  }

  if (type === 'bool') {
    return (
      <Switch
        checked={row[prop]}
        onChange={(_, value) => cb(value, prop, row._id)}
        color="primary"
        name={prop}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    );
  }

  return row[prop];
};

const WordsList = ({
  deleteModalOpened,
  deleteWord,
  filter,
  generateQuiz,
  getWords,
  listType,
  setModalData,
  setModalState,
  tables,
  updateWord,
  words
}) => {
  const classes = useStyles();
  const actions = ACTIONS[listType];
  const columns = COLUMNS[listType];
  const list = words[listType];
  const filterIsApplied = tables[`${listType}_filterIsApplied`];
  const hiddenColumns = tables[`${listType}_hiddenColumns`];
  const filterSettings = tables[`${listType}_filterSettings`];
  const { sortDirection, sortProp } = tables[`${listType}_sortSettings`];
  const { page, rowsPerPage } = tables[`${listType}_pagerSettings`];
  const fields = flatten(
    map(f => f.additionalProp ? [f.prop, f.additionalProp] : [f.prop], columns)
  );

  useEffect(() => {
    const baseReqData = { fields, skip: page * rowsPerPage, limit: rowsPerPage, sortDirection, sortProp };
    const req = filterIsApplied ? generateQuiz : getWords;
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

  const tryUpdateWord = (value, prop, id) => {
    updateWord({ id, listType, data: { [`${prop}`]: value } });
  };

  const formatCellData = (col, row) => {
    const prop = parseValue(col.type, col.prop, row, tryUpdateWord);
    const additionalProp = parseValue(col.additionalPropType, col.additionalProp, row);
    const val = additionalProp && typeof prop === 'string'
      ? `${prop} (pl: ${additionalProp})`
      : prop;

    return val;
  };

  const onActionClick = (type, id, word) => {
    if (type === ACTION_DELETE.type) {
      setModalData({ id, word });
      setModalState(CONFIRM_DELETE_WORD, true);
    }
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
            <EnhancedTableHead classes={classes} actions={actions} columns={columns} listType={listType} />

            {
              (list && list.list && !!list.list.length) &&
              <TableBody>
                {
                  list.list.map(row => (
                    <TableRow tabIndex={-1} key={`row-${row.word}`}>
                      {
                        columns.map(col => (
                          <TableCell key={`cell-${col.label}-${row[col.prop]}`}>
                            <span className={`${hiddenColumns.includes(col.prop) ? "invisible" : ""}`}>
                              {formatCellData(col, row)}
                            </span>
                          </TableCell>
                        ))
                      }
                      {
                        (actions && actions.length) &&
                        <TableCell key="actions">
                          {
                            actions.map(action => (
                              <Icon
                                key={action.type}
                                color="secondary"
                                onClick={() => onActionClick(action.type, row._id, row.word)}
                              >
                                {action.type}
                              </Icon>
                            ))
                          }
                        </TableCell>
                      }
                    </TableRow>
                  ))
                }
              </TableBody>
            }
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
  generateQuiz: PropTypes.func.isRequired,
  getWords: PropTypes.func.isRequired,
  listType: PropTypes.oneOf([CHECK, LEARN]).isRequired,
  setModalData: PropTypes.func.isRequired,
  setModalState: PropTypes.func.isRequired,
  tables: PropTypes.object.isRequired,
  words: PropTypes.object,
  updateWord: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  deleteModalOpened: state.modals[CONFIRM_DELETE_WORD],
  tables: state.tables,
  words: state.words
});

const mapDispatchToProps = dispatch => ({
  deleteWord: payload => dispatch({ type: DELETE_WORD_REQUEST, payload }),
  generateQuiz: payload => dispatch({ type: GENERATE_QUIZ_REQUEST, payload }),
  getWords: payload => dispatch({ type: FETCH_WORDS_REQUEST, payload }),
  setModalData: payload => dispatch({ type: SET_MODAL_DATA, payload }),
  setModalState: (type, value) => dispatch({ type: SET_MODAL_STATE, payload: { type, value } }),
  updateWord: payload => dispatch({ type: UPDATE_WORD_REQUEST, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(WordsList);
