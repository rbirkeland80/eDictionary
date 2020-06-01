import React, { useEffect, useState } from 'react';
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

import EnhancedTableHead from '../components/EnhancedTableHead.component';
import ActionTypes from '../redux/actions';

const { FETCH_WORDS_REQUEST, UPDATE_WORD_REQUEST } = ActionTypes;

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

const WordsList = ({ columns, getWords, tabValue, updateWord, words }) => {
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();
  const fields = flatten(
    map(f => f.additionalProp ? [f.prop, f.additionalProp] : [f.prop], columns)
  );

  useEffect(() => {
    if (tab !== tabValue) {
      setTab(tabValue);
      getWords({ fields });
    }
  }, [fields, getWords, tab, tabValue]);

  const tryUpdateWord = (value, prop, id) => {
    updateWord({ id, data: { [`${prop}`]: value } });
  };

  const formatCellData = (col, row) => {
    const prop = parseValue(col.type, col.prop, row, tryUpdateWord);
    const additionalProp = parseValue(col.additionalPropType, col.additionalProp, row);
    const val = additionalProp && typeof prop === 'string'
      ? `${prop} (pl: ${additionalProp})`
      : prop;

    return val;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onSort = (e, prop) => {
    console.log('sort: ', e, prop);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
              (words && words.list && !!words.list.length) &&
              <TableBody>
                {
                  words.list.map(row => (
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={(words && words.count) || 0}
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
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  getWords: PropTypes.func.isRequired,
  tabValue: PropTypes.number.isRequired,
  words: PropTypes.shape({
    count: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
    list: PropTypes.arrayOf(PropTypes.object)
  }),
  updateWord: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tabValue: state.currentTab.tabValue,
  words: state.words.list
});

const mapDispatchToProps = dispatch => ({
  getWords: payload => dispatch({ type: FETCH_WORDS_REQUEST, payload }),
  updateWord: payload => dispatch({ type: UPDATE_WORD_REQUEST, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(WordsList);
