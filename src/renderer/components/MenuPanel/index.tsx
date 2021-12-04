import React from 'react';
import { useDrag } from 'react-dnd';

import { ItemTypes } from '@/renderer/typing';

function MenuPanel() {
  const [collected, drag, dragPreview]: any[] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: {id: 1}
  }), []);

  return (
    <div>
      MenuPanel
      {collected.isDragging ? <section ref={dragPreview}></section>:<section ref={drag}>gooooood!!!</section>}
    </div>
  )
}

export default MenuPanel;
