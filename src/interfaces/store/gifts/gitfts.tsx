import { AllGifts, SingleGift } from "../../pages/gifts/gifts";

export interface InitialGiftsState {
    // all gifts
    allGiftsLoading: boolean;
    allGiftsError: null | any;
    allGiftsData: null | AllGifts;
    // specific gift
    specficGiftLoading: boolean;
    specficGiftError: null | any;
    specficGiftData: null | SingleGift;
    // create gift
    createGiftLoading: boolean;
    createGiftError: null | any;
    createGiftData: null | any; //
    // edit gift
    editGiftLoading: boolean;
    editGiftError: null | any;
    editGiftData: null | any; //
    // delete gift
    deleteGiftLoading: boolean;
    deleteGiftError: null | any;
    deleteGiftData: null | any; //
}

export interface AllGiftsData {
    token: string;
    page: string | number;
}

export interface specficGiftsData {
    token: string;
    gift_id: string;
}

export interface createGiftsData {
    token: string;
    giftData: object;
}

export interface editGiftsData {
    token: string;
    gift_id: string;
    giftData: object;
}

export interface deleteGiftsData {
    token: string;
    gift_id: string;
}
