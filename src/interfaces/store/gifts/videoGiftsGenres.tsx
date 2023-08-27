import {
    VideoGiftsGenres,
    SpecificVideoGiftsGenre,
} from "../../pages/gifts/videoGiftsGenres";

export interface InitialVideoGiftsGenresState {
    // all video gifts genres
    allVideoGiftsGenresLoading: boolean;
    allVideoGiftsGenresError: null | any;
    allVideoGiftsGenresData: null | VideoGiftsGenres;
    // specific video gifts genre
    specficVideoGiftsGenreLoading: boolean;
    specficVideoGiftsGenreError: null | any;
    specficVideoGiftsGenreData: null | SpecificVideoGiftsGenre;
    // create video gifts genre
    createVideoGiftsGenreLoading: boolean;
    createVideoGiftsGenreError: null | any;
    createVideoGiftsGenreData: null | any; //------
    // edit video gifts genre
    editVideoGiftsGenreLoading: boolean;
    editVideoGiftsGenreError: null | any;
    editVideoGiftsGenreData: null | any; //------
    // delete video gifts genre
    deleteVideoGiftsGenreLoading: boolean;
    deleteVideoGiftsGenreError: null | any;
    deleteVideoGiftsGenreData: null | any; //------
}

export interface AllVideoGiftsGenresData {
    token: string;
    page: string | number;
}

export interface specficVideoGiftsGenreData {
    token: string;
    gift_id: string;
}

export interface createVideoGiftsGenreData {
    token: string;
    giftData: object;
}

export interface editVideoGiftsGenreData {
    token: string;
    gift_id: string;
    giftData: FormData;
}

export interface deleteVideoGiftsGenreData {
    token: string;
    gift_id: string;
}
