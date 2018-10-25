import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class AppModal extends React.Component {
  render() {
    const { classes, open, handleClose, message, handleYes } = this.props;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <Typography variant="body1" gutterBottom>{message}</Typography>
          <Grid container justify="flex-end">
            <Button variant="outlined" className={classes.button} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" className={classes.button} onClick={handleYes}>
              Yes
            </Button>
          </Grid>
        </div>
      </Modal>
    );
  }
}

AppModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string,
  handleYes: PropTypes.func.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
export default withStyles(styles)(AppModal);