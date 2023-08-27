import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
    createDiamondPackage,
    editDiamondPackage,
    resetEditCreateDiamond,
} from "../../store/slices/diamondSlice";

// component
import Input from "../ui/Input";
import Button from "../ui/Button";
import ImageInput from "../ui/ImageInput";
import PagesHeaders from "../ui/PagesHeaders";

const CreateEditDiamond = () => {
    const { search } = useLocation();
    const navigate = useNavigate();

    const diamondLocalStorage = JSON.parse(
        localStorage.getItem("diamond") as string
    );

    // states
    const [localImage, setLocalImage] = useState<File | null>(null);
    const [formData, setFormData] = useState(
        search.includes("create")
            ? {
                  quantity: "",
                  price: "",
                  cover_image: "",
              }
            : {
                  quantity: diamondLocalStorage.quantity,
                  price: diamondLocalStorage.price,
                  cover_image: diamondLocalStorage.cover,
              }
    );
    const [formDataError, setFormDataError] = useState({
        quantityError: "",
        priceError: "",
        cover_imageError: "",
    });

    const { cover_image, price, quantity } = formData;
    const { cover_imageError, priceError, quantityError } = formDataError;

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const diamond = useSelector((state: RootState) => state.diamond);

    // make sure when user in update or edit page the local storage diamond is not empty
    // if is empty navigate to previos page
    useEffect(() => {
        if (
            !localStorage.getItem("diamond") &&
            search.includes("updateDiamond")
        ) {
            navigate(-1);
        }
    }, [navigate, search, diamondLocalStorage]);

    // when edit or create diamond make sure navigate to /diamond
    useEffect(() => {
        const timer = setTimeout(() => {
            if (
                diamond.createDiamondPackageData ||
                diamond.editDiamondPackageData
            ) {
                dispatch(resetEditCreateDiamond());
                navigate("/diamond");
            }
        }, 4000);

        return () => clearTimeout(timer);
    }, [
        diamond.createDiamondPackageData,
        diamond.editDiamondPackageData,
        dispatch,
        navigate,
    ]);

    // when change any value it will reflect to ui
    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormDataError({
            quantityError: "",
            priceError: "",
            cover_imageError: "",
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

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();

        // make sure if the user click in button twice will create or edit only one diamond
        if (
            diamond.editDiamondPackageLoading ||
            diamond.createDiamondPackageLoading
        ) {
            return;
        }

        if (!cover_image && !localImage) {
            setFormDataError((prevState) => ({
                ...prevState,
                cover_imageError: "الرجاء ادخال صوره",
            }));
            return;
        } else if (!price && price.trim().length === 0) {
            setFormDataError((prevState) => ({
                ...prevState,
                priceError: "الرجاء ملئ حقل السعر",
            }));
            return;
        } else if (!quantity && quantity.trim().length === 0) {
            setFormDataError((prevState) => ({
                ...prevState,
                nameError: "الرجاء ملئ حقل الكميه",
            }));
            return;
        }

        const SubmitedFormDate = new FormData();
        // create diamond
        if (search.includes("create")) {
            // @ts-ignore
            SubmitedFormDate.append("price", +price);
            // @ts-ignore
            SubmitedFormDate.append("quantity", +quantity);
            SubmitedFormDate.append("cover_image", localImage!);

            dispatch(
                createDiamondPackage({
                    formData: SubmitedFormDate,
                    token: auth.loginData?.access_token!,
                })
            );
            // edit gift
        } else {
            // udpate the changes only
            const localStorageQuantity = diamondLocalStorage.quantity;
            const localStoragePrice = diamondLocalStorage.price;

            // @ts-ignore
            localStorageQuantity !== quantity &&
                // @ts-ignore
                SubmitedFormDate.append("quantity", +quantity);
            // @ts-ignore
            localStoragePrice !== price &&
                // @ts-ignore
                SubmitedFormDate.append("price", +price);
            localImage && SubmitedFormDate.append("cover_image", localImage!);

            dispatch(
                editDiamondPackage({
                    formData: SubmitedFormDate,
                    token: auth.loginData?.access_token!,
                    diamond_id: diamondLocalStorage.id,
                })
            );
        }
    };

    return (
        <section className="container">
            <PagesHeaders small>
                {search.includes("create")
                    ? "إنشاء ماسه جديده"
                    : "تعديل الماسه"}
            </PagesHeaders>
            <form className="mt-5" onSubmit={submitFormHandler}>
                <div className="grid grid-col-1 sm:grid-cols-2 gap-10 items-center">
                    <ImageInput
                        cover_image={cover_image}
                        cover_imageError={cover_imageError}
                        localImage={localImage}
                        name={`dummy_image`}
                        onChange={onChange}
                    />
                    <div className="hidden sm:block"></div>
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
                        htmlFor="quantity"
                        id="quantity"
                        name="quantity"
                        label="الكميه"
                        type="number"
                        onChange={onChange}
                        placeholder="*Quantity"
                        labelBgColor="bg-gradient-to-b from-lighterGray to-white"
                        value={quantity}
                        error={quantityError}
                    />
                </div>
                <Button
                    editBtn={!search.includes("create")}
                    createBtn={search.includes("create")}
                    className="mx-auto mt-8"
                >
                    {diamond.editDiamondPackageLoading ||
                    diamond.createDiamondPackageLoading
                        ? "من فضلك انتظر ..."
                        : search.includes("create")
                        ? "إنشاء ماسه جديد"
                        : "تعديل الماسه"}
                </Button>
                <div className="flex justify-center mt-5">
                    {(diamond.editDiamondPackageData ||
                        diamond.createDiamondPackageData) && (
                        <span className="text-success font-semibold text-sm">
                            {search.includes("create")
                                ? "لقد تم عمل ماسه جديده"
                                : "لقد تم تعديل الماسه"}
                        </span>
                    )}
                </div>
            </form>
        </section>
    );
};

export default CreateEditDiamond;
