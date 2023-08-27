import { AllConversations, SingleConversation } from "../pages/SupportChat";

// Support Chat
export interface InitialSupportChatState {
    // all Conversations
    allConversationsLoading: boolean;
    allConversationsError: null | any;
    allConversationsData: null | AllConversations;
    // user Conversation
    userConversationLoading: boolean;
    userConversationError: null | any;
    userConversationData: null | SingleConversation;
    // delete Conversation
    deleteConversationLoading: boolean;
    deleteConversationError: null | any;
    deleteConversationData: null | any; //-------
    // send Conversation
    sendMessageLoading: boolean;
    sendMessageError: null | any;
    sendMessageData: null | any; //-------
    // delete Conversation
    deleteMessageLoading: boolean;
    deleteMessageError: null | any;
    deleteMessageData: null | any; //-------
}

export interface AllConversationsData {
    token: string;
    page: string | number;
}

export interface UserConversationData {
    token: string;
    user_id: string | number;
    page: string | number;
}

export interface DeleteConversationData {
    token: string;
    conversation_id: string | number;
}

export interface SendMessageData {
    token: string;
    user_id: string | number;
    formData: FormData;
}

export interface DeleteMessageData {
    token: string;
    message_id: string | number;
}
