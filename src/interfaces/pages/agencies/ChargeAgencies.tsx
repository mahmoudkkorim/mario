import { LinkInterface } from "../DesignStore";

export interface Owner {
    id: number;
    uid: string;
    name: string;
    email: null | any;
    profile_picture: string;
    provider_id: null | string;
    provider_name: null | string;
    phone: null | any;
    device_id: string;
    device_token: null | any;
    dob: null | any;
    age: null | number;
    gender: null | string;
    about_me: null | any;
    country_code: string;
    diamond_balance: number;
    gold_balance: number;
    default_frame_id: null | any;
    default_entry_id: null | any;
    deactivated_until: null | any;
    level_id: number;
    next_level_id: number;
    exp_points: number;
    is_hosting_agency_owner: number;
    is_hosting_agent: number;
    is_charge_agent: number;
    is_group_owner: number;
    created_at: string | null;
    updated_at: string | null;
}

export interface SingleChargeAgencey {
    id: number;
    user_id: number;
    charge_agent_no: number;
    balance: number;
    created_at: string | null;
    updated_at: string | null;
    owner: Owner;
}

export interface AllChargeAgency {
    current_page: number;
    data: SingleChargeAgencey[];
    links: LinkInterface[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}

export interface SingleAdminHistoryData {
    id: number;
    charge_agent_id: number;
    amount: number;
    type: number;
    created_at: string;
    updated_at: string;
}

export interface SingleUserHistoryData {
    id: number;
    charge_agent_id: number;
    user_id: number;
    amount: number;
    created_at: string;
    updated_at: string;
}

export interface AdminHistory {
    agent: SingleChargeAgencey;
    history: {
        current_page: 1;
        data: SingleAdminHistoryData[];
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
    };
}

export interface UserHistory {
    agent: SingleChargeAgencey;
    history: {
        current_page: 1;
        data: SingleUserHistoryData[];
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
    };
}

export interface CreateAgency {
    status: boolean;
    errNum: string;
    msg: string;
}

export interface CreateAgencyError {
    user_id: string[];
}

export interface UpdateBalance {
    status: boolean;
    errNum: string;
    msg: string; // success or fail
}

export interface DeleteAgency {
    status: boolean;
    errNum: string;
    msg: string; // success or fail
}

export interface SpecificAgencyI {
    token: string;
    agency_id: string | number;
}

export interface UserHistoryTabel {
    token: string;
    id: string | number;
}
