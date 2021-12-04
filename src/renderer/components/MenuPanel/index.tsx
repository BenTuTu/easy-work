import React, { memo } from 'react';
import { 
  Paper,
  MenuList
} from '@mui/material';

import ElementMenu from './ElementMenu';
import ComponentsMenu from './ComponentsMenu';

import s from './index.module.scss';
function MenuPanel() {
  return (
    <section className={s.menuPanel}>
      <Paper>
        <MenuList>
          <ElementMenu />
          <ComponentsMenu />
        </MenuList>
      </Paper>
    </section>
  )
}

export default memo(MenuPanel);
