import { observer } from 'mobx-react';
import React, { forwardRef, useImperativeHandle } from 'react';
import { DropTarget, DropTargetMonitor } from 'react-dnd';

import { ItemTypes } from 'renderer/typing';
import { Store, useStore } from 'renderer/store';
import DrawItemService from 'renderer/services/drawItem';

import EasyApp from './EasyApp';

import s from './index.module.scss';

const DrawPanel = forwardRef<HTMLDivElement, any>(function DrawPanel(
	{ isOver, isOverCurrent, connectDropTarget, item },
	ref
) {
	const { addItem, panelItemMap } = useStore() as Store;

	useImperativeHandle(
		ref as any,
		() => ({
			onDrop: (onChild: boolean) => {
				if (item?.uuid || onChild) {
					return;
				}
				const pos = panelItemMap.childLength + 1;
				const itemObj = new DrawItemService({ ...item, pos });
				addItem(itemObj, '');
			},
		}),
		[addItem, item]
	);

	return connectDropTarget(
		<div className={s.drawPanel}>
			<EasyApp />
		</div>
	);
});

export default DropTarget(
	[ItemTypes.BOX, ItemTypes.MENU],
	{
		drop(props: any, monitor: DropTargetMonitor, component: any) {
			if (!component) {
				return;
			}
			const hasDroppedOnChild = monitor.didDrop();
			if (hasDroppedOnChild) {
				return;
			}

			component.onDrop(hasDroppedOnChild);
		},
	},
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		isOverCurrent: monitor.isOver({ shallow: true }),
		item: monitor.getItem(),
	})
)(observer(DrawPanel));
