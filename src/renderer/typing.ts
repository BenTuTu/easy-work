import React from 'react';

export enum ItemTypes {
    BOX = 'BOX',
}

export interface DragElementItem {
    type: React.ElementType;
}
