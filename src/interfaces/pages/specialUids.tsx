import { LinkInterface } from "./DesignStore";
import { User } from "./users/Users";

export interface SingleSpecialUid {
    id: number;
    body: string;
    price: number;
    user_id: null | number | string;
    is_purchased: number;
    created_at: string;
    updated_at: string;
    user: null | User;
}

export interface SpecialUids {
    current_page: 1;
    data: SingleSpecialUid[];
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
