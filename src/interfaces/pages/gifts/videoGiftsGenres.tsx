import { LinkInterface } from "../DesignStore";
import { SingleVideoGift } from "./videoGifts";

export interface SingleVideoGiftsGenre {
    id: number;
    name: string;
    precentage: number;
    created_at: string;
    updated_at: string;
    gifts_count: number;
}

export interface VideoGiftsGenres {
    current_page: number;
    data: SingleVideoGiftsGenre[];
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

export interface SpecificVideoGiftsGenre {
    id: number;
    name: string;
    precentage: number;
    created_at: string;
    updated_at: string;
    gifts_count: number;
    gifts: SingleVideoGift[];
}
