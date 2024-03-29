// [POST] "/item"
export type createItemBody = {
    shelf_fk: number;
    link: string;
    title: string;
    description?: string;
}[]

// [POST] "/item/update"
export type updateItemBody = {
    item_id: number;
    shelf_fk?: number;
    link?: string;
    title?: string;
    description?: string;
}[]

// [DELETE] "/item/update"
export type deleteItemBody = {
    shelf_fk?: number;
    item_ids?: number[];
}

// [POST] "/item/icon"
export type updateIconBody = {
    icon: File;
    item_id: number;
}
