import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const AddWordsValidationDialog = ({
  errors,
  handleClose,
  modalOpened
}) => (
  <Dialog
    open={modalOpened}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Not all of the words have been saved"}</DialogTitle>

    <DialogContent>
      <ul>
        {
          errors && errors.map((error, i) => (
            <li key={`${error.item.word}-${i}`}>
              <b>{error.item.word}</b> was not saved. Reason: {error.error.errmsg}
            </li>
          ))
        }
      </ul>
    </DialogContent>

    <DialogActions>
      <Button onClick={handleClose} color="primary" autoFocus>
        Got it
      </Button>
    </DialogActions>
  </Dialog>
);

AddWordsValidationDialog.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object),
  handleClose: PropTypes.func.isRequired,
  modalOpened: PropTypes.bool.isRequired
};

export default AddWordsValidationDialog;
