import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import Filters from './Filters';
import Statistic from './../../../../common/BookingArea/Statistic';
import OrdersTable from './OrdersTable';
import { updateOrderStatus } from './../../../../../../data/reducers/sadminCabinet/bookingReducer';
import { updateBookingPagination } from '../../../../../../data/actions/sadminCabinet';

function RoleTab({ role, statistics, filters, filterStructure, pagination, totalCount, orders, ...props }) {
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();

	const handleStatusChange = (id, type) => {
		dispatch(updateOrderStatus(id, type, filters, pagination, role, enqueueSnackbar));
	};

	const handleChangePage = (event, value) => {
		dispatch(
			updateBookingPagination({
				currentPage: value,
			})
		);
	};

	const handleChangeRowsPerPage = event => {
		const value = parseInt(event.target.value, 10);
		dispatch(
			updateBookingPagination({
				rowsPerPage: value,
			})
		);
	};

	return (
		<React.Fragment>
			<Filters 
				filterStructure={filterStructure} 
				translation={props.localize.content}
			/>
			<Statistic statistics={statistics} />
			<OrdersTable
				page={pagination.currentPage}
				rowsPerPage={pagination.rowsPerPage}
				count={totalCount}
				data={orders}
				handleStatusChange={handleStatusChange}
				handleChangePage={handleChangePage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				{...props}
			/>
		</React.Fragment>
	);
}

RoleTab.propTypes = {
	role: PropTypes.string.isRequired,
	//todo add props
};

export default RoleTab;
