import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { NOUN, PART_OF_SPEECH_OPTIONS, VERB } from '../constants/fields.constants';

const EditWord = ({ handleSubmit, form, invalid, submitting, pristine, values }) => (
  <form onSubmit={handleSubmit} className="w-100 mx-auto my-o">
    <div className="d-flex justify-content-between align-items-end mb-4">
      <Field required name="word">
        {
          props => (
            <TextField
              autoFocus
              required
              className="w-25"
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
              className="w-25"
              label="Translation"
              name={props.input.name}
              value={props.input.value}
              onChange={props.input.onChange}
            />
          )
        }
      </Field>

      <Field name="description">
        {
          props => (
            <TextField
              className="w-25"
              label="Description"
              name={props.input.name}
              value={props.input.value}
              onChange={props.input.onChange}
            />
          )
        }
      </Field>
    </div>

    <div className="d-flex justify-content-between align-items-end mb-4">
      <Field name="partOfSpeech">
        {
          props => (
            <FormControl className="w-25">
              <InputLabel id="part-of-speech-label">Part of speech</InputLabel>
              <Select
                labelId="part-of-speech-label"
                id="part-of-speech"
                name={props.input.name}
                value={props.input.value}
                onChange={props.input.onChange}
              >
                {
                  PART_OF_SPEECH_OPTIONS.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)
                }
              </Select>
            </FormControl>
          )
        }
      </Field>

      {
        values.partOfSpeech === NOUN.value &&
        <Field name="plural">
          {
            props => (
              <TextField
                className="w-50"
                label="Plural"
                name={props.input.name}
                value={props.input.value}
                onChange={props.input.onChange}
              />
            )
          }
        </Field>
      }

      {
        values.partOfSpeech === VERB.value &&
        <Field name="simplePast">
          {
            props => (
              <TextField
                className="w-25"
                label="Simple Past"
                name={props.input.name}
                value={props.input.value}
                onChange={props.input.onChange}
              />
            )
          }
        </Field>
      }

      {
        values.partOfSpeech === VERB.value &&
        <Field name="pastParticiple">
          {
            props => (
              <TextField
                className="w-25"
                label="Past Participle"
                name={props.input.name}
                value={props.input.value}
                onChange={props.input.onChange}
              />
            )
          }
        </Field>
      }
    </div>

    <div className="d-flex justify-content-between align-items-end mb-4">
      <Field required name="synonyms">
        {
          props => (
            <TextField
              className="w-45"
              label="Synonyms"
              helperText="Separate with comas"
              name={props.input.name}
              value={props.input.value}
              onChange={props.input.onChange}
            />
          )
        }
      </Field>

      <Field name="antonyms">
        {
          props => (
            <TextField
              className="w-45"
              label="Antonyms"
              helperText="Separate with comas"
              name={props.input.name}
              value={props.input.value}
              onChange={props.input.onChange}
            />
          )
        }
      </Field>
    </div>

    <div className="d-flex justify-content-between align-items-end mb-4">
      <Field required name="tags">
        {
          props => (
            <TextField
              className="w-45"
              label="Tags"
              helperText="Separate with comas"
              name={props.input.name}
              value={props.input.value}
              onChange={props.input.onChange}
            />
          )
        }
      </Field>

      <Field name="transcription">
        {
          props => (
            <TextField
              className="w-45"
              label="Transcription"
              helperText="Separate with comas"
              name={props.input.name}
              value={props.input.value}
              onChange={props.input.onChange}
            />
          )
        }
      </Field>
    </div>

    <div className="d-flex justify-content-between align-items-end mb-4">
      <Field required name="examples">
        {
          props => (
            <TextField
              multiline
              className="w-100"
              label="Examples"
              rows={4}
              name={props.input.name}
              value={props.input.value}
              onChange={props.input.onChange}
            />
          )
        }
      </Field>
    </div>

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
