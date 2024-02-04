// [POST] "/shelf"
export type createShelvesBody = {
    title: string;
    description: string;
    color?: string;
}[]

// [POST] "/shelf/update"
export type updateShelvesBody = {
    shelf_id: number;
    title?: string;
    description?: string;
    color?: string;
}[]

// [DELETE] "/shelf/update"
export type deleteShelvesBody = {
    shelf_ids?: number[];
}
