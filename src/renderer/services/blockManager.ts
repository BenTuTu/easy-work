import React, { RefObject } from 'react';
import * as blockConf from 'renderer/blocks';

export interface BlockMateria<T> {
	data: T;
	type: string;
	icon?: any;
	name?: string;
	renderBlock(data: T): React.ReactNode;
	renderView(data: T, ref: RefObject<any>): React.ReactNode;
	renderForm(data: T): React.ReactNode;
}

export class BlockManager {
	blocksMap: { [prop: string]: BlockMateria<any> } = {};
	dragBlocksList: Partial<BlockMateria<any>>[] = [];

	createBlock<T>(blockMateria: BlockMateria<T>) {
		const { type, renderBlock, data } = blockMateria;
		this.dragBlocksList.push({ type, renderBlock, data });
		// TODO: type 存在性检测
		this.blocksMap[type] = {
			...blockMateria,
		};
	}

	registryBlocks() {
		blockConf.blockConfigList.forEach(({ config, propsName }) => {
			this.createBlock(config as BlockMateria<any>);
		});
	}
}
