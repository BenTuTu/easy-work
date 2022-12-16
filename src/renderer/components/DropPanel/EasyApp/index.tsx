import React from 'react';
import { observer } from 'mobx-react';

import EasyView from 'renderer/services/generateView';
import { Store, useStore } from 'renderer/store';
import { DragElementItem, DragElementData } from 'renderer/typing';
import DrawItemService from 'renderer/services/drawItem';

import s from './index.module.scss';

function generateViewList(panelItemMap: DragElementData, targetItem: DragElementItem) {
	const list = [];
	const { childLength, pos, uuid } = targetItem || {};
	if (!childLength) {
		return null;
	}
	for (let idx = 1; idx <= childLength; idx++) {
		const curPos = pos ? `${pos}-${idx}` : idx;
		const blockData = panelItemMap[curPos] as DrawItemService;
		const { childLength: len, uuid: id } = blockData || {};
		if (len) {
			const eleList = generateViewList(panelItemMap, blockData);
			list.push(
				<EasyView key={id} nodeData={blockData}>
					{eleList}
				</EasyView>
			);
		} else {
			list.push(<EasyView key={id} nodeData={blockData} />);
		}
	}
	return [...list];
}

function EasyApp() {
	const { panelItemMap } = useStore() as Store;
	const childLength = panelItemMap.childLength as number;
	if (!childLength) {
		return null;
	}

	const viewList = generateViewList(panelItemMap, { pos: '', childLength } as any);
	return <div className={s.easyApp}>{viewList}</div>;
}

export default observer(EasyApp);
