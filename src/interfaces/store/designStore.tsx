import {
    AllDesignsStore,
    SingleDesignStore,
    GetUserDesignStore,
} from "../pages/DesignStore";

// DESIGN STORE
export interface SpecificDesignsStoreData {
    token: string;
    id: number | string;
}

export interface AllDesignsStoreData {
    token: string;
    page: string | number;
}

export interface SortedFiterdDesignStoreData {
    token: string;
    type: string;
    page: string | number;
}

export interface CreateStoreDesign {
    formData: object;
    token: string;
}

export interface EditStoreDesign {
    formData: object;
    token: string;
    id: string | number;
}

export interface DeleteStoreDesign {
    token: string;
    id: string | number;
}

export interface GetUserDesignStoreData {
    token: string;
    user_id: string;
}

export interface GiveDesignStoreToUserData {
    token: string;
    formData: object;
    designStore_id: string | number;
}

export interface RemoveDesignStoreFromUserData {
    token: string;
    formData: object;
    designStore_id: string | number;
}

export interface InitialDesignStoreState {
    // all designs store
    allDesignsStoreLoading: boolean;
    allDesignsStoreError: null | any;
    allDesignsStoreData: null | AllDesignsStore;
    // sort all designs store
    sortedFilteredDesignsStoreLoading: boolean;
    sortedFilteredDesignsStoreError: null | any;
    sortedFilteredDesignsStoreData: null | AllDesignsStore;
    // specific design store
    specificDesignStoreLoading: boolean;
    specificDesignStoreError: null | any;
    specificDesignStoreData: null | SingleDesignStore;
    // create design store
    createDesignStoreLoading: boolean;
    createDesignStoreError: null | any;
    createDesignStoreData: null | any; //---------
    // edit design store
    editDesignStoreLoading: boolean;
    editDesignStoreError: null | any;
    editDesignStoreData: null | any; //---------
    // delete design store
    deleteDesignStoreLoading: boolean;
    deleteDesignStoreError: null | any;
    deleteDesignStoreData: null | any; //---------
    // get user design store
    getUserDesignStoreLoading: boolean;
    getUserDesignStoreError: null | any;
    getUserDesignStoreData: null | GetUserDesignStore;
    // give design store to user
    giveDesignStoreToUserLoading: boolean;
    giveDesignStoreToUserError: null | any;
    giveDesignStoreToUserData: null | any; //---------
    // remove design store from user
    removeDesignStoreFromUserLoading: boolean;
    removeDesignStoreFromUserError: null | any;
    removeDesignStoreFromUserData: null | any; //---------
}
