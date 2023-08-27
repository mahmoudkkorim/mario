import { AllUsers, SingleUser, UsersIdsByUId } from "../../pages/users/Users";

export interface InitialUsersState {
    // all users
    allUsersLoading: boolean;
    allUsersData: null | AllUsers;
    allUsersError: null | any;
    // specific user
    specificUserLoading: boolean;
    specificUserData: null | SingleUser;
    specificUserError: null | any;
    // edit user
    editUserLoading: boolean;
    editUserData: null | any; //--------
    editUserError: null | any;
    // delete user
    deleteUserLoading: boolean;
    deleteUserData: null | any; //--------
    deleteUserError: null | any;
    // block user
    blockUserLoading: boolean;
    blockUserData: null | any; //--------
    blockUserError: null | any;
    // unblock user
    unblockUserLoading: boolean;
    unblockUserData: null | any; //--------
    unblockUserError: null | any;
    // user id by uid
    useridByIdLoading: boolean;
    useridByIdData: null | UsersIdsByUId[];
    useridByIdError: null | any;
}

export interface AllUsersData {
    token: string;
    page: number | string;
}

export interface SpecificUserData {
    token: string;
    userId: number | string;
}

export interface editUserDataI {
    token: string;
    userId: string;
    formData: object;
}

export interface deleteUserDataI {
    token: string;
    userId: string;
}

export interface blockUserDataI {
    token: string;
    userId: string;
    formData: object;
}

export interface unblockUserDataI {
    token: string;
    userId: string;
}

export interface UserIdByUidData {
    token: string;
    uid: number | string;
}
