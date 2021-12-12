import React from 'react';
import { observer } from 'mobx-react';

import EasyView from 'renderer/services/generateView';
import { DrawPanelMap, Store, useStore } from 'renderer/store';

import s from './index.module.scss';
function generateViewList(panelItemMap: DrawPanelMap) {
	const viewList = Object.values(panelItemMap).map(item => {
		if (typeof item !== 'number') {
			if (item.children?.length) {
				return (
					<EasyView key={item.uuid} nodeData={item}>
						{generateViewList(item.children)}
					</EasyView>
				);
			}
			return <EasyView key={item.uuid} nodeData={item} />;
		}
		return null;
	});
	return viewList;
}

function EasyApp() {
	const { panelItemMap } = useStore() as Store;
	const len = panelItemMap.length;
	if (!len) {
		return null;
	}

	const viewList = generateViewList(panelItemMap);

	return <div className={s.easyApp}>{viewList}</div>;
}

export default observer(EasyApp);
