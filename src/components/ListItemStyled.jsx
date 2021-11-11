import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';

export const ListItemTextCustom = styled(ListItemText, {
	shouldForwardProp: (prop) => prop !== 'finish',
})(({ finish }) => ({
	...(finish && {
		textDecorationLine: 'line-through',
	}),
}));
