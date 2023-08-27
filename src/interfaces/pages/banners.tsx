import { LinkInterface } from "./DesignStore";
export interface SingleBanner {
    id: number;
    cover: string;
    // All data comming from api is null i dont know the type of this specifc data so i put i by any
    related_to_id: null | any; //------
    related_to_type: null | any; //------
    valid_to: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface allBanners {
    current_page: number;
    data: SingleBanner[];
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

export interface FilteredBannersI {
    loading: boolean;
    filteredBanners: allBanners;
    error: any;
}
