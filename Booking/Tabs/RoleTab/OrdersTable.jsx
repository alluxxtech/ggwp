import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Typography } from '@material-ui/core';
import { default as MaterialCheckIcon } from '@material-ui/icons/Check';
import { default as MaterialCloseIcon } from '@material-ui/icons/Close';
import { useTheme } from '@material-ui/core/styles';

import ActionIcon from '../../../../../../components/Commons/ActionIcon';
import Table from '../../../../../../components/Commons/Table/Table';
import { ORDER_STATUSES } from '../../../../../../constants/constants';

import useStyles from './styles';

function OrdersTable({ handleStatusChange, ...props }) {
	const handleClick = async (id, type) => {
		handleStatusChange(id, type);
	};

	const columns = getColumns(handleClick);
	return (
		<Table columns={columns} pagination={true} {...props} />
	);
}

OrdersTable.propTypes = {
	handleStatusChange: PropTypes.func.isRequired,
};

export default OrdersTable;

function getColumns(onClick) {
	const classes = useStyles();
	const theme = useTheme();
	return [
		{
			id: 'id',
			label: 'Номер',
			style: {
				minWidth: 80,
			}
		},
		{
			id: 'name',
			label: 'Клиент',
			style: {
				minWidth: 110,
			}
		},
		{
			id: 'phone',
			label: 'Телефон',
			style: {
				minWidth: 170,
			}
		},
		{
			id: 'salon',
			label: 'Салон',
			style: {
				minWidth: 150,
			}
		},
		{
			id: 'master',
			label: 'Мастер',
			style: {
				minWidth: 150,
			}
		},
		{
			id: 'service',
			label: 'Услуга',
			style: {
				minWidth: 150,
			},
			render: value => {
				return <Typography variant='body1'>{value ? value.ru : ''}</Typography>;
			},
		},
		{
			id: 'cost',
			label: 'Стоимость',
			style: {
				minWidth: 80,
			},
			render: value => {
				return <Typography variant='body1'>{value}</Typography>;
			},
		},
		{
			id: 'date_created',
			label: 'Дата создания',
			style: {
				minWidth: 120,
			},
			render: (value, row) => {
				return (
					<Typography variant='body2'>
						{moment(value).format("MM.DD.YYYY")}
					</Typography>
				)
			}
		},
		{
			id: 'date_ordered',
			label: 'Дата заказа',
			style: {
				minWidth: 120,
			},
			render: (value, row) => {
				return (
					<Typography variant='body2'>
						{moment(value).format("MM.DD.YYYY")}
					</Typography>
				)
			}
		},
		{
			id: 'actions',
			label: 'Действия',
			style: {
				minWidth: 100,
			},
			render: (value, row) => {
				const icons = getIcons(row);
				return <div className={classes.actionsBox}>{icons}</div>;
			},
		},
	];

	function getIcons(row) {
		switch (row.status) {
			case ORDER_STATUSES.approved: 
			case ORDER_STATUSES.pending_cash: 
			{
				if (!row.is_canceled) {
					return <React.Fragment></React.Fragment>;
				}
				return <CloseIcon id={row.id} />;
			}
			case ORDER_STATUSES.rejected:
			case ORDER_STATUSES.client_refusal:
				return <React.Fragment></React.Fragment>;
			default:
				if (!row.is_canceled) {
					return <CheckIcon id={row.id} />;
				}
				return (
					<React.Fragment>
						<CheckIcon id={row.id} onClick={onClick} />
						<CloseIcon id={row.id} onClick={onClick} />
					</React.Fragment>
				);
		}
	}

	function CheckIcon({ id }) {
		return (
			<ActionIcon
				icon={<MaterialCheckIcon />}
				onClick={() => onClick(id, 'approve')}
				type='success'
				tooltip='Подтвердить заказ'
			/>
		);
	}

	function CloseIcon({ id }) {
		return (
			<ActionIcon
				icon={<MaterialCloseIcon />}
				onClick={() => onClick(id, 'cancel')}
				type='cancel'
				tooltip='Отменить заказ'
			/>
		);
	}
}
