import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

const CheckFilter = ({
  initialValues,
  maxCount = 25,
  onFilterApply,
  onFilterClear,
  onVerify,
  showVerify
}) => {
  const onClear = (reset) => {
    // TODO Add confirmation here
    reset(initialValues);
    onFilterClear();
  };

  const onVerifyQuiz = (reset) => {
    onFilterClear();
    onVerify();
    reset(initialValues);
  };

  const onMaxCountChange = (value, onChange) => {
    const val = Number(value);

    if (val > maxCount) {
      return;
    }

    onChange(val);
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Generate Quiz</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
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
                render={
                  ({ input }) => (
                    <TextField
                      helperText={`Should not exceed current rows per page: ${maxCount}`}
                      inputProps={{ max: maxCount }}
                      label={`Number of words`}
                      onChange={evt => onMaxCountChange(evt.target.value, input.onChange)}
                      type="number"
                      value={input.value}
                    />
                  )
                }
                name="maxCount"
              />

              <div className="buttons text-right my-2">
                <Button className="mr-2" onClick={() => onClear(form.restart)} variant="contained" disabled={submitting}>
                  Clear
                </Button>
                <Button className="mr-2" variant="contained" color="primary" type="submit" disabled={submitting || pristine}>
                  Load
                </Button>
                {
                  showVerify &&
                  <Button className="mr-2" onClick={() => onVerifyQuiz(form.restart)} variant="contained" color="primary">
                    Verify
                  </Button>
                }
              </div>
            </form>
          )}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

CheckFilter.propTypes = {
  initialValues: PropTypes.object,
  maxCount: PropTypes.number,
  onFilterApply: PropTypes.func.isRequired,
  onFilterClear: PropTypes.func.isRequired,
  onVerify: PropTypes.func.isRequired,
  showVerify: PropTypes.bool.isRequired
};

export default CheckFilter;
