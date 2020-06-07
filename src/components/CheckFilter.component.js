import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

const CheckFilter = ({ initialValues, onFilterApply, onFilterClear }) => {
  const onClear = (reset) => {
    reset(initialValues);
    onFilterClear();
  };

  return (
    <Form
      onSubmit={onFilterApply}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, pristine, form }) => (
        <form onSubmit={handleSubmit} className="w-50 mx-auto my-o">
          <Field
            render={({ input }) => (
              <RadioGroup value={input.value} className="flex-row" aria-label="Type" onChange={evt => input.onChange(evt.target.value)}>
                <FormControlLabel value="newest" control={<Radio />} label="Newest" />
                <FormControlLabel value="oldest" control={<Radio />} label="Oldest" />
                <FormControlLabel value="random" control={<Radio />} label="Random" />
              </RadioGroup>
            )}
            name="type"
          />

          <Field
            render={({ input }) => (
              <FormControlLabel
                control={<Checkbox checked={input.value} onChange={evt => input.onChange(Boolean(evt.target.value))} />}
                label="Include items to verify"
                className="d-block mb-0"
              />
            )}
            name="includeToVerify"
          />

          <Field
            render={({ input }) => <TextField label="Number of words" type="number" value={input.value} onChange={evt => input.onChange(Number(evt.target.value))} />}
            name="maxCount"
          />

          <div className="buttons text-right my-2">
            <Button className="mr-2" onClick={() => onClear(form.restart)} variant="contained" color="secondary" disabled={submitting}>
              Clear
            </Button>
            <Button className="mr-2" variant="contained" color="primary" type="submit" disabled={submitting || pristine}>
              Load
            </Button>
          </div>
        </form>
      )}
    />
  );
};

CheckFilter.propTypes = {
  initialValues: PropTypes.object,
  onFilterApply: PropTypes.func.isRequired,
  onFilterClear: PropTypes.func.isRequired
};

export default CheckFilter;
