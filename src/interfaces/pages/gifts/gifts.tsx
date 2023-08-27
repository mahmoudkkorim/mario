import { LinkInterface } from "../DesignStore";

export interface SingleGift {
    id: number;
    name: string;
    cover: string;
    svga: string;
    price: number;
    type: string;
    created_at: string;
    updated_at: string;
}

export interface AllGifts {
    current_page: number;
    data: SingleGift[] | [];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: null | string;
    links: LinkInterface[];
    next_page_url: null | string;
    path: string;
    per_page: number;
    prev_page_url: null | string;
    to: number;
    total: number;
}
