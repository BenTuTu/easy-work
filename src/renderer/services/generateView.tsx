import React, { Component, forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react';
import { observer } from 'mobx-react';

import { useDrag, DropTarget, DropTargetMonitor, useDrop, XYCoord } from 'react-dnd';
import { Store, useStore } from '../store';
import { DragElementItem, ItemTypes } from '../typing';
import DrawItemService from './drawItem';

import s from './index.module.scss';
interface RenderProps {
	[ele: string]: { render(props: any, ref: any, children: React.ReactNode): React.ReactNode };
}
const MENU_ITEM_SCHEMA: RenderProps = {
	div: {
		render(props: any, ref, children) {
			const { handlerId, ...others } = props;

			return (
				<div className={s.baseComponent} {...others} ref={ref} data-handler-id={handlerId}>
					{children}
				</div>
			);
		},
	},
	span: {
		render(props: any, ref, children) {
			const { handlerId, ...others } = props;

			return (
				<span {...others} ref={ref} data-handler-id={handlerId}>
					{children}
				</span>
			);
		},
	},
};
// const CanDrop = forwardRef<HTMLDivElement, any>(function CanDrop(
// 	{ isOver, isOverCurrent, connectDropTarget, item, dropItem, ele },
// 	ref
// ) {
// 	const { addItem, panelItemMap } = useStore() as Store;
// 	useImperativeHandle(
// 		ref as any,
// 		() => ({
// 			onDrop: (onChild: boolean) => {
// 				if (onChild) {
// 					return;
// 				}
// 				const pos = `${dropItem.pos}-${dropItem.childLength + 1}`;
// 				const itemObj = new DrawItemService({ ...item, pos });
// 				addItem(itemObj, dropItem.pos);
// 			},
// 		}),
// 		[item, dropItem]
// 	);
// 	return connectDropTarget(ele);
// });

function GenerateView({ nodeData, children }: React.PropsWithChildren<{ nodeData: DrawItemService }>) {
	const { moveItem } = useStore() as Store;

	const ref = useRef<HTMLDivElement>(null);
	const { nodeName, isCanDrop, type, props, pos } = nodeData || {};
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
	const nodeSchema = MENU_ITEM_SCHEMA[nodeName];
	if (!nodeSchema || !type) {
		return null;
	}
	drag(drop(ref));
	const opacity = isDragging ? 0 : 1;
	const style = {
		...props.style,
		opacity,
	};
	const ele = nodeSchema.render({ ...props, handlerId, style } || {}, ref, children) as React.ReactElement<any, any>;

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
