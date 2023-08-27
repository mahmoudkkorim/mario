import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
    createRoom,
    editRoom,
    resetEditCreateRoom,
} from "../../store/slices/roomsSlice";

// components
import PagesHeaders from "../ui/PagesHeaders";
import ImageInput from "../ui/ImageInput";
import Input from "../ui/Input";
import RadioInput from "../ui/RadioInput";
import Button from "../ui/Button";

// data
import { ISFREE_TYPE } from "../../data/filterTypes";

const CreateEditRoom = () => {
    const { search } = useLocation();
    const navigate = useNavigate();

    const roomLocalStorage = JSON.parse(
        localStorage.getItem("rooms") as string
    );

    // states
    const [localImage, setLocalImage] = useState<File | null>(null);
    const [formData, setFormData] = useState(
        search.includes("create")
            ? {
                  name: "",
                  price: "",
                  cover_image: "",
                  is_free: "",
              }
            : {
                  name: roomLocalStorage.name,
                  price:
                      roomLocalStorage.price === null
                          ? 0
                          : roomLocalStorage.price,
                  cover_image: roomLocalStorage.path,
                  is_free: roomLocalStorage.is_free.toString(),
              }
    );
    const [formDataError, setFormDataError] = useState({
        nameError: "",
        priceError: "",
        cover_imageError: "",
        is_freeError: "",
    });

    const { name, price, cover_image, is_free } = formData;
    const { cover_imageError, is_freeError, nameError, priceError } =
        formDataError;

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const rooms = useSelector((state: RootState) => state.rooms);

    // make sure when user in update or edit page the local storage rooms is not empty
    // if is empty navigate to previos page
    useEffect(() => {
        if (
            !localStorage.getItem("rooms") &&
            search.includes("updateRoom-background")
        ) {
            navigate(-1);
        }
    }, [navigate, search, roomLocalStorage]);

    // when edit or create room make sure navigate to /room-backgrounds
    useEffect(() => {
        const timer = setTimeout(() => {
            if (rooms.createRoomData || rooms.editRoomData) {
                dispatch(resetEditCreateRoom());
                navigate("/room-backgrounds");
            }
        }, 4000);

        return () => clearTimeout(timer);
    }, [rooms.createRoomData, rooms.editRoomData, dispatch, navigate]);

    // when change any value it will reflect to ui
    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormDataError({
            nameError: "",
            priceError: "",
            cover_imageError: "",
            is_freeError: "",
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
        }
    };

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();

        // make sure if the user click in button twice will create or edit only one room
        if (rooms.editRoomLoading || rooms.createRoomLoading) {
            return;
        }

        if (!cover_image && !localImage) {
            setFormDataError((prevState) => ({
                ...prevState,
                cover_imageError: "الرجاء ادخال صوره",
            }));
            return;
        } else if (!name && name.trim().length === 0) {
            setFormDataError((prevState) => ({
                ...prevState,
                nameError: "الرجاء ملئ حقل الاسم",
            }));
            return;
        } else if (!is_free) {
            setFormDataError((prevState) => ({
                ...prevState,
                is_freeError:
                    "الرجاء الاختيار اذا  ما كانت خلفيه الغرفه مجانيه ام لا",
            }));
            return;
        }
        // if room background is not free make sure to check for the price
        if (is_free && is_free === "1") {
            if (!price && price.trim().length === 0) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    priceError: "الرجاء ملئ حقل السعر",
                }));
                return;
            }
        }

        const SubmitedFormDate = new FormData();
        // create room background
        if (search.includes("create")) {
            SubmitedFormDate.append("cover_image", localImage!);
            SubmitedFormDate.append("name", name);
            // @ts-ignore
            SubmitedFormDate.append("is_free", +is_free);
            if (is_free === "1") {
                // @ts-ignore
                SubmitedFormDate.append("price", +price);
            } else {
                SubmitedFormDate.append("price", `${0}`);
            }

            dispatch(
                createRoom({
                    formData: SubmitedFormDate,
                    token: auth.loginData?.access_token!,
                })
            );
            // edit room background
        } else {
            // udpate the changes only
            const localStorageName = roomLocalStorage.name;
            const localStoragePrice = roomLocalStorage.price;
            const localStorageIs_free = roomLocalStorage.is_free;

            localImage && SubmitedFormDate.append("cover_image", localImage!);
            localStorageName !== name && SubmitedFormDate.append("name", name);
            // @ts-ignore
            localStorageIs_free !== is_free &&
                // @ts-ignore
                SubmitedFormDate.append("is_free", +is_free);

            if (localStorageIs_free.toString() !== is_free) {
                if (is_free === "1") {
                    localStoragePrice !== price &&
                        // @ts-ignore
                        SubmitedFormDate.append("price", +price);
                } else {
                    SubmitedFormDate.append("price", `${0}`);
                }
            }

            dispatch(
                editRoom({
                    formData: SubmitedFormDate,
                    token: auth.loginData?.access_token!,
                    room_id: roomLocalStorage.id,
                })
            );
        }
    };

    return (
        <section className='container'>
            <PagesHeaders small>
                {search.includes("create")
                    ? "إنشاء خلفيه غرفه جديده"
                    : "تعديل خلفيه غرفه"}
            </PagesHeaders>
            <form className='mt-5' onSubmit={submitFormHandler}>
                <div className='grid grid-col-1 sm:grid-cols-2 gap-10 items-center'>
                    <ImageInput
                        cover_image={cover_image}
                        cover_imageError={cover_imageError}
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
                        max={255}
                        placeholder='*Name'
                        labelBgColor='bg-gradient-to-b from-lighterGray to-white'
                        value={name}
                        error={nameError}
                    />
                    <RadioInput
                        onChange={onChange}
                        title='is_free'
                        label='الخلفيه مجانيه ام غير مجانيه'
                        ckeckedOne={is_free}
                        types={ISFREE_TYPE}
                        typeError={is_freeError}
                    />
                    {is_free === "1" && (
                        <Input
                            htmlFor='price'
                            id='price'
                            name='price'
                            label='السعر'
                            type='number'
                            onChange={onChange}
                            placeholder='*Price'
                            labelBgColor='bg-gradient-to-b from-lighterGray to-white'
                            value={price}
                            error={priceError}
                        />
                    )}
                </div>
                <Button
                    editBtn={!search.includes("create")}
                    createBtn={search.includes("create")}
                    className='mx-auto mt-8'
                >
                    {rooms.editRoomLoading || rooms.createRoomLoading
                        ? "من فضلك انتظر ..."
                        : search.includes("create")
                        ? "إنشاء خلفيه غرفه جديده"
                        : "تعديل خلفيه الغرفه"}
                </Button>
                <div className='flex justify-center mt-5'>
                    {(rooms.editRoomData || rooms.createRoomData) && (
                        <span className='text-success font-semibold text-sm'>
                            {search.includes("create")
                                ? rooms.createRoomData.msg ||
                                  "لقد تم عمل خلفيه غرفه جديده"
                                : rooms.editRoomData.msg ||
                                  "لقد تم تعديل خلفيه الغرفه"}
                        </span>
                    )}
                    {(rooms.editRoomError || rooms.createRoomError) && (
                        <span className='text-success font-semibold text-sm'>
                            {search.includes("create")
                                ? rooms.createRoomError.msg ||
                                  "فشل عمل خلفيه غرفه جديده"
                                : rooms.editRoomError.msg ||
                                  "فشل تعديل خلفيه الغرفه"}
                        </span>
                    )}
                </div>
            </form>
        </section>
    );
};

export default CreateEditRoom;
