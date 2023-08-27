import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// components
import Input from "../../../../../ui/Input";
import Backdrop from "../../../../../models/Backdrop";
import CreateEditModel from "../../../../../models/CreateEditModel";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../../../store/store";
import {
    createAudioTarget,
    updateAudioTarget,
    resetCreateEditLoadingErrorAudioTarget,
} from "../../../../../../store/slices/agencies/hostingAgency/target/audioTarget-hostingAgenciesSlice";
import {
    createVideoTarget,
    updateVideoTarget,
    resetCreateEditLoadingErrorVideoTarget,
} from "../../../../../../store/slices/agencies/hostingAgency/target/videoTarget-hostingAgenciesSlice";

// interface
import {
    CreateEditTarget,
    ShowHideModel,
} from "../../../../../../interfaces/pages/agencies/hostingAgencies/target/AudioVideoTarget";

const CreateEditForm = (props: CreateEditTarget & ShowHideModel) => {
    const { processType, showCreateEditModel } = props;

    const dispatch = useDispatch<AppDispatch>();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const target = query.get("target");
    const target_id = query.get("target_id");

    // selectors
    const auth = useSelector((state: RootState) => state.auth);
    const audioTarget_hostingAgencies = useSelector(
        (state: RootState) => state.audioTarget_hostingAgencies
    );
    const videoTarget_hostingAgencies = useSelector(
        (state: RootState) => state.videoTarget_hostingAgencies
    );

    const [hideModel, setHideModel] = useState(false);
    const [showWaitMsg, setShowWaitMsg] = useState(false);
    const [formData, setFormData] = useState({
        diamonds_required: "",
        hours_required: "",
        salary: "",
        owner_salary: "",
    });
    const { diamonds_required, hours_required, owner_salary, salary } =
        formData;

    const [formDataError, setFormDataError] = useState({
        diamonds_requiredError: "",
        hours_requiredError: "",
        salaryError: "",
        owner_salaryError: "",
    });

    // useEffect to render the values of audio or video target if we in processType edit
    useEffect(() => {
        if (processType === "edit" && !hideModel) {
            if (target === "audio") {
                // render the values of audio
                setFormData({
                    diamonds_required: `${audioTarget_hostingAgencies.specificAudioTargetData?.diamonds_required}`,
                    hours_required: `${audioTarget_hostingAgencies.specificAudioTargetData?.hours_required}`,
                    owner_salary: `${audioTarget_hostingAgencies.specificAudioTargetData?.owner_salary}`,
                    salary: `${audioTarget_hostingAgencies.specificAudioTargetData?.salary}`,
                });
            } else {
                // render the values of video
                setFormData({
                    diamonds_required: `${videoTarget_hostingAgencies.specificVideoTargetData?.diamonds_required}`,
                    hours_required: `${videoTarget_hostingAgencies.specificVideoTargetData?.hours_required}`,
                    owner_salary: `${videoTarget_hostingAgencies.specificVideoTargetData?.owner_salary}`,
                    salary: `${videoTarget_hostingAgencies.specificVideoTargetData?.salary}`,
                });
            }
        }
    }, [
        processType,
        target,
        hideModel,
        audioTarget_hostingAgencies.specificAudioTargetData,
        videoTarget_hostingAgencies.specificVideoTargetData,
    ]);

    // useEffect to hideWaitMessage and give time in seconds to close the model for create and edit to audio and video targets
    useEffect(() => {
        if (!showWaitMsg) return;

        if (processType === "create") {
            if (
                target === "audio" &&
                !audioTarget_hostingAgencies.audioTargetCreateLoading
            ) {
                setShowWaitMsg(false);
                setHideModel(true);
            } else if (
                target === "video" &&
                !videoTarget_hostingAgencies.videoTargetCreateLoading
            ) {
                setShowWaitMsg(false);
                setHideModel(true);
            }
        } else if (processType === "edit") {
            if (
                target === "audio" &&
                !audioTarget_hostingAgencies.audioTargetUpdateLoading
            ) {
                setShowWaitMsg(false);
                setHideModel(true);
            } else if (
                target === "video" &&
                !videoTarget_hostingAgencies.videoTargetUpdateLoading
            ) {
                setShowWaitMsg(false);
                setHideModel(true);
            }
        }
    }, [
        audioTarget_hostingAgencies.audioTargetCreateLoading,
        audioTarget_hostingAgencies.audioTargetUpdateLoading,
        processType,
        showWaitMsg,
        target,
        videoTarget_hostingAgencies.videoTargetCreateLoading,
        videoTarget_hostingAgencies.videoTargetUpdateLoading,
    ]);

    // useEffect to hide model after a specifc time
    useEffect(() => {
        if (!hideModel) {
            return;
        }
        // empty the input and hide the modle after 2 seconds
        const timer = setTimeout(() => {
            setHideModel(false);
            // reset data and error of create and edit video or audio target => to not render again when create or edit new one
            dispatch(resetCreateEditLoadingErrorAudioTarget());
            dispatch(resetCreateEditLoadingErrorVideoTarget());
            props.toggleCreateEditModelHandler();
        }, 2000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hideModel]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // reset errors
        setFormDataError({
            diamonds_requiredError: "",
            hours_requiredError: "",
            salaryError: "",
            owner_salaryError: "",
        });

        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    // when confirm create or edit target
    const confirmCreateHandler = (type: boolean) => {
        // check to make sure the user if click more than one time the funcion will not run again
        if (showWaitMsg) {
            return;
        }

        // when confirm to create or edit target
        if (type) {
            // show message alert the user that the input is empty
            if (formData.diamonds_required.trim().length === 0) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    diamonds_requiredError: "الرجاء ملئ حقل الماسات المطلوبه",
                }));
                return;
            } else if (formData.hours_required.trim().length === 0) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    hours_requiredError: "الرجاء ملئ حقل الساعات المطلوبه",
                }));
                return;
            } else if (formData.salary.trim().length === 0) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    salaryError: "الرجاء ملئ حقل الراتب",
                }));
                return;
            } else if (formData.owner_salary.trim().length === 0) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    owner_salaryError: "الرجاء ملئ حقل راتب المالك",
                }));
                return;
            }

            const SubmitedFormDate = new FormData();
            // to show message to make user make sure the proccess is exist
            setShowWaitMsg(true);

            if (processType === "create") {
                SubmitedFormDate.append("diamonds_required", diamonds_required);
                SubmitedFormDate.append("hours_required", hours_required);
                SubmitedFormDate.append("salary", salary);
                SubmitedFormDate.append("owner_salary", owner_salary);

                // we will not make any checks in create we need all data
                if (target === "audio") {
                    // create audio
                    dispatch(
                        createAudioTarget({
                            formData: SubmitedFormDate,
                            token: auth.loginData?.access_token!,
                        })
                    );
                } else if (target === "video") {
                    // create video
                    dispatch(
                        createVideoTarget({
                            formData: SubmitedFormDate,
                            token: auth.loginData?.access_token!,
                        })
                    );
                }
            } else if (processType === "edit") {
                if (target === "audio") {
                    // we will make checks if values is changed attach it to body if not change not attack it
                    audioTarget_hostingAgencies.specificAudioTargetData
                        ?.diamonds_required !== +diamonds_required &&
                        SubmitedFormDate.append(
                            "diamonds_required",
                            diamonds_required
                        );
                    audioTarget_hostingAgencies.specificAudioTargetData
                        ?.hours_required !== +hours_required &&
                        SubmitedFormDate.append(
                            "hours_required",
                            hours_required
                        );
                    audioTarget_hostingAgencies.specificAudioTargetData
                        ?.salary !== +salary &&
                        SubmitedFormDate.append("salary", salary);
                    audioTarget_hostingAgencies.specificAudioTargetData
                        ?.owner_salary !== +owner_salary &&
                        SubmitedFormDate.append("owner_salary", owner_salary);

                    // edit audio
                    dispatch(
                        updateAudioTarget({
                            formData: SubmitedFormDate,
                            target_id: target_id!,
                            token: auth.loginData?.access_token!,
                        })
                    );
                } else {
                    // we will make checks if values is changed attach it to body if not change not attack it
                    videoTarget_hostingAgencies.specificVideoTargetData
                        ?.diamonds_required !== +diamonds_required &&
                        SubmitedFormDate.append(
                            "diamonds_required",
                            diamonds_required
                        );
                    videoTarget_hostingAgencies.specificVideoTargetData
                        ?.hours_required !== +hours_required &&
                        SubmitedFormDate.append(
                            "hours_required",
                            hours_required
                        );
                    videoTarget_hostingAgencies.specificVideoTargetData
                        ?.salary !== +salary &&
                        SubmitedFormDate.append("salary", salary);
                    videoTarget_hostingAgencies.specificVideoTargetData
                        ?.owner_salary !== +owner_salary &&
                        SubmitedFormDate.append("owner_salary", owner_salary);

                    // edit video
                    dispatch(
                        updateVideoTarget({
                            formData: SubmitedFormDate,
                            target_id: target_id!,
                            token: auth.loginData?.access_token!,
                        })
                    );
                }
            }
        }
    };

    return (
        <>
            {showCreateEditModel && (
                <Backdrop onClose={props.toggleCreateEditModelHandler} />
            )}
            <CreateEditModel
                header={
                    processType === "create"
                        ? `إنشاء تارجت ${
                              target === "audio" ? "صوتى" : "فيديو"
                          } جديد`
                        : `تعديل ${
                              target === "audio"
                                  ? "التارجت الصوتى"
                                  : "تارجت الفيديو"
                          }`
                }
                type={processType === "create" ? "create" : "edit"}
                createEditBtnContent={
                    showWaitMsg
                        ? "من فضلك انتظر ..."
                        : processType === "create"
                        ? `إنشاء تارجت ${target === "audio" ? "صوتى" : "فيديو"}`
                        : `تعديل ${
                              target === "audio"
                                  ? "التارجت الصوتى"
                                  : "تارجت الفيديو"
                          }`
                }
                showCreateEditModel={showCreateEditModel}
                confirmCreateEditHandler={confirmCreateHandler}
            >
                <div className='grid sm:grid-cols-2 gap-10'>
                    <Input
                        htmlFor='diamonds_required'
                        id='diamonds_required'
                        label='الماسات المطلوبه'
                        name='diamonds_required'
                        onChange={onChange}
                        value={diamonds_required}
                        placeholder='*Diamonds Required'
                        required
                        type='number'
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        error={formDataError.diamonds_requiredError}
                    />
                    <Input
                        htmlFor='hours_required'
                        id='hours_required'
                        label='الساعات المطلوبه'
                        name='hours_required'
                        onChange={onChange}
                        value={hours_required}
                        placeholder='*Hours Required'
                        required
                        type='number'
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        error={formDataError.hours_requiredError}
                    />
                    <Input
                        htmlFor='salary'
                        id='salary'
                        label='الراتب'
                        name='salary'
                        onChange={onChange}
                        value={salary}
                        placeholder='*Salary'
                        required
                        type='number'
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        error={formDataError.salaryError}
                    />
                    <Input
                        htmlFor='owner_salary'
                        id='owner_salary'
                        label='راتب المالك'
                        name='owner_salary'
                        onChange={onChange}
                        value={owner_salary}
                        placeholder='*Owner Salary'
                        required
                        type='number'
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        error={formDataError.owner_salaryError}
                    />
                    <div className='sm:col-span-2 text-center'>
                        {/* audioTarget */}
                        {(audioTarget_hostingAgencies.audioTargetCreateData ||
                            audioTarget_hostingAgencies.audioTargetCreateError) && (
                            <span
                                className={`${
                                    audioTarget_hostingAgencies.audioTargetCreateData
                                        ? "text-success"
                                        : "text-darkRed"
                                } text-center mt-5 w-full font-semibold text-sm inline-block`}
                            >
                                {audioTarget_hostingAgencies.audioTargetCreateData
                                    ? audioTarget_hostingAgencies
                                          .audioTargetCreateData?.msg ||
                                      "لقد تم إنشاء تارجت صوتى"
                                    : audioTarget_hostingAgencies.audioTargetCreateError ||
                                      "فشل إنشاء تارجت صوتى"}
                            </span>
                        )}
                        {(audioTarget_hostingAgencies.audioTargetUpdateData ||
                            audioTarget_hostingAgencies.audioTargetUpdateError) && (
                            <span
                                className={`${
                                    audioTarget_hostingAgencies.audioTargetUpdateData
                                        ? "text-success"
                                        : "text-darkRed"
                                } text-center mt-5 w-full font-semibold text-sm inline-block`}
                            >
                                {audioTarget_hostingAgencies.audioTargetUpdateData
                                    ? audioTarget_hostingAgencies
                                          .audioTargetUpdateData?.msg ||
                                      "لقد تم تعديل تارجت صوتى"
                                    : audioTarget_hostingAgencies.audioTargetUpdateData
                                    ? audioTarget_hostingAgencies
                                          .audioTargetUpdateData?.msg ||
                                      "لقد تم تعديل تارجت الصوتى"
                                    : audioTarget_hostingAgencies
                                          .audioTargetUpdateError
                                          .diamonds_required[0] ||
                                      audioTarget_hostingAgencies
                                          .audioTargetUpdateError
                                          .hours_required[0] ||
                                      audioTarget_hostingAgencies
                                          .audioTargetUpdateError.salary[0] ||
                                      audioTarget_hostingAgencies
                                          .audioTargetUpdateError
                                          .owner_salary[0] ||
                                      "فشل تعديل تارجت صوتى"}
                            </span>
                        )}
                        {/* videoTarget */}
                        {(videoTarget_hostingAgencies.videoTargetCreateData ||
                            videoTarget_hostingAgencies.videoTargetCreateError) && (
                            <span
                                className={`${
                                    videoTarget_hostingAgencies.videoTargetCreateData
                                        ? "text-success"
                                        : "text-darkRed"
                                } text-center mt-5 w-full font-semibold text-sm inline-block`}
                            >
                                {videoTarget_hostingAgencies.videoTargetCreateData
                                    ? videoTarget_hostingAgencies
                                          .videoTargetCreateData?.msg ||
                                      "لقد تم إنشاء تارجت فيديو"
                                    : videoTarget_hostingAgencies.videoTargetCreateError ||
                                      "فشل إنشاء تارجت فيديو"}
                            </span>
                        )}
                        {(videoTarget_hostingAgencies.videoTargetUpdateData ||
                            videoTarget_hostingAgencies.videoTargetUpdateError) && (
                            <span
                                className={`${
                                    videoTarget_hostingAgencies.videoTargetUpdateData
                                        ? "text-success"
                                        : "text-darkRed"
                                } text-center mt-5 w-full font-semibold text-sm inline-block`}
                            >
                                {videoTarget_hostingAgencies.videoTargetUpdateData
                                    ? videoTarget_hostingAgencies
                                          .videoTargetUpdateData?.msg ||
                                      "لقد تم تعديل تارجت فيديو"
                                    : videoTarget_hostingAgencies
                                          .videoTargetUpdateError
                                          .diamonds_required[0] ||
                                      videoTarget_hostingAgencies
                                          .videoTargetUpdateError
                                          .hours_required[0] ||
                                      videoTarget_hostingAgencies
                                          .videoTargetUpdateError.salary[0] ||
                                      videoTarget_hostingAgencies
                                          .videoTargetUpdateError
                                          .owner_salary[0] ||
                                      "فشل تعديل تارجت فيديو"}
                            </span>
                        )}
                    </div>
                </div>
            </CreateEditModel>
        </>
    );
};

export default CreateEditForm;
