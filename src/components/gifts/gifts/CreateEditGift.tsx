import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// component
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ImageInput from "../../ui/ImageInput";
import PagesHeaders from "../../ui/PagesHeaders";
import SvgaInput from "../../ui/SvgaInput";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
    createGift,
    editGift,
    resetEditCreateGift,
} from "../../../store/slices/gifts/giftsSlice";

const CreateEditGift = () => {
    const { search } = useLocation();
    const navigate = useNavigate();

    const giftLocalStorage = JSON.parse(localStorage.getItem("gift") as string);

    // states
    const [localImage, setLocalImage] = useState<File | null>(null);
    const [localSvgaImage, setLocalSvgaImage] = useState<File | null>(null);
    const [formData, setFormData] = useState(
        search.includes("create")
            ? {
                  name: "",
                  price: "",
                  cover_image: "",
                  svga_image: "",
              }
            : {
                  name: giftLocalStorage.name,
                  price: giftLocalStorage.price,
                  cover_image: giftLocalStorage.cover,
                  svga_image: giftLocalStorage.svga,
              }
    );
    const [formDataError, setFormDataError] = useState({
        nameError: "",
        priceError: "",
        cover_imageError: "",
        svga_imageError: "",
    });

    const { name, price, cover_image, svga_image } = formData;
    const { cover_imageError, svga_imageError, nameError, priceError } =
        formDataError;

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const gifts = useSelector((state: RootState) => state.gifts);

    // make sure when user in update or edit page the local storage gift is not empty
    // if is empty navigate to previos page
    useEffect(() => {
        if (!localStorage.getItem("gift") && search.includes("updategift")) {
            navigate(-1);
        }
    }, [navigate, search, giftLocalStorage]);

    // when edit or create gift make sure navigate to /gift
    useEffect(() => {
        const timer = setTimeout(() => {
            if (gifts.createGiftData || gifts.editGiftData) {
                dispatch(resetEditCreateGift());
                navigate("/gifts");
            }
        }, 4000);

        return () => clearTimeout(timer);
    }, [gifts.createGiftData, gifts.editGiftData, dispatch, navigate]);

    // when change any value it will reflect to ui
    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormDataError({
            nameError: "",
            priceError: "",
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

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();

        // make sure if the user click in button twice will create or edit only one gift
        if (gifts.editGiftLoading || gifts.createGiftLoading) {
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
        }

        const SubmitedFormDate = new FormData();
        // create gift
        if (search.includes("create")) {
            SubmitedFormDate.append("name", name);
            // @ts-ignore
            SubmitedFormDate.append("price", +price);
            SubmitedFormDate.append("cover_image", localImage!);
            SubmitedFormDate.append("svga_image", localSvgaImage!);

            dispatch(
                createGift({
                    giftData: SubmitedFormDate,
                    token: auth.loginData?.access_token!,
                })
            );
            // edit gift
        } else {
            // udpate the changes only
            const localStorageName = giftLocalStorage.name;
            const localStoragePrice = giftLocalStorage.price;

            localStorageName !== name && SubmitedFormDate.append("name", name);
            // @ts-ignore
            localStoragePrice !== price &&
                // @ts-ignore
                SubmitedFormDate.append("price", +price);
            localImage && SubmitedFormDate.append("cover_image", localImage!);
            localSvgaImage &&
                SubmitedFormDate.append("svga_image", localSvgaImage!);

            dispatch(
                editGift({
                    giftData: SubmitedFormDate,
                    token: auth.loginData?.access_token!,
                    gift_id: giftLocalStorage.id,
                })
            );
        }
    };

    return (
        <section className="container">
            <PagesHeaders small>
                {search.includes("create")
                    ? "إنشاء هديه جديده"
                    : "تعديل الهديه"}
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
                </div>
                <Button
                    editBtn={!search.includes("create")}
                    createBtn={search.includes("create")}
                    className="mx-auto mt-8"
                >
                    {gifts.editGiftLoading || gifts.createGiftLoading
                        ? "من فضلك انتظر ..."
                        : search.includes("create")
                        ? "إنشاء هديه جديد"
                        : "تعديل الهديه"}
                </Button>
                <div className="flex justify-center mt-5">
                    {(gifts.editGiftData || gifts.createGiftData) && (
                        <span className="text-success font-semibold text-sm">
                            {search.includes("create")
                                ? "لقد تم عمل هديه جديده"
                                : "لقد تم تعديل الهديه"}
                        </span>
                    )}
                </div>
            </form>
        </section>
    );
};

export default CreateEditGift;
