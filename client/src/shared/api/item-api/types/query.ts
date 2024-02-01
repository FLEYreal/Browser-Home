// [GET] "/item"
export type getItemQuery = {
    shelf_id?: number;
    item_id?: number;
} | undefined;

// [GET] "/item/icon"
export type getIconQuery = {
    item_id: number;
}

// [POST] "/item/icon"
export type updateIconQuery = {
    item_id: number;
}
