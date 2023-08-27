import {
    AllVideoGifts,
    SingleVideoGift,
    SingleNormalVideoGift,
} from "../../pages/gifts/videoGifts";

export interface InitialVideoGiftsState {
    // all video gifts
    allVideoGiftsLoading: boolean;
    allVideoGiftsError: null | any;
    allVideoGiftsData: null | AllVideoGifts;
    // specific video gift
    specificVideoGiftLoading: boolean;
    specificVideoGiftError: null | any;
    specificVideoGiftData: null | SingleVideoGift;
    // normal video gifts
    normalVideoGifstLoading: boolean;
    normalVideoGifstError: null | any;
    normalVideoGifstData: null | SingleNormalVideoGift[];
    // create gift
    createVideoGiftLoading: boolean;
    createVideoGiftError: null | any;
    createVideoGiftData: null | any; //---------
    // edit gift
    editVideoGiftLoading: boolean;
    editVideoGiftError: null | any;
    editVideoGiftData: null | any; //---------
    // delete gift
    deleteVideoGiftLoading: boolean;
    deleteVideoGiftError: null | any;
    deleteVideoGiftData: null | any; //---------
}

export interface AllvideoGiftsData {
    token: string;
    page: string | number;
}

export interface specficVideoGiftsData {
    token: string;
    gift_id: string;
}

export interface NormalVideoGiftsData {
    token: string;
}

export interface createVideoGiftsData {
    token: string;
    giftData: object;
}

export interface editVideoGiftsData {
    token: string;
    gift_id: string;
    giftData: object;
}

export interface deleteVideoGiftsData {
    token: string;
    gift_id: string;
}
