import { configureStore } from "@reduxjs/toolkit";

import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "react";

// NOTES
// designStore => make sure you get the created designStore when create it
// videoGifts => make sure when you enter to it check the interface of allVideoGiftsData
// users => make sure to get the response has the same user when edit and delete user
// diamond => make sure to edit the all diamonds in /diamond page

// Slices
import authSlice from "./slices/authSlice";
import roomsSlice from "./slices/roomsSlice";
import designStoreSlice from "./slices/designStoreSlice";
import chargeAgenciesSlice from "./slices/agencies/chargeAgenciesSlice";
import hostingAgenciesSlice from "./slices/agencies/hostingAgency/hostingAgenciesSlice";
import videoGiftsSlice from "./slices/gifts/videoGiftsSlice";
import giftsSlice from "./slices/gifts/giftsSlice";
import usersSlice from "./slices/users/usersSlice";
import audioTarget_hostingAgenciesSlice from "./slices/agencies/hostingAgency/target/audioTarget-hostingAgenciesSlice";
import videoTarget_hostingAgenciesSlice from "./slices/agencies/hostingAgency/target/videoTarget-hostingAgenciesSlice";
import diamondSlice from "./slices/diamondSlice";
import bannersSlice from "./slices/bannersSlice";
import emojisSlice from "./slices/emojisSlice";
import levelsSlice from "./slices/levelsSlice";
import specialUidsSlice from "./slices/specialUidsSlice";
import videoGiftsGenresSlice from "./slices/gifts/videoGiftsGenresSlice";
import SupportChatSlice from "./slices/SupportChatSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        rooms: roomsSlice,
        designStore: designStoreSlice,
        chargeAgencies: chargeAgenciesSlice,
        hostingAgencies: hostingAgenciesSlice,
        audioTarget_hostingAgencies: audioTarget_hostingAgenciesSlice,
        videoTarget_hostingAgencies: videoTarget_hostingAgenciesSlice,
        gifts: giftsSlice,
        videoGifts: videoGiftsSlice,
        videoGiftsGenres: videoGiftsGenresSlice,
        users: usersSlice,
        diamond: diamondSlice,
        banners: bannersSlice,
        emojis: emojisSlice,
        levels: levelsSlice,
        specialUids: specialUidsSlice,
        supportChat: SupportChatSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = Dispatch<AnyAction> &
    ThunkDispatch<RootState, null, AnyAction>;

export default store;
