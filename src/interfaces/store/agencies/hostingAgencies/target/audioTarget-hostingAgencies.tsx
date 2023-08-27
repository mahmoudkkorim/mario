import {
    SingleAudioVideoTarget,
    SpecificAudioVideoTarget,
} from "../../../../pages/agencies/hostingAgencies/target/AudioVideoTarget";

export interface InitialAudioTarget_hostingAgenciesState {
    // create audio target
    audioTargetCreateLoading: boolean;
    audioTargetCreateError: null | any;
    audioTargetCreateData: null | any; //-----
    // update audio target
    audioTargetUpdateLoading: boolean;
    audioTargetUpdateError: null | any;
    audioTargetUpdateData: null | any; //-----
    // all audio targets
    allAudioTargetLoading: boolean;
    allAudioTargetError: null | any;
    allAudioTargetData: null | SingleAudioVideoTarget[];
    // specific audio target
    specificAudioTargetLoading: boolean;
    specificAudioTargetError: null | any;
    specificAudioTargetData: null | SpecificAudioVideoTarget;
}

export interface CreateTargetAudioDate {
    token: string;
    formData: object;
}

export interface UpdateTargetAudioDate {
    token: string;
    target_id: string;
    formData: FormData;
}

export interface allTargetsAudioDate {
    token: string;
}

export interface specifcTargetAudioDate {
    token: string;
    target_id: string;
}
