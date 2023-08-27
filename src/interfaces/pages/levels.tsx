import { LinkInterface } from "./DesignStore";

export interface SingleLevel {
    id: number;
    number: number;
    required_exp: number;
    created_at: string;
    updated_at: string;
    users_count: number;
}

export interface AllLevels {
    current_page: number;
    data: SingleLevel[];
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
