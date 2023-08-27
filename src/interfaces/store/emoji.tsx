import { SingleEmoji, AllEmojis } from "../pages/emoji";

// Emojis
export interface InitialEmojisState {
    // All Emojis
    allEmojisLoading: boolean;
    allEmojisError: null | any;
    allEmojisData: null | AllEmojis;
    // specific Emoji
    specificEmojiLoading: boolean;
    specificEmojiError: null | any;
    specificEmojiData: null | SingleEmoji;
    // create Emoji
    createEmojiLoading: boolean;
    createEmojiError: null | any;
    createEmojiData: null | any; //-----------
    // edit Emoji
    editEmojiLoading: boolean;
    editEmojiError: null | any;
    editEmojiData: null | any; //-----------
    // delete Emoji
    deleteEmojiLoading: boolean;
    deleteEmojiError: null | any;
    deleteEmojiData: null | any; //-----------
}

export interface AllEmojisData {
    token: string;
    page: string | number;
}

export interface specificEmojiData {
    token: string;
    emoji_id: string;
}

export interface createEmojiData {
    token: string;
    formData: object;
}

export interface editEmojiData {
    token: string;
    formData: FormData;
    emoji_id: string;
}

export interface deleteEmojiData {
    token: string;
    emoji_id: string;
}
