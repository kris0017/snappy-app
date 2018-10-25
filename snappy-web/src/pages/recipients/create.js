import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { NOTES_MAX_LENGTH, PHONE_MAX_LENGTH } from '../../utils/const';
import { getRestictedNumberString } from '../../utils/func';
import { createRecipient } from '../../core/dataProvider';
import AppSnackBar from '../../components/AppSnackBar';

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
				phone: '',
				notes: ''
			},
			submitted: false,
			errors: {},
			openNotification: false,
		};
	}

	handleChange = (key, value) => {
    this.setState({ 
			recipient: {
				...this.state.recipient,
				[key]: value
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
				phone: '',
				notes: ''
			},
			submitted: false,
			errors: {}
		});
	}
	
	handleSubmit = () => {
		this.setState({ submitted: true }, () => {
			createRecipient(this.state.recipient).then((result) => {
				if (result.data.errors) {
					this.setState({ errors: result.data.errors})
				} else {
					this.clear();
					this.setState({ openNotification: true}, () => {
						setTimeout(() => this.setState({ openNotification: false }), 10000);
					})
				}
			})
		});
	}

	render() {
		const { recipient, submitted, errors, openNotification } = this.state;
		const { classes } = this.props;

		return (
			<ValidatorForm ref="form" onSubmit={this.handleSubmit} instantValidate={false} onError={errors => console.log(errors)}>
				<Grid container spacing={24}>
					<Grid item xs={12} sm={6}>
						<TextValidator
							id="first-name"
							name="first-name"
							label="First name"
							className={classes.textField}
							value={recipient.firstName}
							onChange={event => this.handleChange('firstName', event.target.value)}
							validators={['required']}
							errorMessages={['Please, enter first name']}
							error={errors.firstName !== undefined}
  						helperText={errors.firstName ? errors.firstName.message : ''}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextValidator
							id="last-name"
							name="last-name"
							label="Last name"
							className={classes.textField}
							value={recipient.lastName}
							onChange={event => this.handleChange('lastName', event.target.value)}
							validators={['required']}
							errorMessages={['Please, enter last name']}
							error={errors.lastName !== undefined}
  						helperText={errors.lastName ? errors.lastName.message : ''}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextValidator
							id="address"
							name="address"
							label="Address"
							className={classes.textField}
							value={recipient.address}
							onChange={event => this.handleChange('address', event.target.value)}
							validators={['required']}
							errorMessages={['Please, enter address']}
							error={errors.address !== undefined}
  						helperText={errors.address ?  errors.address.message : "(street, floor, apartment, etc.)"}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<TextValidator
							id="city"
							name="city"
							label="City"
							className={classes.textField}
							value={recipient.city}
							onChange={event => this.handleChange('city', event.target.value)}
							validators={['required']}
							errorMessages={['Please, enter city']}
							error={errors.city !== undefined}
  						helperText={errors.city ?  errors.city.message : ''}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<TextValidator
							id="zip-code"
							name="zip-code"
							label="Zip code"
							className={classes.textField}
							value={recipient.zipCode}
							onChange={event => this.handleChange('zipCode', event.target.value)}
							validators={['required']}
							errorMessages={['Please, enter zip code']}
							error={errors.zipCode !== undefined}
  						helperText={errors.zipCode ?  errors.zipCode.message : ''}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextValidator
							id="email"
							name="email"
							label="Email"
							className={classes.textField}
							value={recipient.email}
							onChange={event => this.handleChange('email', event.target.value)}
							validators={['required', 'isEmail']}
							errorMessages={['Please, enter email', 'Email format is incorrect']}
							error={errors.email !== undefined}
  						helperText={errors.email ?  errors.email.message : ''}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						{/* We could add mask here, but it's not required in the task  */}
						<TextValidator
							id="phone"
							name="phone"
							label="Phone"
							className={classes.textField}
							value={recipient.phone}
							onChange={event => this.handleChange('phone', getRestictedNumberString(event.target.value))}
							validators={['required', `maxStringLength:${PHONE_MAX_LENGTH}`]}
							errorMessages={['Please, enter phone', `Your phone number is too long. Maximum length is ${PHONE_MAX_LENGTH} symbols. You already entered ${recipient.phone.length} symbols.`]}
							error={errors.phone !== undefined}
  						helperText={errors.phone ?  errors.phone.message : ''}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<TextValidator
							id="notes"
							name="notes"
							label="Special notes"
							className={classes.textField}
							value={recipient.notes}
							onChange={event => this.handleChange('notes', event.target.value)}
							multiline
							rows={3}
							validators={[`maxStringLength:${NOTES_MAX_LENGTH}`]}
							errorMessages={[`Your notes are too long. Maximum length is ${NOTES_MAX_LENGTH} symbols. You already entered ${recipient.notes.length} symbols.`]}
							error={errors.notes !== undefined}
  						helperText={errors.notes ?  errors.notes.message : ''}
						/>
					</Grid>
					<Grid container justify="flex-end">
						<Button variant="outlined" className={classes.button} onClick={this.clear}>
							Clear
						</Button>
						<Button disabled={submitted} variant="contained" color="primary" className={classes.button} type="submit">
							{ submitted ? 'Saving...' : 'Save'}
						</Button>
					</Grid>
				</Grid>
				<AppSnackBar
					open={openNotification}
					variant="success"
					message="Recipient was successfully created"
					onClose={() => this.setState({ openNotification: false })}
				/>
			</ValidatorForm>
		);
	}
}

export default withStyles(styles)(CreateRecipient);
