import {
    SingleAudioVideoTarget,
    SpecificAudioVideoTarget,
} from "../../../../pages/agencies/hostingAgencies/target/AudioVideoTarget";

export interface InitialVideoTarget_hostingAgenciesState {
    // create video target
    videoTargetCreateLoading: boolean;
    videoTargetCreateError: null | any;
    videoTargetCreateData: null | any; //-----
    // update video target
    videoTargetUpdateLoading: boolean;
    videoTargetUpdateError: null | any;
    videoTargetUpdateData: null | any; //-----
    // all video targets
    allVideoTargetLoading: boolean;
    allVideoTargetError: null | any;
    allVideoTargetData: null | SingleAudioVideoTarget[];
    // specific video target
    specificVideoTargetLoading: boolean;
    specificVideoTargetError: null | any;
    specificVideoTargetData: null | SpecificAudioVideoTarget;
}

export interface CreateTargetVideoDate {
    token: string;
    formData: object;
}

export interface UpdateTargetVideoDate {
    token: string;
    target_id: string;
    formData: FormData;
}

export interface allTargetsVideoDate {
    token: string;
}

export interface specifcTargetVideoDate {
    token: string;
    target_id: string;
}
