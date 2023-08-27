import { SpecialUids, SingleSpecialUid } from "../pages/specialUids";

// Special Uids
export interface InitialSpecialUidState {
    // All special uids
    allSpecialUidsLoading: boolean;
    allSpecialUidsError: null | any;
    allSpecialUidsData: null | SpecialUids;
    // specific special uid
    specificSpecialUidLoading: boolean;
    specificSpecialUidError: null | any;
    specificSpecialUidData: null | SingleSpecialUid;
    // create special uid
    createSpecialUidLoading: boolean;
    createSpecialUidError: null | any;
    createSpecialUidData: null | any; //-----------
    // update special uid
    editSpecialUidLoading: boolean;
    editSpecialUidError: null | any;
    editSpecialUidData: null | any; //-----------
    // delete special uid
    deleteSpecialUidLoading: boolean;
    deleteSpecialUidError: null | any;
    deleteSpecialUidData: null | any; //-----------
    // give special uid to user
    giveSpecialUidToUserLoading: boolean;
    giveSpecialUidToUserError: null | any;
    giveSpecialUidToUserData: null | any; //-----------
    // remove special uid from user
    removeSpecialUidFromUserLoading: boolean;
    removeSpecialUidFromUserError: null | any;
    removeSpecialUidFromUserData: null | any; //-----------
}

export interface AllSpecialUidsData {
    token: string;
    page: string | number;
}

export interface SpecificSpecialUidData {
    token: string;
    uid: string | number;
}

export interface CreateSpecialUidData {
    token: string;
    formData: object;
}

export interface EditSpecialUidData {
    token: string;
    formData: FormData;
    specialUid_id: string | number;
}

export interface DeleteSpecialUidData {
    token: string;
    uid: string | number;
}

export interface GiveSpecialUidToUserData {
    token: string;
    formData: FormData;
    specialUid_id: string | number;
}

export interface RemoveSpecialUidFromUserData {
    token: string;
    specialUid_id: string | number;
}
