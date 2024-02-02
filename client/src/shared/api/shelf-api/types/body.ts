// [POST] "/shelf"
export type createShelfBody = {
    title: string;
    description: string;
    color?: string;
}[]

// [POST] "/shelf/update"
export type updateShelfBody = {
    shelf_id: number;
    title?: string;
    description?: string;
    color?: string;
}[]

// [DELETE] "/shelf/update"
export type deleteShelfBody = {
    shelf_ids?: number[];
}
