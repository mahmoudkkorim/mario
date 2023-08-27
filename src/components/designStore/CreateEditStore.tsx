import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// components
import Input from "../ui/Input";
import Button from "../ui/Button";
import ImageInput from "../ui/ImageInput";
import SvgaInput from "../ui/SvgaInput";
import RadioInput from "../ui/RadioInput";
import PagesHeaders from "../ui/PagesHeaders";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

import {
    createDesignsStore,
    editDesignsStore,
    resetEditCreateDesignStore,
} from "../../store/slices/designStoreSlice";

// data
import {
    FILTER_TYPES,
    FREE_OR_NOT,
    CURRENCY_TYPE,
} from "../../data/filterTypes";

const CreateEditStore = () => {
    const { search } = useLocation();
    const navigate = useNavigate();

    const designStoreLocalStorage = JSON.parse(
        localStorage.getItem("designStore") as string
    );

    const [localImage, setLocalImage] = useState<File | null>(null);
    const [localSvgaImage, setLocalSvgaImage] = useState<File | null>(null);
    const [formData, setFormData] = useState(
        search.includes("create")
            ? {
                  name: "",
                  price: "",
                  type: "",
                  is_free: "",
                  currency_type: "",
                  valid_days: "",
                  cover_image: "",
                  svga_image: "",
              }
            : {
                  name: designStoreLocalStorage.name,
                  price: designStoreLocalStorage.price,
                  type: designStoreLocalStorage.type,
                  is_free:
                      designStoreLocalStorage.is_free === 0 ? "paid" : "free",
                  currency_type: designStoreLocalStorage.currency_type,
                  valid_days: designStoreLocalStorage.valid_days,
                  cover_image: designStoreLocalStorage.cover,
                  svga_image: designStoreLocalStorage.svga,
              }
    );
    const [formDataError, setFormDataError] = useState({
        nameError: "",
        priceError: "",
        typeError: "",
        is_freeError: "",
        currency_typeError: "",
        valid_daysError: "",
        cover_imageError: "",
        svga_imageError: "",
    });

    const {
        name,
        price,
        type,
        is_free,
        currency_type,
        valid_days,
        cover_image,
        svga_image,
    } = formData;

    const {
        cover_imageError,
        svga_imageError,
        currency_typeError,
        is_freeError,
        nameError,
        priceError,
        typeError,
        valid_daysError,
    } = formDataError;

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const designStore = useSelector((state: RootState) => state.designStore);

    // make sure when user in update or edit page the local storage designStore is not empty
    // if is empty navigate to previos page
    useEffect(() => {
        if (
            !localStorage.getItem("designStore") &&
            search.includes("updateStore")
        ) {
            navigate(-1);
        }
    }, [navigate, search, designStoreLocalStorage]);

    // when edit or create design store make sure navigate to /designStore
    useEffect(() => {
        const timer = setTimeout(() => {
            if (
                designStore.createDesignStoreData ||
                designStore.editDesignStoreData
            ) {
                dispatch(resetEditCreateDesignStore());
                navigate("/designStore");
            }
        }, 4000);

        return () => clearTimeout(timer);
    }, [
        designStore.createDesignStoreData,
        designStore.editDesignStoreData,
        dispatch,
        navigate,
    ]);

    // when change any value it will reflect to ui
    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormDataError({
            nameError: "",
            priceError: "",
            typeError: "",
            is_freeError: "",
            currency_typeError: "",
            valid_daysError: "",
            cover_imageError: "",
            svga_imageError: "",
        });

        if (e.target.type === "radio") {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.title]: e.target.value,
            }));
        } else if (e.target.type !== "file") {
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
        } else if (
            target &&
            target.id === "localSvgaImage" &&
            (target.files as FileList)
        ) {
            const file: File = (target.files as FileList)[0];
            setLocalSvgaImage(file);
        }
    };

    const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // make sure if the user click in button twice will create or edit only one design
        if (
            designStore.editDesignStoreLoading ||
            designStore.createDesignStoreLoading
        ) {
            return;
        }

        if (!cover_image && !localImage) {
            setFormDataError((prevState) => ({
                ...prevState,
                cover_imageError: "الرجاء ادخال صوره",
            }));
            return;
        } else if (!svga_image && !localSvgaImage) {
            setFormDataError((prevState) => ({
                ...prevState,
                svga_imageError: "الرجاء ادخال ملف svga",
            }));
            return;
        } else if (!name && name.trim().length === 0) {
            setFormDataError((prevState) => ({
                ...prevState,
                nameError: "الرجاء ملئ حقل الاسم",
            }));
            return;
        } else if (!price && price.trim().length === 0) {
            setFormDataError((prevState) => ({
                ...prevState,
                priceError: "الرجاء ملئ حقل السعر",
            }));
            return;
        } else if (!valid_days && valid_days.trim().length === 0) {
            setFormDataError((prevState) => ({
                ...prevState,
                valid_daysError: "الرجاء ملئ حقل ايام الصلاحيه",
            }));
            return;
        } else if (!type && type.trim().length === 0) {
            setFormDataError((prevState) => ({
                ...prevState,
                typeError: "الرجاء ملئ حقل النوع",
            }));
            return;
        } else if (!is_free && is_free.trim().length === 0) {
            setFormDataError((prevState) => ({
                ...prevState,
                is_freeError: "الرجاء ملئ حقل مجانى ام مدفوع",
            }));
            return;
        } else if (!currency_type && currency_type.trim().length === 0) {
            setFormDataError((prevState) => ({
                ...prevState,
                currency_typeError: "الرجاء ملئ حقل نوع العمله",
            }));
            return;
        }

        const SubmitedFormDate = new FormData();
        // create design store
        if (search.includes("create")) {
            SubmitedFormDate.append("name", name);
            // @ts-ignore
            SubmitedFormDate.append("price", +price);
            SubmitedFormDate.append("type", type);
            // @ts-ignore
            SubmitedFormDate.append("is_free", is_free === "paid" ? 0 : 1);
            SubmitedFormDate.append("currency_type", currency_type);
            // @ts-ignore
            SubmitedFormDate.append("valid_days", +valid_days);
            SubmitedFormDate.append("cover_image", localImage!);
            SubmitedFormDate.append("svga_image", localSvgaImage!);

            dispatch(
                createDesignsStore({
                    formData: SubmitedFormDate,
                    token: auth.loginData?.access_token!,
                })
            );
            // edit design store
        } else {
            // udpate the changes only
            const localStorageName = designStoreLocalStorage.name;
            const localStoragePrice = designStoreLocalStorage.price;
            const localStorageType = designStoreLocalStorage.type;
            const localStorageIs_free =
                designStoreLocalStorage.is_free === 0 ? "paid" : "free";
            const localStorageCurrency_type =
                designStoreLocalStorage.currency_type;
            const localStorageValid_days = designStoreLocalStorage.valid_days;

            localStorageName !== name && SubmitedFormDate.append("name", name);
            // @ts-ignore
            localStoragePrice !== price &&
                // @ts-ignore
                SubmitedFormDate.append("price", +price);
            localStorageType !== type && SubmitedFormDate.append("type", type);
            // @ts-ignore
            localStorageIs_free !== is_free &&
                // @ts-ignore
                SubmitedFormDate.append("is_free", is_free === "paid" ? 0 : 1);
            localStorageCurrency_type !== currency_type &&
                SubmitedFormDate.append("currency_type", currency_type);
            localStorageValid_days !== valid_days &&
                // @ts-ignore
                SubmitedFormDate.append("valid_days", +valid_days);
            localImage && SubmitedFormDate.append("cover_image", localImage!);
            localSvgaImage &&
                SubmitedFormDate.append("svga_image", localSvgaImage!);

            dispatch(
                editDesignsStore({
                    formData: SubmitedFormDate,
                    token: auth.loginData?.access_token!,
                    id: designStoreLocalStorage.id,
                })
            );
        }
    };

    return (
        <section className="container">
            <PagesHeaders small>
                {search.includes("create")
                    ? "إنشاء تصميم جديد"
                    : "تعديل التصميم"}
            </PagesHeaders>
            <form className="mt-5" onSubmit={submitFormHandler}>
                <div className="grid grid-col-1 sm:grid-cols-2 gap-10 items-center">
                    <ImageInput
                        cover_image={cover_image}
                        cover_imageError={cover_imageError}
                        localImage={localImage}
                        name={name}
                        onChange={onChange}
                    />
                    <SvgaInput
                        label="ملف svga"
                        onChange={onChange}
                        svga_imageError={svga_imageError}
                    />
                    <Input
                        htmlFor="name"
                        id="name"
                        name="name"
                        label="الأسم"
                        type="text"
                        onChange={onChange}
                        min={2}
                        max={255}
                        placeholder="*Name"
                        labelBgColor="bg-gradient-to-b from-lighterGray to-white"
                        value={name}
                        error={nameError}
                    />
                    <Input
                        htmlFor="price"
                        id="price"
                        name="price"
                        label="السعر"
                        type="number"
                        onChange={onChange}
                        placeholder="*Price"
                        labelBgColor="bg-gradient-to-b from-lighterGray to-white"
                        value={price}
                        error={priceError}
                    />
                    <Input
                        htmlFor="valid_days"
                        id="valid_days"
                        name="valid_days"
                        label="الايام الصالحه"
                        type="number"
                        onChange={onChange}
                        placeholder="*Valid days"
                        labelBgColor="bg-gradient-to-b from-lighterGray to-white"
                        value={valid_days}
                        error={valid_daysError}
                    />

                    <RadioInput
                        onChange={onChange}
                        title="type"
                        label="النوع"
                        ckeckedOne={type}
                        types={FILTER_TYPES}
                        typeError={typeError}
                    />
                    <RadioInput
                        onChange={onChange}
                        title="is_free"
                        label="مجانى ام مدفوع"
                        ckeckedOne={is_free}
                        types={FREE_OR_NOT}
                        typeError={is_freeError}
                    />
                    <RadioInput
                        onChange={onChange}
                        title="currency_type"
                        label="نوع العمله"
                        ckeckedOne={currency_type}
                        types={CURRENCY_TYPE}
                        typeError={currency_typeError}
                    />
                </div>
                <Button
                    editBtn={!search.includes("create")}
                    createBtn={search.includes("create")}
                    className="mx-auto mt-8"
                >
                    {designStore.editDesignStoreLoading ||
                    designStore.createDesignStoreLoading
                        ? "من فضلك انتظر ..."
                        : search.includes("create")
                        ? "إنشاء تصميم جديد"
                        : "تعديل التصميم"}
                </Button>
                <div className="flex justify-center mt-5">
                    {(designStore.editDesignStoreData ||
                        designStore.createDesignStoreData) && (
                        <span className="text-success font-semibold text-sm">
                            {search.includes("create")
                                ? "لقد تم عمل التصميم جديد"
                                : "لقد تم تعديل التصميم"}
                        </span>
                    )}
                </div>
            </form>
        </section>
    );
};

export default CreateEditStore;
