import { allBanners, SingleBanner } from "../pages/banners";

export interface InitialBannersState {
    // All banners
    allBannersLoading: boolean;
    allBannersData: null | allBanners;
    allBannersError: null | any;
    // specific banners
    specificBannerLoading: boolean;
    specificBannerData: null | SingleBanner;
    specificBannerError: null | any;
    // create banners
    createBannerLoading: boolean;
    createBannerData: null | any; //----------
    createBannerError: null | any;
    // edit banners
    editBannerLoading: boolean;
    editBannerData: null | any; //----------
    editBannerError: null | any;
    // delete banners
    deleteBannerLoading: boolean;
    deleteBannerData: null | any; //----------
    deleteBannerError: null | any;
    // active banners
    activeBannersLoading: boolean;
    activeBannersData: null | any; //----------
    activeBannersError: null | any;
}

export interface AllBannersData {
    token: string;
    page: string | number;
}

export interface specificBannerData {
    token: string;
    banner_id: string;
}

export interface createBannerData {
    token: string;
    formData: object;
}

export interface editBannerData {
    token: string;
    formData: FormData;
    banner_id: string;
}

export interface deleteBannerData {
    token: string;
    banner_id: string;
}

export interface ActiveBannersData {
    token: string;
    page: string | number;
}
