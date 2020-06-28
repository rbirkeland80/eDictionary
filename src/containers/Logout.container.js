import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActionTypes from '../redux/actions';

const { LOGOUT_REQUEST } = ActionTypes;

const Logout = ({ logout }) => {
  useEffect(() => {
    logout();
  }, [logout]);

  return null;
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ });

const mapDispatchToProps = dispatch => ({
  logout: payload => dispatch({ type: LOGOUT_REQUEST, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
