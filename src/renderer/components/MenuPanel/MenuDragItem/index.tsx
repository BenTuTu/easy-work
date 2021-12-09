import React from 'react';
import { useDrag } from 'react-dnd';

import { ItemTypes, DragElementItem } from 'renderer/typing';
import s from './index.module.scss';
function MenuDragItem({ data }: { data: DragElementItem }) {
	const { nodeName } = data || {};
	const [collected, drag, dragPreview]: any[] = useDrag(
		() => ({
			type: ItemTypes.BOX,
			item: data,
		}),
		[data]
	);

	return (
		<>
			{collected.isDragging ? (
				<section className={s.dragItem} ref={dragPreview} />
			) : (
				<section className={s.dragItem} ref={drag}>
					{nodeName}
				</section>
			)}
		</>
	);
}

export default MenuDragItem;
