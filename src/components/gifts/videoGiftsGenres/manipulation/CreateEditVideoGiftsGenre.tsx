import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
    createVideoGiftsGenre,
    editVideoGiftsGenre,
    resetEditCreateVideoGiftsGenresDataError,
} from "../../../../store/slices/gifts/videoGiftsGenresSlice";

// components
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import CreateEditModel from "../../../models/CreateEditModel";
import Backdrop from "../../../models/Backdrop";

// icons
import { MdCreate, MdOutlineModeEdit } from "react-icons/md";

const CreateEditVideoGiftsGenre = () => {
    const [processType, setProcessType] = useState("");
    const [showCreateEditModel, setShowCreateEditModel] = useState(false);
    const [showWaitMsg, setShowWaitMsg] = useState(false);
    const [hideModel, setHideModel] = useState(false);

    const auth = useSelector((state: RootState) => state.auth);
    const videoGiftsGenres = useSelector(
        (state: RootState) => state.videoGiftsGenres
    );

    const [formData, setFormData] = useState({
        name: "",
        precentage: "",
    });
    const [formDataError, setFormDataError] = useState({
        nameError: "",
        precentageError: "",
    });

    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();

    // useEffect => update the form Data when we in edit mode
    useEffect(() => {
        if (processType === "edit") {
            setFormData({
                name: videoGiftsGenres.specficVideoGiftsGenreData?.name || "",
                precentage: videoGiftsGenres.specficVideoGiftsGenreData
                    ?.precentage
                    ? `${videoGiftsGenres.specficVideoGiftsGenreData?.precentage}`
                    : "",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [processType]);

    // useEffect => check if videoGiftGenre is created or removed then remove the button message and hide the model
    useEffect(() => {
        if (
            processType === "create" &&
            showWaitMsg &&
            !videoGiftsGenres.createVideoGiftsGenreLoading
        ) {
            // remove wait msg in the button of create
            setShowWaitMsg(false);
            setHideModel(true);
        }

        if (
            processType === "edit" &&
            showWaitMsg &&
            !videoGiftsGenres.editVideoGiftsGenreLoading
        ) {
            // remove wait msg in the button of udpate
            setShowWaitMsg(false);
            setHideModel(true);
        }
    }, [
        videoGiftsGenres.createVideoGiftsGenreLoading,
        videoGiftsGenres.editVideoGiftsGenreLoading,
        processType,
        showWaitMsg,
    ]);

    // useEffect to hide modle
    useEffect(() => {
        if (!hideModel) {
            return;
        }
        // empty the input and hide the modle after 2 seconds
        const timer = setTimeout(() => {
            setFormData({
                name: "",
                precentage: "",
            });
            setHideModel(false);
            setShowCreateEditModel(false);
            // reset data and error of create video gifts genre => to not render again when create new video gifts genre
            dispatch(resetEditCreateVideoGiftsGenresDataError());
        }, 2000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hideModel]);

    const toggleCreateEditModelHandler = () => {
        setShowCreateEditModel((prevState) => !prevState);
    };

    const toggleCreateModelHandler = () => {
        setProcessType("create");
        toggleCreateEditModelHandler();
    };

    const toggleEditModelHandler = () => {
        setProcessType("edit");
        toggleCreateEditModelHandler();
    };

    // when change any value it will reflect to ui
    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // if e.target.type > 100 make sure the maxmum no if 100
        if (
            e.target.type === "number" &&
            +e.target.value > 100 &&
            e.target.id === "precentage"
        ) {
            setFormData((prevState) => ({
                ...prevState,
                precentage: "100",
            }));
            return;
        }

        setFormDataError({
            nameError: "",
            precentageError: "",
        });

        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    // confrim create edit video gifft genre
    const confirmCreateEditVideoGiftGenre = (type: boolean) => {
        // make sure when create otupdate gift genre is loading not send any requests to server again
        if (
            videoGiftsGenres.createVideoGiftsGenreLoading ||
            videoGiftsGenres.editVideoGiftsGenreLoading
        ) {
            return;
        }

        if (type) {
            // handling error
            if (!formData.name && formData.name.toString().length === 0) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    nameError: "الرجاء ملئ حقل الاسم",
                }));
                return;
            } else if (!formData.precentage) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    precentageError: "الرجاء ملئ حقل النسبه",
                }));
                return;
            }

            setShowWaitMsg(true);
            const SubmitedFormDate = new FormData();

            if (processType === "create") {
                SubmitedFormDate.append("name", formData.name);
                SubmitedFormDate.append(
                    "precentage",
                    `${+formData.precentage}`
                );

                dispatch(
                    createVideoGiftsGenre({
                        token: auth.loginData?.access_token!,
                        giftData: SubmitedFormDate,
                    })
                );
            } else {
                // udpate the changes only
                formData.name !==
                    videoGiftsGenres.specficVideoGiftsGenreData?.name &&
                    SubmitedFormDate.append("name", formData.name);
                +formData.precentage !==
                    videoGiftsGenres.specficVideoGiftsGenreData?.precentage &&
                    SubmitedFormDate.append(
                        "precentage",
                        `${+formData.precentage}`
                    );

                dispatch(
                    editVideoGiftsGenre({
                        token: auth.loginData?.access_token!,
                        gift_id: params.id!,
                        giftData: SubmitedFormDate,
                    })
                );
            }
            return;
        }

        toggleCreateEditModelHandler();
    };

    return (
        <>
            <div className='flex flex-wrap justify-end gap-3 sm:gap-5'>
                <Button
                    onClick={toggleCreateModelHandler}
                    createBtn
                    className='text-xs sm:text-sm p-1.5 px-3'
                >
                    <>
                        <MdCreate />
                        إنشاء نوع الفيديو
                    </>
                </Button>
                {params.id && (
                    <Button
                        onClick={toggleEditModelHandler}
                        editBtn
                        className='text-xs sm:text-sm p-1.5 px-3'
                    >
                        <>
                            <MdOutlineModeEdit />
                            تعديل نوع الفيديو
                        </>
                    </Button>
                )}
            </div>

            {/* create and edit video gifts genres */}
            {showCreateEditModel && (
                <Backdrop onClose={toggleCreateEditModelHandler} />
            )}
            <CreateEditModel
                header={
                    processType === "edit"
                        ? `تعديل نوع هدايا الفيديو ذات الاسم ${videoGiftsGenres.specficVideoGiftsGenreData?.name}`
                        : "إنشاء نوع هدايا فيديو جديد"
                }
                type={processType === "edit" ? "edit" : "create"}
                createEditBtnContent={
                    showWaitMsg
                        ? "من فضلك انتظر ..."
                        : processType === "edit"
                        ? "تعديل نوع هدايا الفيديو"
                        : "إنشاء نوع هدايا الفيديو"
                }
                showCreateEditModel={showCreateEditModel}
                confirmCreateEditHandler={confirmCreateEditVideoGiftGenre}
            >
                <div className='relative grid sm:grid-cols-2 gap-10'>
                    <Input
                        htmlFor='name'
                        id='name'
                        name='name'
                        label='اسم نوع هدايا الفيديو'
                        type='text'
                        onChange={onChange}
                        placeholder='*Name'
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        value={formData.name}
                        error={formDataError.nameError}
                    />
                    <Input
                        htmlFor='precentage'
                        id='precentage'
                        name='precentage'
                        label='نسبه نوع هدايا الفيديو'
                        type='number'
                        max={100}
                        onChange={onChange}
                        placeholder='*Precentage'
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        value={formData.precentage}
                        error={formDataError.precentageError}
                    />
                    <div className='sm:col-span-2'>
                        {(videoGiftsGenres.createVideoGiftsGenreData ||
                            videoGiftsGenres.createVideoGiftsGenreError) && (
                            <span
                                className={`${
                                    videoGiftsGenres.createVideoGiftsGenreData
                                        ? "text-success"
                                        : "text-darkRed"
                                } text-center mt-5 w-full font-semibold text-sm inline-block`}
                            >
                                {!videoGiftsGenres.createVideoGiftsGenreError
                                    ? videoGiftsGenres.createVideoGiftsGenreData
                                          ?.msg ||
                                      "لقد تم إنشاء نوع هدايا الفيديو"
                                    : videoGiftsGenres
                                          .createVideoGiftsGenreError.msg ||
                                      "فشل إنشاء نوع هدايا الفيديو"}
                            </span>
                        )}

                        {(videoGiftsGenres.editVideoGiftsGenreData ||
                            videoGiftsGenres.editVideoGiftsGenreError) && (
                            <span
                                className={`${
                                    videoGiftsGenres.editVideoGiftsGenreData
                                        ? "text-success"
                                        : "text-darkRed"
                                } text-center mt-5 w-full font-semibold text-sm inline-block`}
                            >
                                {!videoGiftsGenres.editVideoGiftsGenreError
                                    ? videoGiftsGenres.editVideoGiftsGenreData
                                          .msg ||
                                      "لقد تم تعديل نوع هدايا الفيديو"
                                    : videoGiftsGenres.editVideoGiftsGenreError
                                          .msg || "فشل تعديل نوع هدايا الفيديو"}
                            </span>
                        )}
                    </div>
                </div>
            </CreateEditModel>
        </>
    );
};

export default CreateEditVideoGiftsGenre;
