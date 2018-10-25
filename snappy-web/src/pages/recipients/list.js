import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { getRecipientsList, deleteRecippient } from '../../core/dataProvider';
import AppModal from '../../components/AppModal';
import AppSnackBar from '../../components/AppSnackBar';

class RecipientsList extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			recipients: [],
			deleteModal: {
				message: '',
				open: false,
			},
			recepientToDelete: null,
			openModal: false,
			openNotification: false,
		};
	}

	
	test() {
		console.log('wegwgw')
	}

	getResipients = () => {
		getRecipientsList().then((result) => {
			this.setState({recipients: result.data});
		})
	}

	onDelete = (recepient) => {
		this.setState({
			deleteModal: {
				message: `Are you sure, you want delete recepient ${recepient.firstName} ${recepient.lastName}?`,
				open: true,
			},
			recepientToDelete: recepient,
		});
	}

	deleteRecipient = () => {
		const { recepientToDelete } = this.state;
		deleteRecippient(recepientToDelete._id).then(() => {
			this.setState({ openNotification: true }, () => {
				this.getResipients();
				this.closeDeleteModal();
			})			
		});
	}

	closeDeleteModal = () => {
		this.setState({
			deleteModal: {
				message: '',
				open: false,
			},
			recepientToDelete: null,
		});
	}

	render() {
		const { recipients, deleteModal, openNotification } = this.state; 
		
		return (
			<div>
				<Table classes={{root: 'app-table'}}>
					<TableHead>
						<TableRow>
							<TableCell>Recipient name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Phone</TableCell>
							<TableCell>Address</TableCell>
							<TableCell>Notes</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{recipients.map(recipient => {
							return (
								<TableRow key={recipient._id}>
									<TableCell component="th" scope="row">
										{recipient.firstName} {recipient.lastName}
									</TableCell>
									<TableCell>{recipient.email}</TableCell>
									<TableCell>{recipient.phone}</TableCell>
									<TableCell>{recipient.address}<br/>{recipient.city} {recipient.zipCode}</TableCell>
									<TableCell>{recipient.notes}</TableCell>
									<TableCell>
										<IconButton
											key="delete"
											aria-label="Delete"
											color="inherit"
											onClick={() => this.onDelete(recipient)}
										>
											<DeleteIcon/>
										</IconButton>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
				{
					recipients.length === 0 && 
					<Grid container justify="center">
						<Typography variant="body1" gutterBottom>There are no recipients to show.</Typography>
					</Grid>
				}
				<AppModal 
					open={deleteModal.open}
					message={deleteModal.message}
					handleClose={this.closeDeleteModal}
					handleYes={this.deleteRecipient}
				/>
				<AppSnackBar
					open={openNotification}
					variant="success"
					message="Recipient was successfully deleted!"
					onClose={() => this.setState({ openNotification: false })}
				/>
			</div>
		);
	}
}

export default RecipientsList;
