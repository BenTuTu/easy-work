import React, { Component, forwardRef, memo, useImperativeHandle } from 'react';
import { useDrag, DropTarget, DropTargetMonitor } from 'react-dnd';
import { Store, useStore } from '../store';
import { ItemTypes } from '../typing';
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
const CanDrop = forwardRef<HTMLDivElement, any>(function CanDrop(
	{ isOver, isOverCurrent, connectDropTarget, item, dropItem, ele },
	ref
) {
	const { addItem, panelItemMap } = useStore() as Store;
	useImperativeHandle(
		ref as any,
		() => ({
			onDrop: (onChild: boolean) => {
				if (onChild) {
					return;
				}
				const pos = `${dropItem.pos}-${dropItem.childLength + 1}`;
				const itemObj = new DrawItemService({ ...item, pos });
				addItem(itemObj, dropItem.pos);
			},
		}),
		[item, dropItem]
	);
	return connectDropTarget(ele);
});

function GenerateView({ nodeData, children }: React.PropsWithChildren<{ nodeData: DrawItemService }>) {
	const { nodeName, isCanDrop, type, props, pos } = nodeData || {};
	const [collected, drag, dragPreview]: any[] = useDrag(
		() => ({
			type: ItemTypes.BOX,
			item: nodeData,
		}),
		[]
	);

	const nodeSchema = MENU_ITEM_SCHEMA[nodeName];
	if (!nodeSchema || !type) {
		return null;
	}

	const ele: React.ReactNode = nodeSchema.render(props || {}, drag, children);
	if (!isCanDrop) {
		return <>{ele}</>;
	}

	const Com = DropTarget(
		[ItemTypes.BOX, ItemTypes.MENU],
		{
			drop(props: any, monitor: DropTargetMonitor, component: Component | null) {
				if (!component) {
					return;
				}
				const hasDroppedOnChild = monitor.didDrop();
				if (hasDroppedOnChild) {
					return;
				}

				(component as any).onDrop(hasDroppedOnChild);
			},
		},
		(connect, monitor) => ({
			connectDropTarget: connect.dropTarget(),
			isOver: monitor.isOver(),
			isOverCurrent: monitor.isOver({ shallow: true }),
			item: monitor.getItem(),
			dropItem: nodeData,
			ele,
		})
	)(CanDrop);

	return (
		<>
			<Com />
		</>
	);
}

export default memo(GenerateView);
