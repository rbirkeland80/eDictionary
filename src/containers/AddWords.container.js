import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActionTypes from '../redux/actions';

const { FETCH_WORDS_REQUEST } = ActionTypes

const AddWords = ({ addWords, words }) => {
  return (
    <div>
      add words
    </div>
  );
};

AddWords.propTypes = {
  addWords: PropTypes.func.isRequired
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  getWords: payload => dispatch({ type: FETCH_WORDS_REQUEST, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(AddWords);
