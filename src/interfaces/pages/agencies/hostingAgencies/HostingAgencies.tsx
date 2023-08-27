import React from "react";
import { LinkInterface } from "../../DesignStore";
import { SingleUserWithoutFrindsFollowersFollowings } from "./target/AudioVideoTarget";

export interface Owner {
    id: number;
    uid: string;
    name: string;
    email: string;
    profile_picture: string;
    provider_id: null | string;
    provider_name: null | string;
    phone: string;
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
    role: number;
    language: string;
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

export interface SingleHostingAgency {
    id: number;
    name: string;
    description: string;
    cover: string;
    aid: number;
    owner_id: number;
    created_at: null | string;
    updated_at: null | string;
    members_count: number;
    owner: Owner;
}

export interface AllHostingAgencies {
    current_page: number;
    data: SingleHostingAgency[] | [];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LinkInterface[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: null | string;
    to: number;
    total: number;
}

export interface SingleMember {
    id: number;
    user: SingleUserWithoutFrindsFollowersFollowings;
    hosting_agency_id: number;
    user_id: number;
    current_target_id: number;
    current_target_video_id: number;
    created_at: string | null;
    updated_at: string | null;
}

export interface specficHostingAgency {
    id: number;
    name: string;
    description: string;
    cover: string;
    aid: number;
    owner_id: number;
    created_at: string | null;
    updated_at: string | null;
    members_count: number;
    owner: Owner;
    members: SingleMember[];
}

export interface specficHostingAgencyMembersTabel {
    members: SingleMember[];
}

export interface MultiMembers {
    members: SingleMember[];
}

export interface CreateEditHostingAgency {
    processType: string; //edit or create
}
