import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AdditionalFields from './AdditionalFields.component';

const AddWord = ({ fields, tryAddWord, tryDeleteWord, values }) => (
  <>
    {
      fields.map((word, index) => (
        <ExpansionPanel key={index} className="mb-2">
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Field required name={`${word}.word`}>
              {
                props => (
                  <TextField
                    required
                    autoFocus
                    className="w-45 mr-3"
                    label="Word"
                    name={props.input.name}
                    value={props.input.value}
                    onChange={props.input.onChange}
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                  />
                )
              }
            </Field>

            <Field name={`${word}.translation`}>
              {
                props => (
                  <TextField
                    className="w-45 mr-3"
                    label="Translation"
                    name={props.input.name}
                    value={props.input.value}
                    onChange={props.input.onChange}
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                  />
                )
              }
            </Field>

            <DeleteIcon className="d-flex align-self-end" color="error" onClick={() => tryDeleteWord(fields, index)} />
          </ExpansionPanelSummary>

          <ExpansionPanelDetails className="flex-column">
            <AdditionalFields prefix={`${word}.`} values={values.words[index]} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))
    }

    <AddCircleOutlineIcon className="my-3" color="primary" onClick={() => tryAddWord(fields)} />
  </>
);

AddWord.propTypes = {
  fields: PropTypes.object,
  tryAddWord: PropTypes.func.isRequired,
  tryDeleteWord: PropTypes.func.isRequired,
  values: PropTypes.object
};

export default AddWord;
