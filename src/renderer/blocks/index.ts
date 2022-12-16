import { imageConfig, ImgProps } from './image';
// export type { ImgProps } from './image';

import { image2Config, Img2Props } from './image2';
// export type { Img2Props } from './image2';

export const blockConfigList = [
	{
		config: imageConfig,
		propsName: 'ImgProps',
	},
	{
		config: image2Config,
		propsName: 'Img2Props',
	},
];
