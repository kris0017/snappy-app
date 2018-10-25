import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { PHONE_MASK, EMAIL_REGEX } from '../../utils/const';
import PhoneInput from '../../components/PhoneInput';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class CreateRecipient extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			recipient: {
				firstName: '',
				lastName: '',
				address: '',
				zipCode: '',
				city: '',
				email: '',
				phone: PHONE_MASK,
				notes: ''
			}
		};
	}

	handleChange = (key, event) => {
    this.setState({ 
			recipient: {
				...this.state.recipient,
				[key]: event.target.value
			}
		});
	};
	
	clear = () => {
		this.setState({ 
			recipient: {
				firstName: '',
				lastName: '',
				address: '',
				zipCode: '',
				city: '',
				email: '',
				phone: PHONE_MASK,
				notes: ''
			}
		});
	}


	render() {
		const { recipient } = this.state;
		const { classes } = this.props;

		return (
				<Grid container spacing={24}>
					<Grid item xs={12} sm={6}>
						<TextField
							id="first-name"
							label="First name"
							className={classes.textField}
							value={recipient.firstName}
							onChange={event => this.handleChange('firstName', event)}
							required
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="last-name"
							label="Last name"
							className={classes.textField}
							value={recipient.lastName}
							onChange={event => this.handleChange('lastName', event)}
							required
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id="address"
							label="Address"
							helperText="(street, floor, apartment, etc.)"
							className={classes.textField}
							value={recipient.address}
							onChange={event => this.handleChange('address', event)}
							required
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<TextField
							id="city"
							label="City"
							className={classes.textField}
							value={recipient.city}
							onChange={event => this.handleChange('city', event)}
							required
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<TextField
							id="zip-code"
							label="Zip code"
							className={classes.textField}
							value={recipient.zipCode}
							onChange={event => this.handleChange('zipCode', event)}
							required
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="email"
							label="Email"
							className={classes.textField}
							value={recipient.email}
							onChange={event => this.handleChange('email', event)}
							required
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<PhoneInput
							id="phone"
							label="Phone"
							value={recipient.phone}
							onChange={event => this.handleChange('phone', event)}
							required
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<TextField
							id="notes"
							label="Special notes"
							className={classes.textField}
							value={recipient.notes}
							onChange={event => this.handleChange('notes', event)}
							multiline
							rows={3}
						/>
					</Grid>
					<Grid container justify="flex-end">
						<Button variant="outlined" className={classes.button} onClick={this.clear}>
							Clear
						</Button>
						<Button variant="contained" color="primary" className={classes.button}>
							Save
						</Button>
					</Grid>
				</Grid>
		);
	}
}

export default withStyles(styles)(CreateRecipient);
