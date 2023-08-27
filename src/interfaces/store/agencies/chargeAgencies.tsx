import {
    AllChargeAgency,
    SingleChargeAgencey,
    AdminHistory,
    UpdateBalance,
    DeleteAgency,
    UserHistory,
    CreateAgency,
    CreateAgencyError,
} from "../../pages/agencies/ChargeAgencies";

export interface InitialChargeAgenciesState {
    // store new agency
    ChargeCreateAgencyLoading: boolean;
    ChargeCreateAgencyError: null | any | CreateAgencyError;
    ChargeCreateAgencyData: null | CreateAgency;
    // index copy => all
    ChargeIndexCopyLoading: boolean;
    ChargeIndexCopyError: null | any;
    ChargeIndexCopyData: null | AllChargeAgency;
    // show copy => specific
    ChargeShowCopyLoading: boolean;
    ChargeShowCopyError: null | any;
    ChargeShowCopyData: null | SingleChargeAgencey;
    // admin history => admin deposit and withdrawl
    ChargeAdminHistoryLoading: boolean;
    ChargeAdminHistoryError: null | any;
    ChargeAdminHistoryData: null | AdminHistory;
    // user history => user deposit and withdrawl
    ChargeUserHistoryLoading: boolean;
    ChargeUserHistoryError: null | any;
    ChargeUserHistoryData: null | UserHistory;
    // update balance
    ChargeUpdateBalanceLoading: boolean;
    ChargeUpdateBalanceData: null | UpdateBalance;
    ChargeUpdateBalanceError: null | any;
    // delete agency
    ChargeDeleteAgencyLoading: boolean;
    ChargeDeleteAgencyData: null | DeleteAgency;
    ChargeDeleteAgencyError: null | any;
}

export interface ChargeShowIndex {
    token: string;
    page: string | number;
}

export interface ChargeShowCopy {
    token: string;
    id: string | number;
}

export interface ChargeAdminHistory {
    token: string;
    id: string | number;
    page: string | number;
}

export interface ChargeUserHistory {
    token: string;
    id: string | number;
    page: string | number;
}

export interface ChargeUpdateBalance {
    token: string;
    id: string | number;
    amount: number;
    type: number;
}

export interface ChargeDeleteAgency {
    token: string;
    id: string | number;
}

export interface ChargeCreateAgency {
    token: string;
    user_id: number;
}
