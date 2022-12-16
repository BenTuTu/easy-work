import React, { ReactNode, RefObject } from 'react';
import { Card, CardContent, ImageListItem, Typography } from '@mui/material';
import BubbleChartRoundedIcon from '@mui/icons-material/BubbleChartRounded';
import { ImageForm } from './form';
import DrawItemService from 'renderer/services/drawItem';

export interface ImgProps {
	src: string;
	type: string;
}

export const imageConfig = {
	data: {
		type: 'image',
		src: 'http://img95.699pic.com/photo/50136/1351.jpg_wh300.jpg',
	},
	type: 'image',
	renderBlock: function (props: DrawItemService): ReactNode {
		return (
			<Card sx={{ Width: 90 }}>
				<CardContent>
					<BubbleChartRoundedIcon />
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						adjective
					</Typography>
				</CardContent>
			</Card>
		);
	},
	renderView: function (props: DrawItemService, ref: RefObject<any>): ReactNode {
		const { src } = props.data || {};
		return (
			<div ref={ref} style={{ width: '100%' }}>
				<ImageListItem key={src}>
					<img
						src={src}
						srcSet={src}
						// alt={item.title}
						loading="lazy"
					/>
				</ImageListItem>
			</div>
		);
	},
	renderForm: function (data: ImgProps): ReactNode {
		return <ImageForm {...data} />;
	},
};
