// [POST] "/item"
export type createItemBody = {
    shelfFk: number;
    link: string;
    title: string;
    description?: string;
}

// [POST] "/item/update"
export type updateItemBody = {
    itemId: number;
    shelfFk?: number;
    link?: number;
    title?: string;
    description?: string;
}

// [DELETE] "/item/update"
export type deleteItemBody = {
    shelfFk?: number;
    itemIds?: number[];
}
