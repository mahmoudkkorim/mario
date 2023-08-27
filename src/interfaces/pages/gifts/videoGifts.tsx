import { LinkInterface } from "../DesignStore";

export interface SingleVideoGift {
    id: number;
    name: string;
    price: number;
    cover: string;
    svga: string;
    video_gift_genere_id: number;
    type: number;
    related_gift_ids: null | string[];
    sending_counter: number;
    required_sending_counter: null | number;
    surprise_gift_id: null | number;
    created_at: string;
    updated_at: string;
}

export interface AllVideoGifts {
    current_page: number;
    data: SingleVideoGift[] | [];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LinkInterface[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: null | string;
    to: number;
    total: number;
}

export interface SingleNormalVideoGift {
    id: number;
    name: string;
    price: number;
    cover: string;
    svga: string;
    video_gift_genere_id: number;
    type: number;
    related_gift_ids: number | null;
    sending_counter: number;
    required_sending_counter: number | null;
    surprise_gift_id: number | null;
    created_at: string;
    updated_at: string;
}
