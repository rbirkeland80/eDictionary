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

import { CHECK, LEARN } from '../constants/listTypes.constants';
import { COLUMNS } from '../constants/tableHeader.contants';
import EnhancedTableHead from '../components/EnhancedTableHead.component';
import ActionTypes from '../redux/actions';

const { FETCH_WORDS_REQUEST, SET_TABLE_PAGER_SETTINGS, UPDATE_WORD_REQUEST } = ActionTypes;

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
    return format(new Date(row[prop]), 'MMM dd, yyyy');
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

const WordsList = ({ listType, getWords, setPagerSettings, tables, updateWord, words }) => {
  const classes = useStyles();
  const columns = COLUMNS[listType];
  const list = words[listType];
  const pagerSettings = tables[`${listType}_pagerSettings`];
  const { page, rowsPerPage, rowsPerPageOptions } = pagerSettings
  const fields = flatten(
    map(f => f.additionalProp ? [f.prop, f.additionalProp] : [f.prop], columns)
  );

  useEffect(() => {
    getWords({ fields, limit: rowsPerPage, skip: page * rowsPerPage, listType });
  }, [listType, page, rowsPerPage]);

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

  const onSort = (e, prop) => {
    console.log('sort: ', e, prop);
  };

  const handleChangeRowsPerPage = (event) => {
    const data = {
      ...pagerSettings,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10)
    };

    setPagerSettings({ listType, data });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead classes={classes} columns={columns} onRequestSort={onSort} />

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
    </div>
  );
};

WordsList.propTypes = {
  listType: PropTypes.oneOf([CHECK, LEARN]).isRequired,
  getWords: PropTypes.func.isRequired,
  setPagerSettings: PropTypes.func.isRequired,
  tables: PropTypes.object.isRequired,
  words: PropTypes.object,
  updateWord: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tables: state.tables,
  words: state.words
});

const mapDispatchToProps = dispatch => ({
  getWords: payload => dispatch({ type: FETCH_WORDS_REQUEST, payload }),
  setPagerSettings: payload => dispatch({ type: SET_TABLE_PAGER_SETTINGS, payload }),
  updateWord: payload => dispatch({ type: UPDATE_WORD_REQUEST, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(WordsList);
