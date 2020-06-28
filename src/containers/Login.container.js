import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, Form } from 'react-final-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import ActionTypes from '../redux/actions';

const { LOGIN_REQUEST } = ActionTypes;

const Login = ({ login }) => {
  const initialValues = {};

  const onSubmit = (formData) => {
    login(formData);
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, form, invalid, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className="w-50 mx-auto my-o">
            <Field required name="username">
              {
                props => (
                  <TextField
                    autoFocus
                    required
                    className="w-100 my-4"
                    label="Username"
                    name={props.input.name}
                    value={props.input.value}
                    onChange={props.input.onChange}
                  />
                )
              }
            </Field>

            <Field required name="password">
              {
                props => (
                  <TextField
                    required
                    className="w-100"
                    label="Password"
                    type="password"
                    name={props.input.name}
                    value={props.input.value}
                    onChange={props.input.onChange}
                  />
                )
              }
            </Field>

            <div className="buttons text-right mt-4">
              <Button className="mr-2" variant="contained" color="primary" type="submit" disabled={invalid || submitting || pristine}>
                Login
              </Button>

              <Button variant="contained" onClick={form.reset} disabled={submitting || pristine}>
                Reset
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ });

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch({ type: LOGIN_REQUEST, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
