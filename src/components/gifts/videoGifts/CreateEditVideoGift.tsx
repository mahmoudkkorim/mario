import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
    createVideoGift,
    editVideoGift,
    resetEditCreateVideoGiftData,
    resetEditCreateVideoGiftError,
} from "../../../store/slices/gifts/videoGiftsSlice";

// components
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ImageInput from "../../ui/ImageInput";
import SvgaInput from "../../ui/SvgaInput";
import RadioInput from "../../ui/RadioInput";
import PagesHeaders from "../../ui/PagesHeaders";
import SearchInputVideoGenres from "../../ui/videoGiftInputs/SearchInputVideoGenres";
import SearchInpuVidoGifttByUId from "../../ui/videoGiftInputs/SearchInpuVidoGifttByUId";

// data
import { VIDO_GIFTS_TYPES } from "../../../data/filterTypes";

const CreateEditVideoGift = () => {
    const { search } = useLocation();
    const navigate = useNavigate();

    const videoGiftLocalStorage = JSON.parse(
        localStorage.getItem("videoGift") as string
    );

    const [localImage, setLocalImage] = useState<File | null>(null);
    const [localSvgaImage, setLocalSvgaImage] = useState<File | null>(null);
    const [formData, setFormData] = useState(
        search.includes("create")
            ? {
                  name: "",
                  price: "",
                  type: "",
                  video_gift_genere_id: "",
                  cover_image: "",
                  svga_image: "",
              }
            : {
                  name: videoGiftLocalStorage.name,
                  price: videoGiftLocalStorage.price,
                  type: videoGiftLocalStorage.type.toString(),
                  video_gift_genere_id:
                      videoGiftLocalStorage.video_gift_genere_id,
                  cover_image: videoGiftLocalStorage.cover,
                  svga_image: videoGiftLocalStorage.svga,
              }
    );

    const [extraFormData, setExtraFormData] = useState(
        search.includes("create")
            ? {
                  first_related_gift_id: "",
                  actualFirst_related_gift_id: "",
                  second_related_gift_id: "",
                  actualSecond_related_gift_id: "",
                  third_related_gift_id: "",
                  actualThird_related_gift_id: "",
                  surprise_gift_id: "",
                  actualSurprise_gift_id: "",
                  sending_counter: "",
              }
            : {
                  first_related_gift_id: videoGiftLocalStorage.related_gift_ids
                      ? videoGiftLocalStorage.related_gift_ids[0]
                      : "",
                  actualFirst_related_gift_id:
                      videoGiftLocalStorage.related_gift_ids
                          ? videoGiftLocalStorage.related_gift_ids[0]
                          : "",
                  second_related_gift_id: videoGiftLocalStorage.related_gift_ids
                      ? videoGiftLocalStorage.related_gift_ids[1]
                      : "",
                  actualSecond_related_gift_id:
                      videoGiftLocalStorage.related_gift_ids
                          ? videoGiftLocalStorage.related_gift_ids[1]
                          : "",
                  third_related_gift_id: videoGiftLocalStorage.related_gift_ids
                      ? videoGiftLocalStorage.related_gift_ids[2]
                      : "",
                  actualThird_related_gift_id:
                      videoGiftLocalStorage.related_gift_ids
                          ? videoGiftLocalStorage.related_gift_ids[2]
                          : "",
                  surprise_gift_id:
                      videoGiftLocalStorage.surprise_gift_id || "",
                  actualSurprise_gift_id:
                      videoGiftLocalStorage.surprise_gift_id || "",
                  sending_counter:
                      videoGiftLocalStorage.required_sending_counter || "",
              }
    );

    const [formDataError, setFormDataError] = useState({
        nameError: "",
        priceError: "",
        typeError: "",
        video_gift_genere_idError: "",
        cover_imageError: "",
        svga_imageError: "",
        first_related_gift_idError: "",
        second_related_gift_idError: "",
        third_related_gift_idError: "",
        surprise_gift_idError: "",
        sending_counterError: "",
    });

    const { cover_image, name, price, svga_image, type, video_gift_genere_id } =
        formData;

    const {
        actualFirst_related_gift_id,
        first_related_gift_id,
        second_related_gift_id,
        actualSecond_related_gift_id,
        third_related_gift_id,
        actualThird_related_gift_id,
        sending_counter,
        surprise_gift_id,
        actualSurprise_gift_id,
    } = extraFormData;

    const {
        cover_imageError,
        nameError,
        priceError,
        svga_imageError,
        typeError,
        video_gift_genere_idError,
        // extra
        first_related_gift_idError,
        second_related_gift_idError,
        third_related_gift_idError,
        surprise_gift_idError,
        sending_counterError,
    } = formDataError;

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const videoGifts = useSelector((state: RootState) => state.videoGifts);

    // make sure when user in update or edit page the local storage videoGift is not empty
    // if is empty navigate to previos page
    useEffect(() => {
        if (
            !localStorage.getItem("videoGift") &&
            search.includes("updateVideoGift")
        ) {
            navigate(-1);
        }
    }, [navigate, search, videoGiftLocalStorage]);

    // when edit or create video gift make sure navigate to /videoGifts
    useEffect(() => {
        const timer = setTimeout(() => {
            if (
                videoGifts.createVideoGiftData ||
                videoGifts.editVideoGiftData
            ) {
                dispatch(resetEditCreateVideoGiftData());
                navigate("/videoGifts");
            }
        }, 4000);

        return () => clearTimeout(timer);
    }, [
        videoGifts.createVideoGiftData,
        videoGifts.editVideoGiftData,
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
            video_gift_genere_idError: "",
            cover_imageError: "",
            svga_imageError: "",
            first_related_gift_idError: "",
            second_related_gift_idError: "",
            third_related_gift_idError: "",
            surprise_gift_idError: "",
            sending_counterError: "",
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

            setExtraFormData((prevState) => ({
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

    // bearor is transfare id to parent element
    const bearorVideoGenreIdHandler = (id: number) => {
        setFormData((prevState) => ({
            ...prevState,
            video_gift_genere_id: id.toString(),
        }));
    };

    // bearor is transfare id to parent element
    const bearorfirst_related_gift_idHandler = (id: number) => {
        setExtraFormData((prevState) => ({
            ...prevState,
            actualFirst_related_gift_id: id.toString(),
            first_related_gift_id: id.toString(),
        }));
    };

    // bearor is transfare id to parent element
    const bearorSecond_related_gift_idHandler = (id: number) => {
        setExtraFormData((prevState) => ({
            ...prevState,
            actualSecond_related_gift_id: id.toString(),
            second_related_gift_id: id.toString(),
        }));
    };

    // bearor is transfare id to parent element
    const bearorThird_related_gift_idHandler = (id: number) => {
        setExtraFormData((prevState) => ({
            ...prevState,
            actualThird_related_gift_id: id.toString(),
            third_related_gift_id: id.toString(),
        }));
    };

    // bearor is transfare id to parent element
    const bearorSurprise_gift_idHandler = (id: number) => {
        setExtraFormData((prevState) => ({
            ...prevState,
            actualSurprise_gift_id: id.toString(),
            surprise_gift_id: id.toString(),
        }));
    };

    const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // make sure if the user click in button twice will create or edit only one video gift
        if (
            videoGifts.editVideoGiftLoading ||
            videoGifts.createVideoGiftLoading
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
        } else if (
            !video_gift_genere_id &&
            video_gift_genere_id.trim().length === 0
        ) {
            setFormDataError((prevState) => ({
                ...prevState,
                video_gift_genere_idError:
                    "الرجاء ملئ حقل الرقم التعريفى لنوع هديه الفيديو",
            }));
            return;
        } else if (!type) {
            setFormDataError((prevState) => ({
                ...prevState,
                typeError: "الرجاء ملئ حقل نوع هديده الفيديو من الصندوق",
            }));
            return;
        }

        // extra check ==> when type = 1 Gifts multiplied
        if (type === "1") {
            if (!sending_counter && sending_counter.trim().length === 0) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    sending_counterError: "الرجاء ملئ حقل عداد المكسب",
                }));
                return;
            } else if (
                !actualFirst_related_gift_id &&
                actualFirst_related_gift_id.trim().length === 0
            ) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    first_related_gift_idError:
                        "الرجاء ملئ حقل الرقم التعريفى للهديه الاولى ذات صله من الصندوق",
                }));
                return;
            } else if (
                !actualSecond_related_gift_id &&
                actualSecond_related_gift_id.trim().length === 0
            ) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    second_related_gift_idError:
                        "الرجاء ملئ حقل الرقم التعريفى للهديه الثانيه ذات صله من الصندوق",
                }));
                return;
            } else if (
                !actualThird_related_gift_id &&
                actualThird_related_gift_id.trim().length === 0
            ) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    third_related_gift_idError:
                        "الرجاء ملئ حقل الرقم التعريفى للهديه الثانيه ذات صله من الصندوق",
                }));
                return;
            } else if (
                !actualSurprise_gift_id &&
                actualSurprise_gift_id.trim().length === 0
            ) {
                setFormDataError((prevState) => ({
                    ...prevState,
                    surprise_gift_idError:
                        "الرجاء ملئ حقل الرقم التعريفى لهديه المفاجئه من الصندوق",
                }));
                return;
            }
        }

        const SubmitedFormDate = new FormData();

        if (search.includes("create")) {
            SubmitedFormDate.append("name", name);
            SubmitedFormDate.append("price", price);
            SubmitedFormDate.append("type", type);
            SubmitedFormDate.append(
                "video_gift_genere_id",
                video_gift_genere_id
            );
            SubmitedFormDate.append("cover_image", localImage!);
            SubmitedFormDate.append("svga_image", localSvgaImage!);

            if (type === "1") {
                SubmitedFormDate.append(
                    "related_gift_ids[0]",
                    actualFirst_related_gift_id
                );
                SubmitedFormDate.append(
                    "related_gift_ids[1]",
                    actualSecond_related_gift_id
                );
                SubmitedFormDate.append(
                    "related_gift_ids[2]",
                    actualThird_related_gift_id
                );
                SubmitedFormDate.append(
                    "surprise_gift_id",
                    actualSurprise_gift_id
                );
                SubmitedFormDate.append("sending_counter", "0");
                SubmitedFormDate.append(
                    "required_sending_counter",
                    sending_counter
                );
            }
            // send create request
            dispatch(
                createVideoGift({
                    giftData: SubmitedFormDate,
                    token: auth.loginData?.access_token!,
                })
            );
        } else {
            // udpate the changes only
            const localStorageName = videoGiftLocalStorage.name;
            const localStoragePrice = videoGiftLocalStorage.price;
            const localStorageType = videoGiftLocalStorage.type;
            const localStorageVideo_gift_genere_id =
                videoGiftLocalStorage.video_gift_genere_id;

            localStorageName !== name && SubmitedFormDate.append("name", name);
            localStoragePrice !== +price &&
                // @ts-ignore
                SubmitedFormDate.append("price", +price);
            localStorageType !== type && SubmitedFormDate.append("type", type);
            localStorageVideo_gift_genere_id !== +video_gift_genere_id &&
                SubmitedFormDate.append(
                    "video_gift_genere_id",
                    video_gift_genere_id
                );
            localImage && SubmitedFormDate.append("cover_image", localImage!);
            localSvgaImage &&
                SubmitedFormDate.append("svga_image", localSvgaImage!);

            if (type === "1") {
                const localStorageFirst_related_gift_id =
                    videoGiftLocalStorage.related_gift_ids
                        ? videoGiftLocalStorage.related_gift_ids[0]
                        : "";
                const localStorageSecond_related_gift_id =
                    videoGiftLocalStorage.related_gift_ids
                        ? videoGiftLocalStorage.related_gift_ids[1]
                        : "";
                const localStorageThird_related_gift_id =
                    videoGiftLocalStorage.related_gift_ids
                        ? videoGiftLocalStorage.related_gift_ids[2]
                        : "";
                const localStorageSurprise_gift_id =
                    videoGiftLocalStorage.surprise_gift_id || "";
                const localStorageSending_counter =
                    videoGiftLocalStorage.required_sending_counter || "";

                localStorageFirst_related_gift_id !==
                    actualFirst_related_gift_id &&
                    SubmitedFormDate.append(
                        "related_gift_ids[0]",
                        actualFirst_related_gift_id
                    );

                localStorageSecond_related_gift_id !==
                    actualSecond_related_gift_id &&
                    SubmitedFormDate.append(
                        "related_gift_ids[1]",
                        actualSecond_related_gift_id
                    );

                localStorageThird_related_gift_id !==
                    actualThird_related_gift_id &&
                    SubmitedFormDate.append(
                        "related_gift_ids[2]",
                        actualThird_related_gift_id
                    );

                localStorageSurprise_gift_id !== actualSurprise_gift_id &&
                    SubmitedFormDate.append(
                        "surprise_gift_id",
                        actualSurprise_gift_id
                    );

                videoGiftLocalStorage.sending_counter !== 0 &&
                    SubmitedFormDate.append("sending_counter", "0");
                localStorageSending_counter !== +sending_counter &&
                    SubmitedFormDate.append(
                        "required_sending_counter",
                        sending_counter
                    );
            }
            // send edit request
            dispatch(
                editVideoGift({
                    giftData: SubmitedFormDate,
                    token: auth.loginData?.access_token!,
                    gift_id: videoGiftLocalStorage.id,
                })
            );
        }
    };

    return (
        <section className='container'>
            <PagesHeaders small>
                {search.includes("create")
                    ? "إنشاء هديه فيديو جديد"
                    : "تعديل هديه فيديو"}
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
                    <SvgaInput
                        label='ملف svga'
                        onChange={onChange}
                        svga_imageError={svga_imageError}
                    />
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
                    <div className='relative'>
                        <SearchInputVideoGenres
                            htmlFor='video_gift_genere_id'
                            id='video_gift_genere_id'
                            label='الرقم التعريفى لنوع هديه الفيديو'
                            name='video_gift_genere_id'
                            onChange={onChange}
                            value={video_gift_genere_id}
                            placeholder='*Video Gift Genere Id'
                            required
                            type='number'
                            bearorIdFun={bearorVideoGenreIdHandler}
                            labelBgColor='bg-gradient-to-b from-lighterGray to-white'
                            error={video_gift_genere_idError}
                        />
                    </div>
                    <RadioInput
                        onChange={onChange}
                        title='type'
                        label='نوع الهديه'
                        ckeckedOne={type}
                        types={VIDO_GIFTS_TYPES}
                        typeError={typeError}
                    />

                    {/* if type is 1 (box gift) => show the extra inputs */}
                    {type === "1" ? (
                        <>
                            <Input
                                htmlFor='sending_counter'
                                id='sending_counter'
                                name='sending_counter'
                                label='عداد المكسب'
                                type='number'
                                onChange={onChange}
                                placeholder='*Sending Counter'
                                labelBgColor='bg-gradient-to-b from-lighterGray to-white'
                                value={sending_counter}
                                error={sending_counterError}
                            />
                            <div className='relative'>
                                <SearchInpuVidoGifttByUId
                                    htmlFor='first_related_gift_id'
                                    id='first_related_gift_id'
                                    label='الرقم التعريفى للهديه الاولى ذات صله'
                                    name='first_related_gift_id'
                                    onChange={onChange}
                                    value={first_related_gift_id}
                                    title={actualFirst_related_gift_id}
                                    placeholder='*First Related Gift id'
                                    required
                                    type='number'
                                    bearorIdFun={
                                        bearorfirst_related_gift_idHandler
                                    }
                                    labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                                    error={first_related_gift_idError}
                                />
                            </div>
                            <div className='relative'>
                                <SearchInpuVidoGifttByUId
                                    htmlFor='second_related_gift_id'
                                    id='second_related_gift_id'
                                    label='الرقم التعريفى للهديه الثانيه ذات صله'
                                    name='second_related_gift_id'
                                    onChange={onChange}
                                    value={second_related_gift_id}
                                    title={actualSecond_related_gift_id}
                                    placeholder='*Second Related Gift id'
                                    required
                                    type='number'
                                    bearorIdFun={
                                        bearorSecond_related_gift_idHandler
                                    }
                                    labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                                    error={second_related_gift_idError}
                                />
                            </div>
                            <div className='relative'>
                                <SearchInpuVidoGifttByUId
                                    htmlFor='third_related_gift_id'
                                    id='third_related_gift_id'
                                    label='الرقم التعريفى للهديه الثالثه ذات صله'
                                    name='third_related_gift_id'
                                    onChange={onChange}
                                    value={third_related_gift_id}
                                    title={actualThird_related_gift_id}
                                    placeholder='*Third Related Gift id'
                                    required
                                    type='number'
                                    bearorIdFun={
                                        bearorThird_related_gift_idHandler
                                    }
                                    labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                                    error={third_related_gift_idError}
                                />
                            </div>
                            <div className='relative'>
                                <SearchInpuVidoGifttByUId
                                    htmlFor='surprise_gift_id'
                                    id='surprise_gift_id'
                                    label='الرقم التعريفى لهديه المفاجئه'
                                    name='surprise_gift_id'
                                    onChange={onChange}
                                    value={surprise_gift_id}
                                    title={actualSurprise_gift_id}
                                    placeholder='*Third Related Gift id'
                                    required
                                    type='number'
                                    bearorIdFun={bearorSurprise_gift_idHandler}
                                    labelBgColor='bg-gradient-to-b from-grayWhite to-white'
                                    error={surprise_gift_idError}
                                />
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>

                <Button
                    editBtn={!search.includes("create")}
                    createBtn={search.includes("create")}
                    className='mx-auto mt-8'
                >
                    {videoGifts.editVideoGiftLoading ||
                    videoGifts.createVideoGiftLoading
                        ? "من فضلك انتظر ..."
                        : search.includes("create")
                        ? "إنشاء هديه فيديو جديده"
                        : "تعديل هديه الفيديو"}
                </Button>

                <div className='flex justify-center mt-5'>
                    {(videoGifts.editVideoGiftData ||
                        videoGifts.createVideoGiftData) && (
                        <span className='text-success font-semibold text-sm'>
                            {search.includes("create")
                                ? videoGifts.createVideoGiftData.msg ||
                                  "لقد تم عمل هديه فيديو جديده"
                                : videoGifts.editVideoGiftData.msg ||
                                  "لقد تم تعديل هديه الفيديو"}
                        </span>
                    )}
                    {(videoGifts.editVideoGiftError ||
                        videoGifts.createVideoGiftError) && (
                        <span className='text-success font-semibold text-sm'>
                            {search.includes("create")
                                ? videoGifts.createVideoGiftError
                                    ? videoGifts.createVideoGiftError.msg
                                    : "فشل عمل هديه فيديو جديده"
                                : videoGifts.editVideoGiftError
                                ? videoGifts.editVideoGiftError.msg
                                : "فشل تعديل هديه الفيديو"}
                        </span>
                    )}
                </div>
            </form>
        </section>
    );
};

export default CreateEditVideoGift;
