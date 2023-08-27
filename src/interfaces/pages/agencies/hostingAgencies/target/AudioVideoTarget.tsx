export interface SingleAudioVideoTarget {
    id: number;
    target_no: number;
    diamonds_required: number;
    hours_required: number;
    salary: number;
    owner_salary: number;
    created_at: string;
    updated_at: string;
    agencies_members_count: number;
}

export interface SingleAudioVideoTargetAgency {
    id: number;
    name: string;
    description: string;
    cover: string;
    aid: number;
    owner_id: number;
    created_at: null | string;
    updated_at: null | string;
}

export interface SingleUserWithoutFrindsFollowersFollowings {
    id: number;
    uid: string;
    name: string;
    email: string;
    profile_picture: string;
    provider_id: string;
    provider_name: string;
    phone: string | null;
    device_id: string;
    device_token: null | string;
    dob: string;
    age: number;
    gender: null | string;
    about_me: string;
    country_code: string;
    diamond_balance: number;
    gold_balance: number;
    default_frame_id: number | null;
    default_entry_id: number | null;
    deactivated_until: number | null;
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

export interface SpecificAudioVideoTargetAgencyMembers {
    agency: SingleAudioVideoTargetAgency;
    user: SingleUserWithoutFrindsFollowersFollowings;
    created_at: string;
    current_target_id: number;
    current_target_video_id: number;
    hosting_agency_id: number;
    id: number;
    updated_at: string;
    user_id: number;
}

export interface SpecificAudioVideoTarget {
    agencies_members: [] | SpecificAudioVideoTargetAgencyMembers[];
    id: number;
    target_no: number;
    diamonds_required: number;
    hours_required: number;
    salary: number;
    owner_salary: number;
    created_at: string;
    updated_at: string;
    agencies_members_count: number;
}

export interface SpecficTargetTabelI {
    agencies_members: [] | SpecificAudioVideoTargetAgencyMembers[];
}

export interface SpecficTargetI {
    loading: boolean;
    error: null | any;
    specifcTarget: null | SpecificAudioVideoTarget;
}

export interface targetI {
    loading: boolean;
    error: null | any;
    allTargetData: null | SingleAudioVideoTarget[];
}

export interface CreateEditTarget {
    processType: string; //edit or create
}

export interface ShowHideModel {
    toggleCreateEditModelHandler: () => void;
    showCreateEditModel: boolean;
}
