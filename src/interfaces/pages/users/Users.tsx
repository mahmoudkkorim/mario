import { LinkInterface } from "../DesignStore";

export interface Country {
    id: number;
    countrycode: string;
    countryname: string;
    code: string;
    created_at: null | string;
    updated_at: null | string;
}

export interface User {
    id: number;
    uid: string;
    name: string;
    email: null | string;
    profile_picture: string;
    provider_id: null | number | string;
    provider_name: null | number | string;
    phone: string;
    device_id: string;
    device_token: null | string;
    dob: string;
    age: number;
    gender: string | null;
    about_me: string | null;
    country_code: string;
    diamond_balance: number;
    gold_balance: number;
    default_frame_id: null | any;
    default_entry_id: null | any;
    deactivated_until: null | any;
    level_id: number;
    next_level_id: number;
    exp_points: number;
    role: number;
    language: string | null;
    is_video_hosting: number;
    is_video_cohosting: number;
    is_hosting_agency_owner: number;
    is_hosting_agent: number;
    is_charge_agent: number;
    is_group_owner: number;
    money: number;
    created_at: string;
    updated_at: string;
}

export interface Following_user {
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
}

export interface Followings {
    id: number;
    following_id: number;
    follower_id: number;
    created_at: string | null;
    updated_at: string | null;
    following_user: Following_user;
}

export interface Followers {
    id: number;
    following_id: number;
    follower_id: number;
    created_at: string | null;
    updated_at: string | null;
    follower_user: Following_user;
}

export interface Friends {
    id: number;
    user_id: number;
    friend_id: number;
    created_at: string | null;
    updated_at: string | null;
    friend_user: Following_user;
}

export interface SingleUser {
    id: number;
    uid: string;
    name: string;
    email: null | string;
    profile_picture: string;
    provider_id: string;
    provider_name: string | null;
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
    country: Country;
    followings: Followings[] | [];
    followers: Followers[] | [];
    friends: Friends[] | [];
}

export interface AllUsers {
    current_page: number;
    data: SingleUser[] | [];
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

export interface UsersIdsByUId {
    id: number;
    name: string;
    uid: string;
    profile_picture: string;
}
