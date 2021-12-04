import React, { memo } from 'react';
import Split from 'react-split';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import MenuPanel from 'components/MenuPanel';
import DrawPanel from 'components/DrawPanel';

import s from './index.module.scss';
function About(params: any) {
  return (
    <Split
      className={s.wrap}
      minSize={300}
      gutterSize={6}
    >
      <DndProvider backend={HTML5Backend}>
        <div className={s.left}>
          <MenuPanel />
        </div>
        <div className={s.panel}>
          <DrawPanel />
        </div>
      </DndProvider>
      <div className={s.right}></div>
    </Split>
  );
}

export default memo(About);
