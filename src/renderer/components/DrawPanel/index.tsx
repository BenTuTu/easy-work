import React, { memo } from 'react';
import { useDrop } from 'react-dnd';

import { ItemTypes } from 'renderer/typing';
import s from './index.module.scss';

function DrawPanel() {
    const [collectedProps, drop] = useDrop(
        () => ({
            accept: ItemTypes.BOX,
            drop(item: unknown, monitor) {
                console.log('🚀 ~ file: index.tsx ~ line 11 ~ drop ~ item', item);
                const didDrop = monitor.didDrop();
            },
            collect: monitor => ({
                isOver: monitor.isOver(),
                isOverCurrent: monitor.isOver({ shallow: true }),
            }),
        }),
        []
    );

    return (
        <div className={s.drawPanel} ref={drop}>
            DrawPanel
        </div>
    );
}

export default memo(DrawPanel);
