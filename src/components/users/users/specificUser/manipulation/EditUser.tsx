import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { editUser } from "../../../../../store/slices/users/usersSlice";

// components
import Button from "../../../../ui/Button";
import CreateEditModel from "../../../../models/CreateEditModel";
import Backdrop from "../../../../models/Backdrop";
import Input from "../../../../ui/Input";
import ImageInput from "../../../../ui/ImageInput";
import RadioInput from "../../../../ui/RadioInput";

// icons
import { MdOutlineModeEdit } from "react-icons/md";

// data
import { GENDER_DATE } from "../../../../../data/members";

const EditUser = () => {
    const [showEditModel, setShowEditModel] = useState(false);
    const [showWaitMsg, setShowWaitMsg] = useState(false);
    const [localImage, setLocalImage] = useState<File | null>(null);

    const auth = useSelector((state: RootState) => state.auth);
    const users = useSelector((state: RootState) => state.users);

    const [editUserForm, setEditUserForm] = useState({
        name: users.specificUserData?.name || "",
        email: users.specificUserData?.email || "",
        profile_img: users.specificUserData?.profile_picture || "",
        phone: users.specificUserData?.phone || "",
        dob: users.specificUserData?.dob || "",
        gender: users.specificUserData?.gender || "",
        about_me: users.specificUserData?.about_me || "",
        country_id: users.specificUserData?.country_code || "EG",
        // money: users.specificUserData?.money || "0",
    });
    const [editUserDataError, setEditUserDataError] = useState({
        errorName: "",
        errorEmail: "",
        errorProfile_img: "",
        errorPhone: "",
        errorDob: "",
        errorGender: "",
        errorAbout_me: "",
        errorCountry_id: "",
        // errorMoney: "",
    });

    const {
        about_me,
        country_id,
        dob,
        email,
        gender,
        name,
        phone,
        profile_img,
        // money,
    } = editUserForm;

    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();

    useEffect(() => {
        if (showWaitMsg && !users.editUserLoading) {
            setShowEditModel(false);
            setShowWaitMsg(false);
        }
    }, [showWaitMsg, users.editUserLoading]);

    const toggleEditModel = () => {
        setShowEditModel((prevState) => !prevState);
    };

    // when change any value it will reflect to ui
    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEditUserDataError({
            errorName: "",
            errorEmail: "",
            errorProfile_img: "",
            errorPhone: "",
            errorDob: "",
            errorGender: "",
            errorAbout_me: "",
            errorCountry_id: "",
            // errorMoney: "",
        });

        if (e.target.type === "radio") {
            setEditUserForm((prevState) => ({
                ...prevState,
                [e.target.title]: e.target.value,
            }));
        } else if (e.target.type !== "file") {
            setEditUserForm((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            }));
        }

        const target = e.target as HTMLInputElement;
        if (target && (target.files as FileList)) {
            const file: File = (target.files as FileList)[0];
            setLocalImage(file);
        }
    };

    // confrim edit user
    const confirmEditUser = (type: boolean) => {
        // make sure when edit user is loading not send any requests to server again
        if (users.editUserLoading) {
            return;
        }

        if (type) {
            // handling error
            if (!profile_img && !localImage) {
                setEditUserDataError((prevState) => ({
                    ...prevState,
                    errorProfile_img: "الرجاء ادخال صوره",
                }));
                return;
            } else if (!name && name.trim().length === 0) {
                setEditUserDataError((prevState) => ({
                    ...prevState,
                    nameError: "الرجاء ملئ حقل الاسم",
                }));
                return;
            } else if (!email && email.trim().length === 0) {
                setEditUserDataError((prevState) => ({
                    ...prevState,
                    errorEmail: "الرجاء ملئ حقل الايميل",
                }));
                return;
                // } else if (!money) {
                //     setEditUserDataError((prevState) => ({
                //         ...prevState,
                //         errorMoney: "الرجاء ملئ حقل النقود",
                //     }));
                //     return;
            } else if (!phone && phone.toString().length === 0) {
                setEditUserDataError((prevState) => ({
                    ...prevState,
                    errorPhone: "الرجاء ملئ حقل رقم التليفون",
                }));
                return;
            } else if (!dob && dob.trim().length === 0) {
                setEditUserDataError((prevState) => ({
                    ...prevState,
                    errorDob: "الرجاء ملئ حقل تاريخ الميلاد",
                }));
                return;
            } else if (!gender && gender.trim().length === 0) {
                setEditUserDataError((prevState) => ({
                    ...prevState,
                    errorGender: "الرجاء ملئ حقل تاريخ الميلاد",
                }));
                return;
            } else if (!about_me && about_me.trim().length === 0) {
                setEditUserDataError((prevState) => ({
                    ...prevState,
                    errorAbout_me: "الرجاء ملئ حقل نبذه عنى",
                }));
                return;
            }

            setShowWaitMsg(true);
            // udpate the changes only
            const SubmitedFormDate = new FormData();
            about_me !== users.specificUserData?.about_me &&
                SubmitedFormDate.append("about_me", about_me);
            dob !== users.specificUserData?.dob &&
                SubmitedFormDate.append("dob", dob);
            email !== users.specificUserData?.email &&
                SubmitedFormDate.append("email", email);
            gender !== users.specificUserData?.gender &&
                SubmitedFormDate.append("gender", gender);
            name !== users.specificUserData?.name &&
                SubmitedFormDate.append("name", name);
            // money !== users.specificUserData?.money &&
            //     SubmitedFormDate.append("money", `${+money}`);
            phone !== users.specificUserData?.phone &&
                SubmitedFormDate.append("phone", phone.toString());
            localImage && SubmitedFormDate.append("profile_img", localImage);

            dispatch(
                editUser({
                    token: auth.loginData?.access_token!,
                    userId: params.id!,
                    formData: SubmitedFormDate,
                })
            );
            return;
        }

        toggleEditModel();
    };

    return (
        <>
            <Button
                onClick={toggleEditModel}
                editBtn
                className='text-xs sm:text-sm p-1.5 px-3 bg-grayWhite'
            >
                <>
                    <MdOutlineModeEdit />
                    <span>تعديل العضو</span>
                </>
            </Button>

            {/* edit user */}
            {showEditModel && <Backdrop onClose={toggleEditModel} />}
            <CreateEditModel
                header='تعديل بيانات العضو'
                type='edit'
                createEditBtnContent={
                    showWaitMsg ? "من فضلك انتظر ..." : "تعديل بيانات العضو"
                }
                showCreateEditModel={showEditModel}
                confirmCreateEditHandler={confirmEditUser}
            >
                <div className='relative grid sm:grid-cols-2 gap-10'>
                    <ImageInput
                        bg_camera='bg-grayWhite'
                        cover_image={profile_img}
                        cover_imageError={editUserDataError.errorProfile_img}
                        localImage={localImage}
                        name={name}
                        onChange={onChange}
                    />
                    <div className='hidden sm:block'></div>
                    <Input
                        htmlFor='name'
                        id='name'
                        name='name'
                        label='الأسم'
                        type='text'
                        onChange={onChange}
                        min={2}
                        max={150}
                        placeholder='*Name'
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        value={name}
                        error={editUserDataError.errorName}
                    />
                    <Input
                        htmlFor='email'
                        id='email'
                        name='email'
                        label='الايميل'
                        type='email'
                        onChange={onChange}
                        placeholder='*Email'
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        value={email}
                        error={editUserDataError.errorEmail}
                    />
                    {/* <Input
                        htmlFor='money'
                        id='money'
                        name='money'
                        label='النقود'
                        type='number'
                        onChange={onChange}
                        placeholder='*Money'
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        value={money}
                        error={editUserDataError.errorMoney}
                    /> */}
                    <Input
                        htmlFor='country_id'
                        id='country_id'
                        name='country_id'
                        label='كود البلد'
                        type='text'
                        readOnly
                        onChange={onChange}
                        placeholder='*Country Code'
                        // pattern=\[-+]?\d*\
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        value={country_id}
                        error={editUserDataError.errorCountry_id}
                    />
                    <Input
                        htmlFor='phone'
                        id='phone'
                        name='phone'
                        label='رقم التليفون'
                        type='text'
                        onChange={onChange}
                        placeholder='*Phone'
                        // pattern=\[-+]?\d*\
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        value={phone}
                        error={editUserDataError.errorPhone}
                    />
                    <Input
                        htmlFor='dob'
                        id='dob'
                        name='dob'
                        label='تاريخ الميلاد'
                        type='date'
                        onChange={onChange}
                        placeholder='*Date of birth'
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        value={dob}
                        error={editUserDataError.errorDob}
                    />
                    <RadioInput
                        onChange={onChange}
                        title='gender'
                        label='النوع'
                        ckeckedOne={gender}
                        types={GENDER_DATE}
                        typeError={editUserDataError.errorGender}
                    />
                    <Input
                        htmlFor='about_me'
                        id='about_me'
                        name='about_me'
                        label='نبذه عنى'
                        type='textarea'
                        onChange={onChange}
                        placeholder='*About me'
                        // pattern=\[-+]?\d*\
                        labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                        value={about_me}
                        error={editUserDataError.errorAbout_me}
                    />
                </div>
            </CreateEditModel>
        </>
    );
};

export default EditUser;
