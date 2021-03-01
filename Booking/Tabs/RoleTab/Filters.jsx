import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Box } from '@material-ui/core';

import Input from '../../../../../../components/Commons/Input';
import SelectFilter from '../../../../common/components/Filters/SelectFilter';
import SearchIcon from '@material-ui/icons/Search';
import { updateBookingFilter } from '../../../../../../data/actions/sadminCabinet';

import useStyles from './styles';

export default function FilterBlock({ filterStructure, isLoading = false, ...props }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const types = filterStructure && filterStructure.types;
	const order_statuses = filterStructure && filterStructure.order_statuses;
	const payment_statuses = filterStructure && filterStructure.payment_statuses;

	const handleChange = (value, type) => {
		dispatch(
			updateBookingFilter({
				[type]: value,
			})
		);
	};

	const handleOnSearch = value => {
		const type = 'search';
		dispatch(
			updateBookingFilter({
				[type]: value,
			})
		);
	};

	return (
		<React.Fragment>
			<div className={classes.elemsBox}>
				<div>
					<Box className={classes.elem}>
						<SelectFilter
							list={types}
							type='type'
							title={props.translation.sadmin.filters.title.type}
							onChange={handleChange}
							disabled={isLoading}
							{...props}
						/>
					</Box>
					<Box className={classes.elem}>
						<SelectFilter
							list={order_statuses}
							type='order_status'
							title={props.translation.sadmin.filters.title.order_statuses}
							onChange={handleChange}
							disabled={isLoading}
							{...props}
						/>
					</Box>
					<Box className={classes.elem}>
						<SelectFilter
							list={payment_statuses}
							type='payment_status'
							title={props.translation.sadmin.filters.title.payment_statuses}
							onChange={handleChange}
							disabled={isLoading}
							{...props}
						/>
					</Box>
				</div>
				<div>
					<Box className={classes.search}>
						<Input
							onChange={handleOnSearch}
							delay={400}
							placeholder={props.translation.sadmin.filters.title.search}
							icon={<SearchIcon className={classes.searchIcon} />}
						/>
					</Box>
				</div>
			</div>
		</React.Fragment>
	);
};
