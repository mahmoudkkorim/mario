import { LinkInterface } from "./DesignStore";

export interface SingleRoom {
    id: number;
    name: string;
    path: string;
    is_free: number;
    price: null | number;
    created_at: string;
    updated_at: string;
}

export interface AllRooms {
    current_page: number;
    data: SingleRoom[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LinkInterface[];
    next_page_url: null | string;
    path: string;
    per_page: number;
    prev_page_url: null | string;
    to: number;
    total: number;
}
