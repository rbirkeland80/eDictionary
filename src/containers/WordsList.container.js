import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isNil } from 'ramda';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';

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

const WordsList = ({ getWords, words }) => {
  const classes = useStyles();

  useEffect(() => {
    if (isNil(words)) {
      console.log(222222)
      getWords({});
    }
  }, [words, getWords]);

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
            <EnhancedTableHead
              classes={classes}
            />
Table body here
          </Table>
        </TableContainer>
Table pagination here
      </Paper>
    </div>
  );
};

WordsList.propTypes = {
  getWords: PropTypes.func.isRequired,
  words: PropTypes.shape({
    count: PropTypes.number.isRequired,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        canEtoU: PropTypes.bool.isRequired,
        canUtoE: PropTypes.bool.isRequired
      }).isRequired
    )
  }),
};

const mapStateToProps = state => ({
  words: state.words.list
});

const mapDispatchToProps = dispatch => ({
  getWords: payload => dispatch({ type: FETCH_WORDS_REQUEST, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(WordsList);
