import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ConfirmDeleteWordDialog = ({ handleClose, modalData, modalOpened }) => (
  <Dialog open={modalOpened} onClose={handleClose}>
    <DialogTitle>Are you sure?</DialogTitle>

    <DialogContent>
      <Typography>
        You are about to delete the word <strong>"{modalData.word}"</strong>. Please confirm!
      </Typography>
    </DialogContent>

    <DialogActions>
      <Button onClick={() => handleClose(modalData.id)} color="primary" autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmDeleteWordDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  modalData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    word: PropTypes.string.isRequired
  }).isRequired,
  modalOpened: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  modalData: state.modals.modalData
});

export default connect(mapStateToProps, {})(ConfirmDeleteWordDialog);
