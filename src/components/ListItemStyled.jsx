import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';

export const ListItemTextCustom = styled(ListItemText, {
	shouldForwardProp: (prop) => prop !== 'finish',
})(({ finish }) => ({
	...(finish && {
		'.MuiListItemText-primary': { textDecorationLine: 'line-through' },
	}),
}));
