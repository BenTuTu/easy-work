import React, { memo } from 'react';

import { DragElementData, DragElementItem } from 'renderer/typing';
import generateView from 'renderer/services/generateView';

import s from './index.module.scss';
function EasyApp({ panelData }: { panelData: DragElementData }) {
	if (!panelData.length) {
		return null;
	}

	const nodeConf = panelData[1] as DragElementItem;
	const drawItemView = generateView(nodeConf);
	return <div className={s.easyApp}>{drawItemView}</div>;
}

export default memo(EasyApp);
