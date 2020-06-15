import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TablePagination from '@material-ui/core/TablePagination';

import ActionTypes from '../../redux/actions';
import { CHECK, LEARN } from '../../constants/listTypes.constants';

const { SET_TABLE_PAGER_SETTINGS } = ActionTypes;

const Pager = ({ count, listType, setPagerSettings, tables }) => {
  const pagerSettings = tables[`${listType}_pagerSettings`]
  const { page, rowsPerPage, rowsPerPageOptions } = pagerSettings;

  const handleChangePage = (_, newPage) => {
    const data = {
      ...pagerSettings,
      page: newPage
    };

    setPagerSettings({ listType, data });
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
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

Pager.propTypes = {
  count: PropTypes.number.isRequired,
  listType: PropTypes.oneOf([CHECK, LEARN]).isRequired,
  setPagerSettings: PropTypes.func.isRequired,
  tables: PropTypes.object
};

const mapStateToProps = state => ({
  tables: state.tables
});

const mapDispatchToProps = dispatch => ({
  setPagerSettings: payload => dispatch({ type: SET_TABLE_PAGER_SETTINGS, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(Pager);
