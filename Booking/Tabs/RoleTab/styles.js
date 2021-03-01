import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
	elemsBox: {
		display: 'flex',
		flexFlow: 'row wrap',
		// marginBottom: 15,
		'& > div': {
			display: 'flex',
			flexFlow: 'row wrap',
		},
	},
	elem: {
		display: 'flex',
		marginBottom: 15,
		marginRight: 5,
		'& > p': {
			position: 'relative',
			top: 4,
			marginRight: 10,
		},
	},
	search: {
		marginBottom: 15,
		marginLeft: 10,
	},
	searchIcon: {
		color: theme.palette.grey[600],
	},
	datePicker: {
		marginTop: 0,
		marginBottom: 0,
		width: 130,
	},
	actionsBox: {
		width: 80,
		display: 'flex',
		justifyContent: 'flex-end',
	},
}));
