// [GET] "/item"
export type getItemQuery = {
    shelfId?: number;
    itemId?: number;
} | undefined;

// [GET] "/item/icon"
export type getIconQuery = {
    itemId: number;
}

// [POST] "/item/icon"
export type updateIconQuery = {
    itemId: number;
}
