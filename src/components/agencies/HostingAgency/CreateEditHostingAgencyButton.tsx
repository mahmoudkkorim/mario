import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
    createHostingAgency,
    updateHostingAgency,
    resetCreateEditLoadingErrorAgency,
} from "../../../store/slices/agencies/hostingAgency/hostingAgenciesSlice";

// components
import Button from "../../ui/Button";
import Backdrop from "../../models/Backdrop";
import CreateEditModel from "../../models/CreateEditModel";
import Input from "../../ui/Input";
import ImageInput from "../../ui/ImageInput";
import SearchInputByUId from "../../ui/SearchInputByUId";

// icons
import { IoMdCreate } from "react-icons/io";
import { BiEdit } from "react-icons/bi";

// interface
import { CreateEditHostingAgency } from "../../../interfaces/pages/agencies/hostingAgencies/HostingAgencies";

const CreateEditHostingAgencyButton = (props: CreateEditHostingAgency) => {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();

    const { processType } = props;
    const auth = useSelector((state: RootState) => state.auth);
    const hostingAgencies = useSelector(
        (state: RootState) => state.hostingAgencies
    );

    const [showCreateModel, setShowCreateModel] = useState(false);
    const [localImage, setLocalImage] = useState<File | null>(null);
    const [showWaitMsg, setShowWaitMsg] = useState(false);
    const [hideModel, setHideModel] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        owner_id: "",
        owner_uid: "",
        cover_image: "",
    });
    const [formDataError, setFormDataError] = useState({
        nameError: "",
        descriptionError: "",
        cover_imageError: "",
        owner_idError: "",
    });

    // render data on inputs from specfic agency data that come from the backend
    useEffect(() => {
        if (processType === "create") return;

        setFormData({
            name: hostingAgencies.hostingSpecificAgencyData?.name || "",
            description:
                hostingAgencies.hostingSpecificAgencyData?.description || "",
            owner_id: hostingAgencies.hostingSpecificAgencyData?.owner_id
                ? hostingAgencies.hostingSpecificAgencyData?.owner_id.toString()
                : "",
            owner_uid:
                hostingAgencies.hostingSpecificAgencyData?.owner.uid || "",
            cover_image: hostingAgencies.hostingSpecificAgencyData?.cover || "",
        });
    }, [hostingAgencies.hostingSpecificAgencyData, processType]);

    // useEffect => check if agency is created and remove the button message and hide the model
    useEffect(() => {
        if (
            processType === "create" &&
            showWaitMsg &&
            !hostingAgencies.hostingCreateAgencyLoading
        ) {
            // remove wait msg in the button of create
            setShowWaitMsg(false);
            setHideModel(true);
        }

        if (
            processType === "edit" &&
            showWaitMsg &&
            !hostingAgencies.hostingUpdateAgencyLoading
        ) {
            // remove wait msg in the button of udpate
            setShowWaitMsg(false);
            setHideModel(true);
        }
    }, [
        hostingAgencies.hostingCreateAgencyLoading,
        hostingAgencies.hostingUpdateAgencyLoading,
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
                description: "",
                name: "",
                owner_id: "",
                owner_uid: "",
                cover_image: "",
            });
            setLocalImage(null);
            setShowCreateModel(false);
            setHideModel(false);
            // reset data and error of create agency => to not render again when create new agency
            dispatch(resetCreateEditLoadingErrorAgency());
        }, 2000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hideModel]);

    // show and hide backdrop and createEditModel
    const toggleCreateModelHandler = () => {
        setShowCreateModel((prevState) => !prevState);
    };

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // reset errors
        setFormDataError({
            cover_imageError: "",
            descriptionError: "",
            nameError: "",
            owner_idError: "",
        });

        const target = e.target as HTMLInputElement;

        if (e.target.type !== "file") {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            }));
        } else if (target && (target.files as FileList)) {
            const file: File = (target.files as FileList)[0];
            setLocalImage(file);
        }
    };

    // bearor is transfare id to parent element
    const bearorIdHandler = (id: number, uid: string) => {
        setFormData((prevState) => ({
            ...prevState,
            owner_id: id.toString(),
            owner_uid: uid,
        }));
    };

    // createEditModel response => if it true means create agency, if false just close model
    const confirmCreateHandler = (type: boolean) => {
        // check to make sure the user if click more than one time the funcion will not run again
        if (showWaitMsg) {
            return;
        }

        if (type) {
            // show message alert the user that the input is empty
            if (!localImage && processType === "create") {
                setFormDataError((prevState) => ({
                    ...prevState,
                    cover_imageError: "الرجاء ادخال صوره",
                }));
                return;
            } else if (!formData.name && formData.name.trim().length === 0) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    nameError: "الرجاء ملئ حقل الاسم",
                }));
                return;
            } else if (!formData.owner_id) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    owner_idError: "الرجاء اختيار الرقم التعرفى من الصندوق",
                }));
                return;
            } else if (
                !formData.description ||
                formData.description.length < 5
            ) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    descriptionError: "الرجاء ملئ حقل نبذه تعريفيه عن الوكاله",
                }));
                return;
            }

            const SubmitedFormDate = new FormData();

            // create hosting agency
            if (processType === "create") {
                SubmitedFormDate.append("name", formData.name);
                SubmitedFormDate.append("description", formData.description);
                SubmitedFormDate.append("cover_image", localImage!);
                SubmitedFormDate.append(
                    "owner_id",
                    formData.owner_id.toString()
                );

                setShowWaitMsg(true);
                dispatch(
                    createHostingAgency({
                        token: auth.loginData?.access_token!,
                        formData: SubmitedFormDate,
                    })
                );
            }

            // edit hosting agency
            if (processType === "edit") {
                formData.name !==
                    hostingAgencies.hostingSpecificAgencyData?.name &&
                    SubmitedFormDate.append("name", formData.name);
                formData.description !==
                    hostingAgencies.hostingSpecificAgencyData?.description &&
                    SubmitedFormDate.append(
                        "description",
                        formData.description
                    );
                localImage &&
                    SubmitedFormDate.append("cover_image", localImage);

                setShowWaitMsg(true);
                dispatch(
                    updateHostingAgency({
                        token: auth.loginData?.access_token!,
                        formData: SubmitedFormDate,
                        id: hostingAgencies.hostingSpecificAgencyData?.id!,
                    })
                );
            }

            return;
        }

        // if type is false just close the modle
        toggleCreateModelHandler();
    };

    return (
        <>
            {processType === "create" ? (
                <Button
                    onClick={toggleCreateModelHandler}
                    createBtn
                    className="text-xs sm:text-sm"
                >
                    <>
                        <IoMdCreate />
                        إنشاء وكاله استضافه
                    </>
                </Button>
            ) : (
                <Button
                    onClick={toggleCreateModelHandler}
                    editBtn
                    className="text-xs sm:text-sm"
                >
                    <>
                        <BiEdit />
                        تعديل الوكاله
                    </>
                </Button>
            )}
            {showCreateModel && <Backdrop onClose={toggleCreateModelHandler} />}
            <CreateEditModel
                header={
                    processType === "create"
                        ? "إنشاء وكاله جديده"
                        : "تعديل الوكاله"
                }
                type={processType === "create" ? "create" : "edit"}
                createEditBtnContent={
                    showWaitMsg
                        ? "من فضلك انتظر ..."
                        : processType === "create"
                        ? "إنشاء وكاله استضافه"
                        : "تعديل الوكاله"
                }
                showCreateEditModel={showCreateModel}
                confirmCreateEditHandler={confirmCreateHandler}
            >
                <div className="grid sm:grid-cols-2 gap-10">
                    <ImageInput
                        cover_image={formData.cover_image}
                        cover_imageError={formDataError.cover_imageError}
                        localImage={localImage}
                        name={formData.name}
                        onChange={onChange}
                        bg_camera="bg-grayWhite"
                    />
                    <div className="hidden sm:block"></div>
                    <Input
                        htmlFor="name"
                        id="name"
                        label="اسم وكاله الاستضافه"
                        name="name"
                        onChange={onChange}
                        value={formData.name}
                        placeholder="*Name"
                        required
                        type="text"
                        labelBgColor="bg-gradient-to-b from-grayWhite to-white"
                        error={formDataError.nameError}
                    />
                    <div className="relative">
                        <SearchInputByUId
                            htmlFor="owner_uid"
                            id="owner_uid"
                            label="الرقم التعريفى لمالك الوكاله"
                            name="owner_uid"
                            onChange={onChange}
                            bearorIdFun={bearorIdHandler}
                            value={formData.owner_uid}
                            title={formData.owner_id}
                            placeholder="*Owner Id"
                            required
                            type="number"
                            readOnly={processType === "edit" ? true : false}
                            labelBgColor="bg-gradient-to-b from-grayWhite to-white"
                            error={formDataError.owner_idError}
                        />
                    </div>
                    <Input
                        htmlFor="description"
                        id="description"
                        label="نبذه عن الوكاله"
                        name="description"
                        onChange={onChange}
                        value={formData.description}
                        placeholder="*Description"
                        required
                        type="textarea"
                        labelBgColor="bg-gradient-to-b from-grayWhite to-white"
                        error={formDataError.descriptionError}
                    />

                    <div className="sm:col-span-2">
                        {(hostingAgencies.hostingCreateAgencyData ||
                            hostingAgencies.hostingCreateAgencyError) && (
                            <span
                                className={`${
                                    hostingAgencies.hostingCreateAgencyData
                                        ? "text-success"
                                        : "text-darkRed"
                                } text-center mt-5 w-full font-semibold text-sm inline-block`}
                            >
                                {!hostingAgencies.hostingCreateAgencyError
                                    ? hostingAgencies.hostingCreateAgencyData
                                          ?.msg || "لقد تم إنشاء وكاله"
                                    : hostingAgencies.hostingCreateAgencyError ||
                                      "فشل إنشاء وكاله"}
                            </span>
                        )}

                        {(hostingAgencies.hostingUpdateAgencyData ||
                            hostingAgencies.hostingUpdateAgencyError) && (
                            <span
                                className={`${
                                    hostingAgencies.hostingUpdateAgencyData
                                        ? "text-success"
                                        : "text-darkRed"
                                } text-center mt-5 w-full font-semibold text-sm inline-block`}
                            >
                                {!hostingAgencies.hostingUpdateAgencyError
                                    ? hostingAgencies.hostingUpdateAgencyData ||
                                      "لقد تم تعديل وكاله"
                                    : "فشل تعديل وكاله"}
                            </span>
                        )}
                    </div>
                </div>
            </CreateEditModel>
        </>
    );
};

export default CreateEditHostingAgencyButton;
