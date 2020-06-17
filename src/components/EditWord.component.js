import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import AdditionalFields from './AdditionalFields.component';

const EditWord = ({ handleSubmit, form, invalid, submitting, pristine, values }) => (
  <form onSubmit={handleSubmit} className="w-100 mx-auto my-o">
    <div className="d-flex justify-content-between align-items-end mb-4">
      <Field required name="word">
        {
          props => (
            <TextField
              autoFocus
              required
              className="w-45"
              label="Word"
              name={props.input.name}
              value={props.input.value}
              onChange={props.input.onChange}
            />
          )
        }
      </Field>

      <Field name="translation">
        {
          props => (
            <TextField
              className="w-45"
              label="Translation"
              name={props.input.name}
              value={props.input.value}
              onChange={props.input.onChange}
            />
          )
        }
      </Field>
    </div>

    <AdditionalFields values={values} />

    <div className="buttons mt-2 text-right">
      <Button className="mr-2" variant="contained" color="primary" type="submit" disabled={invalid || submitting || pristine}>
        Save
      </Button>

      <Button variant="contained" onClick={form.reset} disabled={submitting || pristine}>
        Reset
      </Button>
    </div>
  </form>
);

EditWord.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired
};

export default EditWord;
