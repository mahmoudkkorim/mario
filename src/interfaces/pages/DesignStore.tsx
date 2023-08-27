export interface LinkInterface {
    active: boolean;
    label: string;
    url: null | string;
}

export interface GetUserDesignStore {
    id: number;
    uid: string;
    name: string;
    email: null | string;
    profile_picture: string;
    provider_id: string;
    provider_name: string;
    phone: null | number;
    device_id: null | string;
    device_token: null | string;
    dob: null | string;
    age: null | number;
    gender: null | string;
    about_me: null | string;
    country_code: string;
    diamond_balance: number;
    gold_balance: number;
    default_frame_id: null | number;
    default_entry_id: null | number;
    deactivated_until: null;
    level_id: number;
    next_level_id: number;
    exp_points: number;
    role: number;
    language: string;
    is_video_hosting: number;
    is_video_cohosting: number;
    is_hosting_agency_owner: number;
    is_hosting_agent: number;
    is_charge_agent: number;
    is_group_owner: number;
    money: number;
    created_at: string | null;
    updated_at: string | null;
    decorations: [] | SingleDesignStore[];
}

export interface SingleDesignStore {
    cover: string;
    created_at: null | string;
    currency_type: string;
    id: number;
    is_free: number;
    name: string;
    price: number;
    svga: string | null;
    type: string;
    updated_at: null;
    users_count: number;
    valid_days: number;
}

export interface AllDesignsStore {
    current_page: number;
    data: SingleDesignStore[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LinkInterface[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
