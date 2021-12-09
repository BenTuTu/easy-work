import React, { memo, useState } from 'react';
import { useDrop } from 'react-dnd';

import { DragElementData, DragElementItem, ItemTypes } from 'renderer/typing';
import EasyApp from './EasyApp';
import s from './index.module.scss';

function DrawPanel() {
	const [panelEleObj, setPanelEleObj] = useState<DragElementData>({ length: 0 });

	const [collectedProps, drop] = useDrop(
		() => ({
			accept: ItemTypes.BOX,
			drop(item: DragElementItem, monitor) {
				const didDrop = monitor.didDrop();
				setPanelEleObj({ '1': item, length: 1 });
			},
			collect: monitor => ({
				isOver: monitor.isOver(),
				isOverCurrent: monitor.isOver({ shallow: true }),
			}),
		}),
		[]
	);
	// TODO: empty
	return (
		<div className={s.drawPanel} ref={drop}>
			<EasyApp panelData={panelEleObj} />
		</div>
	);
}

export default memo(DrawPanel);
