import React, { CSSProperties } from "react";

export interface Children {
    children: React.ReactNode;
}

export type Error = any;

export interface MessageInterface {
    children: string;
}

export interface PagesHeadersInterface {
    children: string;
    small?: boolean;
}

export interface className {
    className: string;
}

export interface CreatedAtInterface {
    createdAt: string;
}

export interface ButtonInterface {
    className?: string;
    type?: string;
    children?: string | JSX.Element;
    to?: string;
    onClick?: () => void;
    deleteBtn?: boolean;
    editBtn?: boolean;
    createBtn?: boolean;
    style?: CSSProperties;
    imgBtn?: boolean;
}

export interface InputInterface {
    htmlFor?: string;
    label?: string;
    title?: string;
    type?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    minLength?: number;
    min?: number;
    max?: number;
    step?: number;
    readOnly?: boolean;
    error?: string;
    onBlur?: () => void;
    checked?: boolean;
    required?: boolean;
    textStart?: boolean;
    labelBgColor?: string;
    pattern?: string;
}

export interface SelectInputInterface {
    htmlFor: string;
    label: string;
    id: string;
    value: string;
    title: string;
    onChange: (e: React.ChangeEvent<any>) => void;
    error?: string;
    options: { type: string; text: string }[];
    required?: boolean;
}

export interface SearchInputInterface {
    htmlFor?: string;
    label?: string;
    title?: string;
    type?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    bearorIdFun: (id: number, uid: string) => void;
    minLength?: number;
    min?: number;
    max?: number;
    step?: number;
    readOnly?: boolean;
    error?: string;
    required?: boolean;
    labelBgColor?: string;
    pattern?: string;
}

export interface SearchInputVideoGenresInterface {
    htmlFor?: string;
    label?: string;
    title?: string;
    type?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    bearorIdFun: (id: number) => void;
    minLength?: number;
    min?: number;
    max?: number;
    step?: number;
    readOnly?: boolean;
    error?: string;
    required?: boolean;
    labelBgColor?: string;
    pattern?: string;
}

// models
export interface BackdropI {
    hideBackgroundColor?: boolean;
    onClose: () => void;
}

export interface ConfirmDeleteInterface {
    header: string;
    text: string;
    element: string;
    loading?: boolean;
    showDeleteModel: boolean;
    confirmDeleteHandler: (type: boolean) => void;
    deleteBtnContent: string;
}

export interface ConfirmCreateEdit {
    header: string;
    showCreateEditModel: boolean;
    createEditBtnContent: string;
    type: string;
    element?: string;
    children: React.ReactNode;
    confirmCreateEditHandler: (type: boolean) => void;
}

export interface PaginationInterface {
    total_pages: number;
    items_per_page: number;
}

export interface SpecificItem {
    title: string;
    subTitle?: string;
    children: React.ReactNode;
    editLink: string;
    editText: string;
    StoreItemInLocaStorage: () => void;
    deleteText: string;
    delteItem: () => void;
    imgSrc: string;
    imgAlt: string;
}

export interface ImageInputI {
    cover_image: string | any;
    localImage: File | null;
    name: string | any;
    cover_imageError: string;
    bg_camera?: string;
    accept?: string;
    id?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SvgaInputI {
    label: string;
    svga_imageError: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioInputI {
    types: { type: string; text: string }[];
    title: string;
    label: string;
    ckeckedOne: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    typeError: string;
}

export interface SpecifcRowDataForSpecifcItemI {
    text: string;
    data: string | number | React.ReactNode | null;
}

export interface FiterSortI {
    Array: {
        type: string;
        text: string;
    }[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    currentFilteredType: string;
}
