import { LinkInterface } from "./DesignStore";

export interface SingleEmoji {
    id: 1;
    cover: string;
    body: string;
    created_at: string;
    updated_at: string;
}

export interface AllEmojis {
    current_page: number;
    data: SingleEmoji[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LinkInterface[];
    next_page_url: null | number;
    path: string;
    per_page: number;
    prev_page_url: null | number;
    to: number;
    total: number;
}
