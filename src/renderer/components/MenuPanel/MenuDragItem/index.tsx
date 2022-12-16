import { BlockMateria } from 'renderer/services/blockManager';
import React from 'react';
import { useDrag } from 'react-dnd';

import { ItemTypes, DragElementItem } from 'renderer/typing';

import s from './index.module.scss';

function MenuDragItem({ data, children }: React.PropsWithChildren<{ data: Partial<BlockMateria<any>> }>) {
	// const { nodeName } = data || {};
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
					{children}
				</section>
			)}
		</>
	);
}

export default MenuDragItem;
