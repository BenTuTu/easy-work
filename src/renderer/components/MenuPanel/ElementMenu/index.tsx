import React from 'react';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import MenuDragItem from '../MenuDragItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import s from './index.module.scss';
import { observer } from 'mobx-react';
import { Store, useStore } from 'renderer/store';

const itemData = [
	{
		img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
		title: 'Fern',
	},
	{
		img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',
		title: 'Snacks',
	},
	{
		img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
		title: 'Mushrooms',
	},
	{
		img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383',
		title: 'Tower',
	},
	{
		img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
		title: 'Sea star',
	},
	{
		img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
		title: 'Honey',
	},
	{
		img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
		title: 'Basketball',
	},
	{
		img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
		title: 'Breakfast',
	},
	{
		img: 'https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d',
		title: 'Tree',
	},
	{
		img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
		title: 'Burger',
	},
	{
		img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
		title: 'Camera',
	},
	{
		img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
		title: 'Coffee',
	},
	{
		img: 'https://images.unsplash.com/photo-1627000086207-76eabf23aa2e',
		title: 'Camping Car',
	},
	{
		img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
		title: 'Hats',
	},
	{
		img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
		title: 'Tomato basil',
	},
	{
		img: 'https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7',
		title: 'Mountain',
	},
	{
		img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
		title: 'Bike',
	},
];

function ElementMenu() {
	const { blockManager } = useStore() as Store;
	const [open, setOpen] = React.useState(false);
	const anchorEleRef = React.useRef<HTMLButtonElement>(null);

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};

	const handleClose = (event: Event | React.SyntheticEvent) => {
		if (anchorEleRef.current && anchorEleRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setOpen(false);
	};

	const handleListKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') {
			setOpen(false);
		}
	};

	return (
		<div className={s.elementMenu}>
			<Accordion style={{ width: '100%' }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
					<Typography>基础组件</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Masonry columns={2} spacing={2}>
						{blockManager.dragBlocksList.map(({ renderBlock, ...data }, idx: number) => (
							<MenuDragItem key={idx} data={data}>
								{renderBlock?.({ src: '3333' })}
							</MenuDragItem>
						))}
					</Masonry>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}

export default observer(ElementMenu);
