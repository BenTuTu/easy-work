import React, { Component, forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react';
import { observer } from 'mobx-react';

import { useDrag, DropTarget, DropTargetMonitor, useDrop, XYCoord } from 'react-dnd';
import { Store, useStore } from '../store';
import { DragElementItem, ItemTypes } from '../typing';
import DrawItemService from './drawItem';

import s from './index.module.scss';

function GenerateView({ nodeData, children }: React.PropsWithChildren<{ nodeData: DrawItemService }>) {
	const { moveItem, blockManager } = useStore() as Store;

	const ref = useRef<HTMLDivElement>(null);
	const { nodeName, isCanDrop, type, props, pos, data } = nodeData || {};
	const [{ handlerId }, drop] = useDrop({
		accept: ItemTypes.BOX,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: DragElementItem, monitor) {
			if (!ref.current || !item.uuid) {
				return;
			}
			const dragIndex = Number(item.pos);
			const hoverIndex = Number(pos);

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}

			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();

			// Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// const hoverMiddleY = 10;

			// Determine mouse position
			const clientOffset = monitor.getClientOffset() as XYCoord;

			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%

			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			// Time to actually perform the action
			moveItem(dragIndex, hoverIndex);

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.pos = hoverIndex.toString();
		},
	});

	const [{ isDragging }, drag, dragPreview]: any[] = useDrag({
		type: ItemTypes.BOX,
		item: nodeData,
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	// const nodeSchema = MENU_ITEM_SCHEMA[nodeName];
	const nodeSchema = blockManager.blocksMap[data.type];

	if (!nodeSchema || !type) {
		return null;
	}
	drag(drop(ref));
	const opacity = isDragging ? 0 : 1;
	props.style = {
		...props.style,
		opacity,
	};
	const ele = nodeSchema.renderView(nodeData, ref) as React.ReactElement<any, any>;

	return ele;
	// if (!isCanDrop) {
	// 	return <>{ele}</>;
	// }

	// const Com = DropTarget(
	// 	[ItemTypes.BOX, ItemTypes.MENU],
	// 	{
	// 		drop(props: any, monitor: DropTargetMonitor, component: Component | null) {
	// 			if (!component) {
	// 				return;
	// 			}
	// 			const hasDroppedOnChild = monitor.didDrop();
	// 			if (hasDroppedOnChild) {
	// 				return;
	// 			}

	// 			(component as any).onDrop(hasDroppedOnChild);
	// 		},
	// 	},
	// 	(connect, monitor) => ({
	// 		connectDropTarget: connect.dropTarget(),
	// 		isOver: monitor.isOver(),
	// 		isOverCurrent: monitor.isOver({ shallow: true }),
	// 		item: monitor.getItem(),
	// 		dropItem: nodeData,
	// 		ele,
	// 	})
	// )(CanDrop);

	// return (
	// 	<>
	// 		<Com />
	// 	</>
	// );
}

export default observer(GenerateView);
