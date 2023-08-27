import { LinkInterface } from "./DesignStore";

export interface SingleDiamond {
    id: number;
    quantity: number;
    price: number;
    cover: string;
    created_at: null | string;
    updated_at: null | string;
}

export interface AllDiamondPackages {
    current_page: number;
    data: SingleDiamond[];
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
