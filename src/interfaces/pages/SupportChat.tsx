import { User } from "./users/Users";
import { LinkInterface } from "./DesignStore";

export interface LastMessage {
    id: number;
    support_conversation_id: number;
    body: string;
    is_sender: number;
    created_at: string;
    updated_at: string;
}

export interface SingleMessageSupportChat {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    user: User;
    last_message: LastMessage[];
}

export interface AllConversations {
    current_page: number;
    data: SingleMessageSupportChat[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LinkInterface[];
    next_page_url: null | string;
    path: string;
    per_page: number;
    prev_page_url: null | string;
    to: number;
    total: number;
}

export interface Attachment {
    id: number;
    support_message_id: number;
    path: string;
    extension: string;
    created_at: string;
    updated_at: string;
}

export interface SingleMessage {
    id: number;
    support_conversation_id: number;
    body: string;
    is_sender: number;
    created_at: string;
    updated_at: string;
    attachments: Attachment[] | null | [];
}

export interface SingleConversation {
    conversation: {
        id: number;
        user_id: number;
        created_at: string;
        updated_at: string;
    };
    messages: {
        current_page: number;
        data: SingleMessage[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: LinkInterface[];
        next_page_url: null | string;
        path: string;
        per_page: number;
        prev_page_url: null | string;
        to: number;
        total: number;
    };
}
