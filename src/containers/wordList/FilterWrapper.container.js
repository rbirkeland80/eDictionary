import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActionTypes from '../../redux/actions';
import { CHECK, LEARN } from '../../constants/listTypes.constants';

const {
  CLEAR_TABLE_FILTER_SETTINGS,
  FETCH_WORDS_REQUEST,
  GENERATE_QUIZ_REQUEST,
  SET_TABLE_FILTER_SETTINGS,
  SET_TABLE_PAGER_SETTINGS,
  VERIFY_QUIZ_REQUEST
} = ActionTypes;

const FilterWrapper = ({
  clearFilter,
  fields,
  filter,
  generateQuiz,
  getWords,
  listType,
  setFilterSettings,
  setPagerSettings,
  tables,
  verifyQuiz,
  wordIds
}) => {
  const Filter = filter;
  const filterIsApplied = tables[`${listType}_filterIsApplied`];
  const filterSettings = tables[`${listType}_filterSettings`];
  const pagerSettings = tables[`${listType}_pagerSettings`]
  const { rowsPerPage } = pagerSettings;

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
    getWords({ fields, skip: 0, limit: rowsPerPage, listType });
  };

  const onQuizVerify = () => {
    verifyQuiz(wordIds);
    onFilterClear();
  };

  return (
    <Filter
      initialValues={filterSettings}
      maxCount={rowsPerPage}
      onFilterApply={onFilterApply}
      onFilterClear={onFilterClear}
      onVerify={onQuizVerify}
      showVerify={filterIsApplied}
    />
  );
};

FilterWrapper.propTypes = {
  clearFilter: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  filter: PropTypes.elementType,
  generateQuiz: PropTypes.func.isRequired,
  getWords: PropTypes.func.isRequired,
  listType: PropTypes.oneOf([CHECK, LEARN]).isRequired,
  setFilterSettings: PropTypes.func.isRequired,
  setPagerSettings: PropTypes.func.isRequired,
  tables: PropTypes.object,
  verifyQuiz: PropTypes.func.isRequired,
  wordIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  tables: state.tables
});

const mapDispatchToProps = dispatch => ({
  clearFilter: payload => dispatch({ type: CLEAR_TABLE_FILTER_SETTINGS, payload }),
  generateQuiz: payload => dispatch({ type: GENERATE_QUIZ_REQUEST, payload }),
  getWords: payload => dispatch({ type: FETCH_WORDS_REQUEST, payload }),
  setFilterSettings: payload => dispatch({ type: SET_TABLE_FILTER_SETTINGS, payload }),
  setPagerSettings: payload => dispatch({ type: SET_TABLE_PAGER_SETTINGS, payload }),
  verifyQuiz: payload => dispatch({ type: VERIFY_QUIZ_REQUEST, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterWrapper);
