import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DragElementItem } from '../typing';

const MENU_ITEM_SCHEMA: { [ele: string]: { render(props: any): React.ReactNode } } = {
	div: {
		render(props: any) {
			// const { drop, ...otherProps } = props || {};
			// if (drop) {
			// 	return <div {...otherProps} ref={props.drop} />;
			// }
			return <div {...props} />;
		},
	},
};
function generateView(nodeData: DragElementItem) {
	const eleRef = useRef<HTMLElement>(null);
	const { nodeName, isCanDrop, type } = nodeData || {};
	const [collected, drag, dragPreview]: any[] = useDrag(
		() => ({
			type: type,
		}),
		[]
	);
	const [, drop] = useDrop(
		() => ({
			accept: type,
			drop(item: DragElementItem, monitor) {
				console.log('🚀 ~ file: generateView.tsx ~ line 19 ~ drop ~ item', item);
				const didDrop = monitor.didDrop();
			},
			collect: monitor => ({
				isOver: monitor.isOver(),
				isOverCurrent: monitor.isOver({ shallow: true }),
			}),
		}),
		[]
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
	const style: React.CSSProperties = {
		width: '100%',
		height: '.5rem',
		backgroundColor: 'CaptionText',
	};
	const ele: React.ReactNode = nodeSchema.render({ style });
	return <>{collected.isDragging ? <section ref={dragPreview} /> : <section ref={eleRef}>{ele}</section>}</>;
}

export default generateView;
