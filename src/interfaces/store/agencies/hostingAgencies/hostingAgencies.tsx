import { CreateAgency } from "../../../pages/agencies/ChargeAgencies";
import {
    AllHostingAgencies,
    specficHostingAgency,
} from "../../../pages/agencies/hostingAgencies/HostingAgencies";

export interface InitialhostingAgenciesState {
    // create new agency
    hostingCreateAgencyLoading: boolean;
    hostingCreateAgencyError: null | any;
    hostingCreateAgencyData: null | CreateAgency;
    // all hosting agencies
    hostingAllAgenciesLoading: boolean;
    hostingAllAgenciesError: null | any;
    hostingAllAgenciesData: null | AllHostingAgencies;
    // specifc hosting agency
    hostingSpecificAgencyLoading: boolean;
    hostingSpecificAgencyError: null | any;
    hostingSpecificAgencyData: null | specficHostingAgency;
    // update agency
    hostingUpdateAgencyLoading: boolean;
    hostingUpdateAgencyData: null | any;
    hostingUpdateAgencyError: null | any; //------------
    // delete agency
    hostingDeleteAgencyLoading: boolean;
    hostingDeleteAgencyData: null | any;
    hostingDeleteAgencyError: null | any; //------------
}

export interface HostingCreateAgency {
    token: string;
    formData: object;
}

export interface HostingAllAgency {
    token: string;
    page: string | number;
}

export interface HostingSpecficAgency {
    token: string;
    id: string | number;
}

export interface HostingUpdateAgency {
    token: string;
    id: string | number;
    formData: Object;
}

export interface HostingDeleteAgency {
    token: string;
    id: string | number;
}
