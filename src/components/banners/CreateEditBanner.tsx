import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// components
import Input from "../ui/Input";
import Button from "../ui/Button";
import PagesHeaders from "../ui/PagesHeaders";
import ImageInput from "../ui/ImageInput";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
    createBanner,
    editBanner,
    resetEditCreateBanner,
} from "../../store/slices/bannersSlice";

const CreateEditBanner = () => {
    const { search } = useLocation();
    const navigate = useNavigate();

    const bannerLocalStorage = JSON.parse(
        localStorage.getItem("banner") as string
    );

    const [localImage, setLocalImage] = useState<File | null>(null);
    const [formData, setFormData] = useState(
        search.includes("create")
            ? { cover_image: "", valid_to: "" }
            : {
                  cover_image: bannerLocalStorage.cover,
                  valid_to: bannerLocalStorage.valid_to,
              }
    );
    const [formDataError, setFormDataError] = useState({
        cover_imageError: "",
        valid_toError: "",
    });

    const { cover_image, valid_to } = formData;
    const { cover_imageError, valid_toError } = formDataError;

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const banners = useSelector((state: RootState) => state.banners);

    // make sure when user in update or edit page the local storage banner is not empty
    // if is empty navigate to previos page
    useEffect(() => {
        if (
            !localStorage.getItem("banner") &&
            search.includes("updateBanner")
        ) {
            navigate(-1);
        }
    }, [navigate, search, bannerLocalStorage]);

    // when edit or create banner make sure navigate to /banners
    useEffect(() => {
        const timer = setTimeout(() => {
            if (banners.createBannerData || banners.editBannerData) {
                dispatch(resetEditCreateBanner());
                navigate("/banners");
            }
        }, 4000);

        return () => clearTimeout(timer);
    }, [banners.createBannerData, banners.editBannerData, dispatch, navigate]);

    // when change any value it will reflect to ui
    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormDataError({
            cover_imageError: "",
            valid_toError: "",
        });

        if (e.target.type !== "file") {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            }));
        }

        const target = e.target as HTMLInputElement;
        if (
            target &&
            target.id === "cover_image" &&
            (target.files as FileList)
        ) {
            const file: File = (target.files as FileList)[0];
            setLocalImage(file);
        }
    };

    const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // make sure if the user click in button twice will create or edit only one banner
        if (banners.editBannerLoading || banners.createBannerLoading) {
            return;
        }

        if (!cover_image && !localImage) {
            setFormDataError((prevState) => ({
                ...prevState,
                cover_imageError: "الرجاء ادخال صوره",
            }));
            return;
        } else if (!valid_to && valid_to.trim().length === 0) {
            setFormDataError((prevState) => ({
                ...prevState,
                nameError: "الرجاء ملئ حقل مده الصلاحيه",
            }));
            return;
        }

        const SubmitedFormDate = new FormData();

        // field not have any role in application
        SubmitedFormDate.append("related_to", `${2}`);
        SubmitedFormDate.append("related_to_id", `${1}`);

        // create banner
        if (search.includes("create")) {
            SubmitedFormDate.append("valid_to", valid_to);
            SubmitedFormDate.append("cover_image", localImage!);

            dispatch(
                createBanner({
                    formData: SubmitedFormDate,
                    token: auth.loginData?.access_token!,
                })
            );
            // edit banner
        } else {
            // udpate the changes only
            bannerLocalStorage.valid_to !== valid_to &&
                SubmitedFormDate.append("valid_to", valid_to);
            localImage && SubmitedFormDate.append("cover_image", localImage!);

            dispatch(
                editBanner({
                    formData: SubmitedFormDate,
                    token: auth.loginData?.access_token!,
                    banner_id: bannerLocalStorage.id,
                })
            );
        }
    };

    return (
        <section className='container'>
            <PagesHeaders small>
                {search.includes("create") ? "إنشاء بانر جديد" : "تعديل البانر"}
            </PagesHeaders>
            <form className='mt-5' onSubmit={submitFormHandler}>
                <div className='grid grid-col-1 sm:grid-cols-2 gap-10 items-center'>
                    <ImageInput
                        cover_image={cover_image}
                        cover_imageError={cover_imageError}
                        localImage={localImage}
                        name={"image"}
                        onChange={onChange}
                    />
                    <div className='hidden sm:block'></div>
                    <Input
                        htmlFor='valid_to'
                        id='valid_to'
                        name='valid_to'
                        label='تاريخ انتهاء الصلاحيه'
                        type='date'
                        onChange={onChange}
                        placeholder='*Valid days'
                        labelBgColor='bg-gradient-to-b from-lighterGray to-white'
                        value={valid_to}
                        error={valid_toError}
                    />
                </div>
                <Button
                    editBtn={!search.includes("create")}
                    createBtn={search.includes("create")}
                    className='mx-auto mt-8'
                >
                    {banners.editBannerLoading || banners.createBannerLoading
                        ? "من فضلك انتظر ..."
                        : search.includes("create")
                        ? "إنشاء بانر جديد"
                        : "تعديل البانر"}
                </Button>
                <div className='flex justify-center mt-5'>
                    {(banners.editBannerData || banners.createBannerData) && (
                        <span className='text-success font-semibold text-sm'>
                            {search.includes("create")
                                ? "لقد تم عمل البانر جديد"
                                : "لقد تم تعديل البانر"}
                        </span>
                    )}
                </div>
            </form>
        </section>
    );
};

export default CreateEditBanner;
