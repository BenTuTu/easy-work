import React, { ReactNode, RefObject } from 'react';
import { Card, CardContent, ImageListItem, Typography } from '@mui/material';
import BubbleChartRoundedIcon from '@mui/icons-material/BubbleChartRounded';
import { ImageForm } from './form';
import DrawItemService from 'renderer/services/drawItem';

export interface Img2Props {
	src: string;
	type: string;
}

export const image2Config = {
	data: {
		type: 'image',
		src: 'https://picx.zhimg.com/v2-3be05963f5f3753a8cb75b6692154d4a_1440w.jpg',
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
	renderView(props: DrawItemService, ref: RefObject<any>): ReactNode {
		return (
			<div ref={ref} style={{ width: '100%' }}>
				<ImageListItem key={props.data.src}>
					<img
						src={props.data.src}
						srcSet={props.data.src}
						// alt={item.title}
						loading="lazy"
					/>
				</ImageListItem>
			</div>
		);
	},
	renderForm: function (data: Img2Props): ReactNode {
		return <ImageForm {...data} />;
	},
};
