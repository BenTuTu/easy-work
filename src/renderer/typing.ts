export enum ItemTypes {
    BOX = 'BOX',
    COM = 'COM'
}

export interface DragElementItem {
    type: ItemTypes;
    nodeName: string;
    isDelete: boolean;
    children: DragElementItem;
}
