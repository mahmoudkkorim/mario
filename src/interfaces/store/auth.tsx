// AUTH
export interface LoginFormData {
    email: string;
    password: string;
}

export interface LoginI {
    id?: string;
    email?: string;
    created_at?: null | string;
    updated_at?: null | string;
    access_token?: string;
    token_expires_in?: number;
}
export interface Me {
    id: number;
    email: string;
    created_at: null | string;
    updated_at: null | string;
}

export interface InitialAuthState {
    // login
    loginLoading: boolean;
    loginData: null | LoginI;
    loginError: null | any;
    // logout
    logoutLoading: boolean;
    logoutError: null | any;
    // me
    meLoading: boolean;
    meData: null | Me;
    meError: null | any;
}
