import React, { memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DragElementItem } from '../typing';
import DrawItemService from './drawItem';
interface RenderProps {
	[ele: string]: { render(props: any, ref: any, children: React.ReactNode): React.ReactNode };
}
const MENU_ITEM_SCHEMA: RenderProps = {
	div: {
		render(props: any, ref, children) {
			return (
				<div {...props} ref={ref}>
					{children}
				</div>
			);
		},
	},
	span: {
		render(props: any, ref, children) {
			return (
				<span {...props} ref={ref}>
					{children}
				</span>
			);
		},
	},
};
function GenerateView({ nodeData, children }: React.PropsWithChildren<{ nodeData: DrawItemService }>) {
	const eleRef = useRef<HTMLElement>(null);
	const { nodeName, isCanDrop, type, props } = nodeData || {};
	const [collected, drag, dragPreview]: any[] = useDrag(
		() => ({
			type: type,
			item: nodeData,
		}),
		[type]
	);
	const [, drop] = useDrop(
		() => ({
			accept: type,
			drop(item: DragElementItem, monitor) {
				console.log('🚀 ~ file: generateView.tsx ~ line 19 ~ drop ~ item', item);
			},
			collect: monitor => ({
				isOver: monitor.isOver(),
				isOverCurrent: monitor.isOver({ shallow: true }),
			}),
		}),
		[type]
	);
	if (isCanDrop) {
		drag(drop(eleRef));
	} else {
		drag(eleRef);
	}
	const nodeSchema = MENU_ITEM_SCHEMA[nodeName];
	if (!nodeSchema) {
		return null;
	}

	const ele: React.ReactNode = nodeSchema.render(props || {}, eleRef, children);
	return <>{ele}</>;
}

export default memo(GenerateView);
