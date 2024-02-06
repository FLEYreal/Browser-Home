// [GET] "/item"
export type getItemQuery = {
    shelf_id?: number;
    item_id?: number;
} | undefined;

// [GET] "/item/icon"
export type getIconQuery = {
    item_id: number;
}