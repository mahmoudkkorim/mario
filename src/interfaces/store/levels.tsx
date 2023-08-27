import { AllLevels, SingleLevel } from "../pages/levels";

// Levels
export interface InitialLevelsState {
    // All Levels
    allLevelsLoading: boolean;
    allLevelsError: null | any;
    allLevelsData: null | AllLevels;
    // specific Level
    specificLevelLoading: boolean;
    specificLevelError: null | any;
    specificLevelData: null | SingleLevel;
    // change user level
    changeUserLevelLoading: boolean;
    changeUserLevelError: null | any;
    changeUserLevelData: null | any; //-----------
    // update level
    updateLevelLoading: boolean;
    updateLevelError: null | any;
    updateLevelData: null | any; //-----------
}

export interface AllLevelsData {
    token: string;
    page: string | number;
}

export interface specificLevelData {
    token: string;
    level_id: string;
}

export interface ChangeUserLevelData {
    token: string;
    formData: object;
}

export interface updateLevelData {
    token: string;
    formData: FormData;
    level_id: string;
}
