import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
    createEmoji,
    editEmoji,
    resetEditCreateEmoji,
} from "../../store/slices/emojisSlice";

// components
import PagesHeaders from "../ui/PagesHeaders";
import ImageInput from "../ui/ImageInput";
import Input from "../ui/Input";
import RadioInput from "../ui/RadioInput";
import Button from "../ui/Button";

const CreateEditEmoji = () => {
    const { search } = useLocation();
    const navigate = useNavigate();

    const emojiLocalStorage = JSON.parse(
        localStorage.getItem("emoji") as string
    );

    // states
    const [localImage, setLocalImage] = useState<File | null>(null);
    const [localGif, setLocalGif] = useState<File | null>(null);
    const [formData, setFormData] = useState(
        search.includes("create")
            ? {
                  cover_image: "",
                  body_image: "",
              }
            : {
                  cover_image: emojiLocalStorage.cover,
                  body_image: emojiLocalStorage.body,
              }
    );
    const [formDataError, setFormDataError] = useState({
        cover_imageError: "",
        body_imageError: "",
    });

    const { body_image, cover_image } = formData;
    const { body_imageError, cover_imageError } = formDataError;

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const emojis = useSelector((state: RootState) => state.emojis);

    // make sure when user in update or edit page the local storage emoji is not empty
    // if is empty navigate to previos page
    useEffect(() => {
        if (!localStorage.getItem("emoji") && search.includes("updateEmoji")) {
            navigate(-1);
        }
    }, [navigate, search, emojiLocalStorage]);

    // when edit or create room make sure navigate to /emojis
    useEffect(() => {
        const timer = setTimeout(() => {
            if (emojis.createEmojiData || emojis.editEmojiData) {
                dispatch(resetEditCreateEmoji());
                navigate("/emojis");
            }
        }, 4000);

        return () => clearTimeout(timer);
    }, [emojis.createEmojiData, emojis.editEmojiData, dispatch, navigate]);

    // when change any value it will reflect to ui
    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormDataError({
            cover_imageError: "",
            body_imageError: "",
        });

        const target = e.target as HTMLInputElement;
        if (
            target &&
            target.id === "cover_image" &&
            (target.files as FileList)
        ) {
            const file: File = (target.files as FileList)[0];
            setLocalImage(file);
        } else {
            const file: File = (target.files as FileList)[0];
            setLocalGif(file);
        }
    };
    console.log(localGif?.type.includes("gif"));

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();

        // make sure if the user click in button twice will create or edit only one emoji
        if (emojis.editEmojiLoading || emojis.createEmojiLoading) {
            return;
        }
        // -------- NO RESTRECT TO ENTER IMAGE
        // if (!cover_image && !localImage) {
        //     setFormDataError((prevState) => ({
        //         ...prevState,
        //         cover_imageError: "الرجاء ادخال صوره",
        //     }));
        //     return;
        // }
        if (!body_image && !localGif) {
            setFormDataError((prevState) => ({
                ...prevState,
                cover_imageError: "الرجاء ادخال ملف ال .gif",
            }));
            return;
        }

        const SubmitedFormDate = new FormData();
        // create emoji
        if (search.includes("create")) {
            SubmitedFormDate.append("cover_image", localImage!);
            SubmitedFormDate.append("body_image", localGif!);

            dispatch(
                createEmoji({
                    formData: SubmitedFormDate,
                    token: auth.loginData?.access_token!,
                })
            );
            // edit emoji
        } else {
            // udpate the changes only
            localImage && SubmitedFormDate.append("cover_image", localImage!);
            localGif && SubmitedFormDate.append("body_image", localGif!);

            dispatch(
                editEmoji({
                    formData: SubmitedFormDate,
                    token: auth.loginData?.access_token!,
                    emoji_id: emojiLocalStorage.id,
                })
            );
        }
    };

    return (
        <section className='container'>
            <PagesHeaders small>
                {search.includes("create")
                    ? "إنشاء إيموجى جديده"
                    : "تعديل الإيموجى"}
            </PagesHeaders>
            <form className='mt-5' onSubmit={submitFormHandler}>
                <div className='grid grid-col-1 sm:grid-cols-2 gap-10 items-center'>
                    <div className='flex flex-col gap-3 justify-start'>
                        <label
                            htmlFor='cover_image'
                            className='border-b-[1px] border-darkGray/50 px-1 text-sm w-fit -translate-y-[50%] duration-200'
                        >
                            صوره الإيموجى
                        </label>

                        <ImageInput
                            cover_image={cover_image}
                            cover_imageError={cover_imageError}
                            localImage={localImage}
                            name={`emoji_image`}
                            onChange={onChange}
                        />
                    </div>
                    <div className='flex flex-col gap-3 justify-start'>
                        <label
                            htmlFor='body_image'
                            className='border-b-[1px] border-darkGray/50 px-1 text-sm w-fit -translate-y-[50%] duration-200'
                        >
                            ملف الايموجى gif.{" "}
                            <span className='font-semibold text-darkRed'>
                                {" "}
                                (اقصى حجم للملف 1MB)
                            </span>
                        </label>
                        <ImageInput
                            cover_image={body_image}
                            cover_imageError={body_imageError}
                            localImage={localGif}
                            name={`emoji_image`}
                            id='body_image'
                            accept='.gif'
                            onChange={onChange}
                        />
                    </div>
                </div>
                <Button
                    editBtn={!search.includes("create")}
                    createBtn={search.includes("create")}
                    className='mx-auto mt-8'
                >
                    {emojis.editEmojiLoading || emojis.createEmojiLoading
                        ? "من فضلك انتظر ..."
                        : search.includes("create")
                        ? "إنشاء إيموجى جديده"
                        : "تعديل الإيموجى"}
                </Button>
                <div className='flex justify-center mt-5'>
                    {(emojis.editEmojiData || emojis.createEmojiData) && (
                        <span className='text-success font-semibold text-sm'>
                            {search.includes("create")
                                ? emojis.createEmojiData.msg ||
                                  "لقد تم عمل إيموجى جديده"
                                : emojis.editEmojiData.msg ||
                                  "لقد تم تعديل الإيموجى"}
                        </span>
                    )}
                    {(emojis.editEmojiError || emojis.createEmojiError) && (
                        <span className='text-darkRed font-semibold text-sm'>
                            {search.includes("create")
                                ? emojis.createEmojiError.msg ||
                                  (emojis.createEmojiError.cover_image &&
                                      emojis.createEmojiError.cover_image[0]) ||
                                  (emojis.createEmojiError.body_image &&
                                      emojis.createEmojiError.body_image[0]) ||
                                  "فشل عمل الإيموجى جديده"
                                : (emojis.editEmojiError.cover_image &&
                                      emojis.editEmojiError.cover_image[0]) ||
                                  (emojis.editEmojiError.body_image &&
                                      emojis.editEmojiError.body_image[0]) ||
                                  "فشل تعديل الإيموجى"}
                        </span>
                    )}
                </div>
            </form>
        </section>
    );
};

export default CreateEditEmoji;
