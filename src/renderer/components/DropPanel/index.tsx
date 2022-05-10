import { observer } from 'mobx-react';
import React, { forwardRef, useImperativeHandle } from 'react';
import { DropTarget, DropTargetMonitor, useDrop } from 'react-dnd';

import { DragElementItem, ItemTypes } from 'renderer/typing';
import { Store, useStore } from 'renderer/store';
import DrawItemService from 'renderer/services/drawItem';

import EasyApp from './EasyApp';

import s from './index.module.scss';

// const DropPanel = forwardRef<HTMLDivElement, any>(function DropPanel(
// 	{ isOver, isOverCurrent, connectDropTarget, item },
// 	ref
// ) {
// 	const { addItem, panelItemMap } = useStore() as Store;

// 	useImperativeHandle(
// 		ref as any,
// 		() => ({
// 			onDrop: (onChild: boolean) => {
// 				console.log('🚀 ~ file: index.tsx ~ line 25 ~ item', item);
// 				if (item?.uuid || onChild) {
// 					return;
// 				}
// 				const pos = panelItemMap.childLength + 1;
// 				const itemObj = new DrawItemService({ ...item, pos });
// 				addItem(itemObj, '');
// 			},
// 		}),
// 		[addItem, item, panelItemMap.childLength]
// 	);

// 	return connectDropTarget(
// 		<div className={s.drawPanel}>
// 			<EasyApp />
// 		</div>
// 	);
// });

// export default DropTarget(
// 	[ItemTypes.BOX, ItemTypes.MENU],
// 	{
// 		drop(props: any, monitor: DropTargetMonitor, component: any) {
// 			// console.log('🚀 ~ file: index.tsx ~ line 47 ~ drop ~ props', component);

// 			if (!component) {
// 				return;
// 			}
// 			const hasDroppedOnChild = monitor.didDrop();
// 			if (hasDroppedOnChild) {
// 				return;
// 			}

// 			component.onDrop(hasDroppedOnChild);
// 		},
// 	},
// 	(connect, monitor) => ({
// 		connectDropTarget: connect.dropTarget(),
// 		isOver: monitor.isOver(),
// 		isOverCurrent: monitor.isOver({ shallow: true }),
// 		item: monitor.getItem(),
// 	})
// )(observer(DropPanel));

const DropPanel = () => {
	const { addItem, panelItemMap } = useStore() as Store;

	const [, drop] = useDrop(
		() => ({
			accept: ItemTypes.BOX,
			drop(item: DragElementItem) {
				// 移动的时候防止添加新元素操作
				if (item?.uuid) {
					return;
				}
				const pos = panelItemMap.childLength + 1;
				const itemObj = new DrawItemService({ ...item, pos: pos.toString() });
				addItem(itemObj, '');
			},
			collect: monitor => ({
				isOver: monitor.isOver(),
				isOverCurrent: monitor.isOver({ shallow: true }),
			}),
		}),
		[]
	);

	return (
		<div ref={drop} className={s.drawPanel}>
			<EasyApp />
		</div>
	);
};

export default observer(DropPanel);
