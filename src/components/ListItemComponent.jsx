import React from 'react';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import { ListItemTextCustom } from './ListItemStyled';

export default function ListItemComponent(props) {
	const { value, divider, finish, changeFinish, parentTask = '' } = props;
	const [checked, setChecked] = React.useState(finish);
	let classes = '';
	if (parentTask !== '') {
		classes = { paddingLeft: 4 };
	}
	const handleToggle = (e) => {
		setChecked(e.target.checked);
		changeFinish(value, e.target.checked, parentTask);
	};
	return (
		<>
			{divider ? <Divider variant='middle' /> : ''}
			<ListItem
				key={value}
				alignItems='flex-start'
				sx={classes}
				secondaryAction={
					<Checkbox
						edge='end'
						onChange={handleToggle}
						checked={checked}
						inputProps={{
							'aria-labelledby': `checkbox-list-secondary-label-${value}`,
						}}
					/>
				}
			>
				<ListItemTextCustom finish={finish} primary={value} />
			</ListItem>
		</>
	);
}
ListItemComponent.propTypes = {
	value: PropTypes.string,
	finish: PropTypes.bool,
	divider: PropTypes.bool,
	changeFinish: PropTypes.func,
	parentTask: PropTypes.string,
};
