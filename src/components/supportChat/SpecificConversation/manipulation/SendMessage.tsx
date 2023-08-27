import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
    sendMessage,
    resetSendMessageData,
    resetSendMessageError,
    userConversation,
} from "../../../../store/slices/SupportChatSlice";

// icons
import { RiAttachment2 } from "react-icons/ri";
import { ImCross } from "react-icons/im";

const SendMessage = () => {
    const [body, setBody] = useState("");
    const [attachments, setAttachments] = useState([]);
    const ref = useRef<HTMLTextAreaElement>(null);

    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const page = query.get("page");

    const auth = useSelector((state: RootState) => state.auth);
    const supportChat = useSelector((state: RootState) => state.supportChat);

    // reset  states
    useEffect(() => {
        if (!supportChat.sendMessageLoading && supportChat.sendMessageData) {
            if (!supportChat.userConversationError) {
                setBody("");
                setAttachments([]);
                dispatch(resetSendMessageError());
            }
            dispatch(resetSendMessageData());
            dispatch(
                userConversation({
                    page: page || 1,
                    token: auth.loginData?.access_token!,
                    user_id: params.id!,
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supportChat.sendMessageLoading, supportChat.sendMessageData]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = e.target as HTMLInputElement;
        if (supportChat.sendMessageError) {
            dispatch(resetSendMessageError());
        }

        if (e.target.id === "body" && e.target.type !== "file") {
            setBody(e.target.value);
        } else if (target && (target.files as FileList)) {
            const file: File = (target.files as FileList)[0];
            // @ts-ignore
            setAttachments((prevState) => prevState.concat(file));
        }
    };

    // delete image before upload it
    const deleteImageHandler = (image: object) => {
        const newAttachments = attachments.filter(
            // @ts-ignore
            (attachment) => attachment.name !== image.name
        );
        setAttachments(newAttachments);
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // make sure not send the message twice
        if (supportChat.sendMessageLoading) {
            return;
        }

        const SubmitedFormDate = new FormData();
        SubmitedFormDate.append("body", body);

        if (attachments.length > 0) {
            attachments.forEach((attachment, i) => {
                SubmitedFormDate.append(`attachments[${i}]`, attachment);
            });
        }

        dispatch(
            sendMessage({
                token: auth.loginData?.access_token!,
                formData: SubmitedFormDate,
                user_id: params.id!,
            })
        );
    };

    return (
        <>
            {attachments.length > 0 && (
                <div className='flex justify-center gap-1 sm:gap-2 items-center flex-wrap m-2 p-2 border-[1px] border-success/50 rounded-md'>
                    {attachments.map((image, i) => (
                        <div key={i} className='relative'>
                            <span
                                className='cursor-pointer'
                                onClick={deleteImageHandler.bind(null, image)}
                            >
                                <ImCross className='text-darkRed h-4 w-4 absolute top-0 right-0 -translate-x-[40%] translate-y-[40%]' />
                            </span>
                            <img
                                className='w-12 h-12 sm:w-16 sm:h-16 rounded-sm object-cover'
                                src={window.URL.createObjectURL(image)}
                                alt={`${i}_image`}
                            />
                        </div>
                    ))}
                </div>
            )}
            <form
                onSubmit={submitHandler}
                className='flex justify-center items-center w-full px-2 py-3 border-t-[1px] border-lightBlue/50'
            >
                <div className='flex items-center flex-1 px-2 self-center'>
                    <textarea
                        id='body'
                        className={` ${
                            body.length > 0
                                ? "min-h-fit overflow-y-scroll"
                                : "h-7"
                        } hideScrollBar w-full outline-none px-1 rounded-md text-smothDark bg-lightDark/0 placeholder:text-gray-700/70 border-[1px] border-lightBlue/40`}
                        spellCheck={false}
                        ref={ref}
                        autoFocus
                        value={body}
                        onChange={onChange}
                        placeholder='كتابه رساله... (body)'
                    ></textarea>
                </div>
                <div className='w-fit'>
                    <label htmlFor='attachments' title='ادخل الصور '>
                        <RiAttachment2 className='text-lightBlue w-5 h-5 cursor-pointer' />
                    </label>
                    <input
                        type='file'
                        className='hidden'
                        name='attachments'
                        id='attachments'
                        accept='.jpg,.png,.jpeg,.webp'
                        onChange={onChange}
                        multiple
                    />
                </div>
                <div className='w-fit pr-2'>
                    <button
                        className={`${
                            (body.length || attachments.length > 0) === 0
                                ? "text-lightBlue/50 cursor-default"
                                : "text-lightBlue cursor-pointer"
                        } capitalize flex justify-end text-sm font-extrabold `}
                    >
                        إرسال
                    </button>
                </div>
            </form>

            {supportChat.sendMessageError && (
                <span className='inline-block text-sm font-semibold text-darkRed text-center w-full'>
                    {supportChat.sendMessageError.body
                        ? supportChat.sendMessageError.body[0]
                        : ""}
                </span>
            )}
        </>
    );
};

export default SendMessage;
