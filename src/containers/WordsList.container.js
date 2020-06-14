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
import TablePagination from '@material-ui/core/TablePagination';
import Switch from '@material-ui/core/Switch';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import { CHECK, LEARN } from '../constants/listTypes.constants';
import { COLUMNS } from '../constants/tableHeader.contants';
import { CONFIRM_VALIDATE_QUIZ } from '../constants/modals.constants';
import EnhancedTableHead from '../components/EnhancedTableHead.component';
import ConfirmVerifyQuizDialog from '../dialogs/ConfirmVerifyQuizDialog.component';
import ActionTypes from '../redux/actions';

const {
  CLEAR_TABLE_FILTER_SETTINGS,
  FETCH_WORDS_REQUEST,
  GENERATE_QUIZ_REQUEST,
  SET_MODAL_STATE,
  SET_TABLE_FILTER_SETTINGS,
  SET_TABLE_PAGER_SETTINGS,
  SET_TABLE_SORT_SETTINGS,
  UPDATE_WORD_REQUEST,
  VERIFY_QUIZ_REQUEST
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
  clearFilter,
  confirmModalOpened,
  filter,
  generateQuiz,
  getWords,
  listType,
  setFilterSettings,
  setModalState,
  setPagerSettings,
  setSortSettings,
  tables,
  updateWord,
  verifyQuiz,
  words
}) => {
  const Filter = filter;
  const classes = useStyles();
  const columns = COLUMNS[listType];
  const list = words[listType];
  const filterIsApplied = tables[`${listType}_filterIsApplied`];
  const filterSettings = tables[`${listType}_filterSettings`];
  const pagerSettings = tables[`${listType}_pagerSettings`];
  const { sortDirection, sortProp } = tables[`${listType}_sortSettings`];
  const { page, rowsPerPage, rowsPerPageOptions } = pagerSettings
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

  const confirmValidateQuiz = () => {
    setModalState(CONFIRM_VALIDATE_QUIZ, false);
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

  const handleChangePage = (_, newPage) => {
    const data = {
      ...pagerSettings,
      page: newPage
    };

    setPagerSettings({ listType, data });
  };

  const onSort = (sortProp) => {
    setSortSettings({ listType, sortProp });
  };

  const handleChangeRowsPerPage = (event) => {
    const data = {
      ...pagerSettings,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10)
    };

    setPagerSettings({ listType, data });
  };

  const onFilterApply = data => {
    setPagerSettings({ listType, data: { ...pagerSettings, page: 0 } });
    const reqData = {
      ...data,
      fields,
      skip: 0,
      limit: rowsPerPage
    };
    setFilterSettings({ listType, data });
    generateQuiz({ reqData, listType });
  };

  const onFilterClear = () => {
    clearFilter({ listType });
    getWords({ fields, skip: page * rowsPerPage, limit: rowsPerPage, listType });
  };

  const onQuizVerify = () => {
    verifyQuiz(list.list.map(i => i._id));
    setModalState(CONFIRM_VALIDATE_QUIZ, true);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {
          Filter &&
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Generate Quiz</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Filter
                initialValues={filterSettings}
                onFilterApply={onFilterApply}
                onFilterClear={onFilterClear}
                onVerify={onQuizVerify}
                showVerify={filterIsApplied}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        }
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              classes={classes}
              columns={columns}
              order={sortDirection}
              orderBy={sortProp}
              onRequestSort={onSort}
            />

            {
              (list && list.list && !!list.list.length) &&
              <TableBody>
                {
                  list.list.map(row => (
                    <TableRow tabIndex={-1} key={`row-${row.word}`}>
                      {
                        columns.map(col => (
                          <TableCell key={`cell-${col.label}-${row[col.prop]}`}>
                            {formatCellData(col, row)}
                          </TableCell>
                        ))
                      }
                    </TableRow>
                  ))
                }
              </TableBody>
            }
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={(list && list.count) || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      {
        confirmModalOpened &&
        <ConfirmVerifyQuizDialog modalOpened={confirmModalOpened} handleClose={confirmValidateQuiz} />
      }
    </div>
  );
};

WordsList.propTypes = {
  clearFilter: PropTypes.func.isRequired,
  confirmModalOpened: PropTypes.bool.isRequired,
  filter: PropTypes.any,
  generateQuiz: PropTypes.func.isRequired,
  getWords: PropTypes.func.isRequired,
  listType: PropTypes.oneOf([CHECK, LEARN]).isRequired,
  setFilterSettings: PropTypes.func.isRequired,
  setPagerSettings: PropTypes.func.isRequired,
  setModalState: PropTypes.func.isRequired,
  setSortSettings: PropTypes.func.isRequired,
  tables: PropTypes.object.isRequired,
  words: PropTypes.object,
  updateWord: PropTypes.func.isRequired,
  verifyQuiz: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  confirmModalOpened: state.modals[CONFIRM_VALIDATE_QUIZ],
  tables: state.tables,
  words: state.words
});

const mapDispatchToProps = dispatch => ({
  clearFilter: payload => dispatch({ type: CLEAR_TABLE_FILTER_SETTINGS, payload }),
  generateQuiz: payload => dispatch({ type: GENERATE_QUIZ_REQUEST, payload }),
  getWords: payload => dispatch({ type: FETCH_WORDS_REQUEST, payload }),
  setFilterSettings: payload => dispatch({ type: SET_TABLE_FILTER_SETTINGS, payload }),
  setModalState: (type, value) => dispatch({ type: SET_MODAL_STATE, payload: { type, value } }),
  setPagerSettings: payload => dispatch({ type: SET_TABLE_PAGER_SETTINGS, payload }),
  setSortSettings: payload => dispatch({ type: SET_TABLE_SORT_SETTINGS, payload }),
  updateWord: payload => dispatch({ type: UPDATE_WORD_REQUEST, payload }),
  verifyQuiz: payload => dispatch({ type: VERIFY_QUIZ_REQUEST, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(WordsList);
