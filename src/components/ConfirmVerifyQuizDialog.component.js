import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ConfirmVerifyQuizDialog = ({ handleClose, modalOpened }) => (
  <Dialog open={modalOpened} onClose={handleClose}>
    <DialogTitle>Verify current page</DialogTitle>

    <DialogContent>
      <Typography>Only words from this page have been saved as verified. To proceed, turn the page and repeat :)!</Typography>
    </DialogContent>

    <DialogActions>
      <Button onClick={handleClose} color="primary" autoFocus>
        Got it
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmVerifyQuizDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  modalOpened: PropTypes.bool.isRequired
};

export default ConfirmVerifyQuizDialog;
