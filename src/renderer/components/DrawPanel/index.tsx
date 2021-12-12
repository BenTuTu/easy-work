import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';

import { DragElementItem, ItemTypes } from 'renderer/typing';
import { Store, useStore } from 'renderer/store';
import DrawItemService from 'renderer/services/drawItem';

import EasyApp from './EasyApp';

import s from './index.module.scss';

function DrawPanel() {
	const { addItem } = useStore() as Store;

	const [collectedProps, drop] = useDrop(
		() => ({
			accept: [ItemTypes.BOX, ItemTypes.MENU],
			drop(item: DragElementItem, monitor) {
				if (item?.uuid) {
					return;
				}
				const itemObj = new DrawItemService(item as DragElementItem);
				addItem(itemObj);
			},
			collect: monitor => ({
				isOver: monitor.isOver(),
				item: monitor.getItem(),
				isOverCurrent: monitor.isOver({ shallow: true }),
				isDropped: monitor.didDrop(),
			}),
		}),
		[addItem]
	);

	// TODO: empty
	return (
		<div className={s.drawPanel} ref={drop}>
			<EasyApp />
		</div>
	);
}

export default observer(DrawPanel);
