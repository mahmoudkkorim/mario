import { AllRooms, SingleRoom } from "../pages/Rooms";

// Rooms
export interface InitialRoomsState {
    // All Rooms
    allRoomsLoading: boolean;
    allRoomsError: null | any;
    allRoomsData: null | AllRooms;
    // specific Room
    specificRoomLoading: boolean;
    specificRoomError: null | any;
    specificRoomData: null | SingleRoom;
    // create Room
    createRoomLoading: boolean;
    createRoomError: null | any;
    createRoomData: null | any; //-----------
    // edit Room
    editRoomLoading: boolean;
    editRoomError: null | any;
    editRoomData: null | any; //-----------
    // delete Room
    deleteRoomLoading: boolean;
    deleteRoomError: null | any;
    deleteRoomData: null | any; //-----------
}

export interface AllRoomsData {
    token: string;
    page: string | number;
}

export interface specificRoomData {
    token: string;
    room_id: string;
}

export interface createRoomData {
    token: string;
    formData: object;
}

export interface editRoomData {
    token: string;
    formData: FormData;
    room_id: string;
}

export interface deleteRoomData {
    token: string;
    room_id: string;
}
