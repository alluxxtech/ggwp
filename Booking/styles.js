import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
	backBox: {
		display: 'flex',
		alignItems: 'center',
		fontSize: '14px',
		color: theme.palette.text.secondary,
		width: 'fit-content',
		'& svg': {
			marginRight: 3,
		},
		// marginBottom: 75,
		'&:hover': {
			cursor: 'pointer',
		},
	},
	tab: {
		width: 120,
		minWidth: 120,
		height: 40,
		minHeight: 40,
	},
	tabPanel: {
		padding: 0,
		height: 'calc(100vh - 160px)',
		border: `1px solid ${theme.palette.grey[200]}`,
		position: 'relative',
		
		minWidth: 900,
		padding: '25px 25px 0px 25px',
		// height: '100%',
	},
	tabPanelChild: {
		// minWidth: 900,
		// padding: '25px 25px 0px 25px',
		height: '100%',
	},
	tabListIndicator: {
		display: 'none',
	},
	tabListRoot: {
		height: 40,
		minHeight: 40,
	},
}));
