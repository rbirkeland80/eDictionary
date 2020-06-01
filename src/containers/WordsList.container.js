import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isNil, map } from 'ramda';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';

import EnhancedTableHead from '../components/EnhancedTableHead.component';
import ActionTypes from '../redux/actions';

const { FETCH_WORDS_REQUEST } = ActionTypes;

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

const WordsList = ({ columns, getWords, words }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();
  const fields = map(f => f.prop, columns);

  useEffect(() => {
    if (isNil(words)) {
      getWords({ fields });
    }
  }, [fields, words, getWords]);

  const formatCellData = (col, row) => {
    if (col.type === 'date') {
      return format(new Date(row[col.prop]), 'MMM dd, yyyy');
    }

    return row[col.prop];
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
  words: PropTypes.shape({
    count: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
    list: PropTypes.arrayOf(PropTypes.object)
  }),
};

const mapStateToProps = state => ({
  words: state.words.list
});

const mapDispatchToProps = dispatch => ({
  getWords: payload => dispatch({ type: FETCH_WORDS_REQUEST, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(WordsList);
