import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import isEqual from 'lodash.isequal';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Typography, Tab } from '@material-ui/core';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
// import LinearProgress from '@material-ui/core/LinearProgress';

import { Roles } from '../../constants';
import RoleTab from './Tabs/RoleTab/index';
import DataContainer from '../../common/components/DataContainer';
import LineProgress from '../../../../components/Commons/LineProgress';
import { resetTabState } from '../../../../data/actions/sadminCabinet';
import { fetchBookingData } from './../../../../data/reducers/sadminCabinet/bookingReducer';
import useAutoReload from './../../common/helpers/autoReload';
import Stepback from '../../common/components/Stepback';

import styles from './styles';

function Booking() {
	const classes = styles();
	const { filters, filterStructure, pagination, ...state } = useSelector(state => state.bookingReducer);
	const localize = useSelector(state => state.language);
	const dispatch = useDispatch();

	const [role, setRole] = React.useState(Roles[0]);

	const prevFilters = usePrevious(filters);
	const prevPagination = usePrevious(pagination);

	React.useEffect(() => {
		return () => {
			dispatch(resetTabState());
		};
	}, []);

	const [reload, setReload] = useAutoReload(fetchData);

	React.useEffect(() => {
		if (!isEqual(filters, prevFilters) || 
			!isEqual(pagination, prevPagination) || 
			role.name
		) {
			fetchData()
			setReload(!reload);
		}
	}, [filters, pagination, role.name]);

	const handleTabChange = (event, newValue) => {
		const newRole = Roles.find(i => i.id === newValue);
		if (newRole && newRole.title !== role.title) {
			setRole(newRole);
			dispatch(resetTabState());
		}
	};

	//fetch booking data
	function fetchData() {
		dispatch(fetchBookingData(filters, pagination, role.name));
	}

	return (
		<React.Fragment>
			<Stepback />
			<TabsContainer
				filterStructure={filterStructure}
				handleTabChange={handleTabChange}
				role={role}
				classes={classes}
				filters={filters}
				pagination={pagination}
				localize={localize}
				{...state}
			/>
		</React.Fragment>
	);
}

const TabsContainer = ({
	filterStructure,
	handleTabChange,
	role,
	classes,
	filters,
	pagination,
	isLoading,
	...props
}) => {
	return (
		<TabContext value={role.id}>
			<TabList
				onChange={handleTabChange}
				aria-label='simple tabs example'
				classes={{ indicator: classes.tabListIndicator, root: classes.tabListRoot }}
			>
				{Roles.map(r => (
					<Tab key={r.id} label={r.title} value={r.id} className={classes.tab} />
				))}
			</TabList>
			{Roles.map(r => (
				<TabPanel key={r.id} value={r.id}>
					<DataContainer header={true}>
						<LineProgress
							isShow={isLoading}
						/>
						<div className={classes.tabPanelChild}>
							<RoleTab
								filterStructure={filterStructure}
								role={r.name}
								filters={filters}
								pagination={pagination}
								isLoading={isLoading}
								{...props}
							/>
						</div>
					</DataContainer>
				</TabPanel>
			))}
		</TabContext>
	);
};

//возвращяем предидущий проперти
function usePrevious(value) {
	const ref = React.useRef();
	React.useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

export default Booking;
