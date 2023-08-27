import { AllDiamondPackages, SingleDiamond } from "../pages/diamond";

export interface InitialDiamondState {
    // All diamond packages
    allDiamondPackagesLoading: boolean;
    allDiamondPackagesData: null | AllDiamondPackages;
    allDiamondPackagesError: null | any;
    // specific diamond package
    specificDiamondPackageLoading: boolean;
    specificDiamondPackageData: null | SingleDiamond;
    specificDiamondPackageError: null | any;
    // create diamond package
    createDiamondPackageLoading: boolean;
    createDiamondPackageData: null | any; //----------
    createDiamondPackageError: null | any;
    // edit diamond package
    editDiamondPackageLoading: boolean;
    editDiamondPackageData: null | any; //----------
    editDiamondPackageError: null | any;
    // delete diamond package
    deleteDiamondPackageLoading: boolean;
    deleteDiamondPackageData: null | any; //----------
    deleteDiamondPackageError: null | any;
    // charge user balance
    chargeUserBalanceLoading: boolean;
    chargeUserBalanceData: null | any; //----------
    chargeUserBalanceError: null | any;
    // roll back from user
    rollBackFromUserLoading: boolean;
    rollBackFromUserData: null | any; //----------
    rollBackFromUserError: null | any;
}

export interface AllDiamondPackageData {
    token: string;
    page: string | number;
}

export interface specificDiamondPackageData {
    token: string;
    diamond_id: string;
}

export interface createDiamondPackageData {
    token: string;
    formData: object;
}

export interface editDiamondPackageData {
    token: string;
    formData: FormData;
    diamond_id: string;
}

export interface deleteDiamondPackageData {
    token: string;
    diamond_id: string;
}

export interface chargeUserBalanceData {
    token: string;
    formData: object;
}

export interface rollBackFromUserData {
    token: string;
    formData: object;
}
