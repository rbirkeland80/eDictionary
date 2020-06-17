import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import { NOUN, PART_OF_SPEECH_OPTIONS, VERB } from '../constants/fields.constants';

const AdditionalFields = ({ prefix = '', values = {} }) => (
  <>
    <div className="d-flex justify-content-between align-items-end mb-4">
      <Field name={`${prefix}description`}>
        {
          props => (
            <TextField
              className="w-45"
              label="Description"
              name={props.input.name}
              value={props.input.value}
              onChange={props.input.onChange}
            />
          )
        }
      </Field>

      <Field name={`${prefix}partOfSpeech`}>
        {
          props => (
            <FormControl className="w-45">
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
    </div>

    <div className="d-flex justify-content-between align-items-end mb-4">
      {
        values.partOfSpeech === NOUN.value &&
        <Field name={`${prefix}plural`}>
          {
            props => (
              <TextField
                className="w-100"
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
        <Field name={`${prefix}simplePast`}>
          {
            props => (
              <TextField
                className="w-45"
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
        <Field name={`${prefix}pastParticiple`}>
          {
            props => (
              <TextField
                className="w-45"
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
      <Field name={`${prefix}synonyms`}>
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

      <Field name={`${prefix}antonyms`}>
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
      <Field name={`${prefix}tags`}>
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

      <Field name={`${prefix}transcription`}>
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
      <Field name={`${prefix}examples`}>
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
  </>
);

AdditionalFields.propTypes = {
  prefix: PropTypes.string,
  values: PropTypes.object
};

export default AdditionalFields;
