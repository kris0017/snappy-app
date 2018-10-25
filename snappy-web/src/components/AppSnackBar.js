import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function AppSnackBar(props) {
  const { classes, className, message, onClose, variant, open, ...other } = props;
  const Icon = variantIcon[variant];
  return (
		<Snackbar
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={open}
			autoHideDuration={9000}
			onClose={onClose}
			>
			<SnackbarContent
				className={classNames(classes[variant], className)}
				aria-describedby="client-snackbar"
				message={
					<span id="client-snackbar" className={classes.message}>
						<Icon className={classNames(classes.icon, classes.iconVariant)} />
						{message}
					</span>
				}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						className={classes.close}
						onClick={onClose}
					>
						<CloseIcon className={classes.icon} />
					</IconButton>,
				]}
				{...other}
			/>
		</Snackbar>
  );
}

AppSnackBar.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
	onClose: PropTypes.func,
	open: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf(['success']).isRequired,
};

export default withStyles(styles)(AppSnackBar);
