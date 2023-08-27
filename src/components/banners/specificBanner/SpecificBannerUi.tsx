import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// interfaces
import { SingleBanner } from "../../../interfaces/pages/banners";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { deleteBanner } from "../../../store/slices/bannersSlice";

// helpers
import CreatedAt from "../../helpers/CreatedAt";

// icons
import { IoDiamondSharp } from "react-icons/io5";

// components
import Message from "../../ui/Message";
import ConfirmDelete from "../../models/ConfirmDelete";
import Backdrop from "../../models/Backdrop";
import SpecificItem from "../../ui/SpecificItem";

const SpecificBannerUi = (props: SingleBanner) => {
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [hideDeleteModel, setHideDeleteModel] = useState({
        type: false,
        text: "",
    });

    const {
        cover,
        created_at,
        id,
        related_to_id,
        related_to_type,
        updated_at,
        valid_to,
    } = props;

    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const banners = useSelector((state: RootState) => state.banners);

    useEffect(() => {
        if (hideDeleteModel.type && !banners.deleteBannerLoading) {
            setHideDeleteModel({ type: true, text: "لقد تم مسح البانر" });
            setShowDeleteModel(false);
        }
    }, [hideDeleteModel.type, banners.deleteBannerLoading]);

    // store banner data into local storage to not make an req to get the data again from server and to compare the inputs to know what the exactly input has been changed
    const storeBannerInLocalStorageHandler = () => {
        localStorage.setItem("banner", JSON.stringify(props));
    };

    // this function handle showing delete model
    const deleteBannerHandler = () => {
        setShowDeleteModel((prevState) => !prevState);
    };

    // confirm delete => if the fun return true means delete diamond, if it false just close the model
    const confirmDeleteHandler = (isDeleteBanner: boolean) => {
        if (isDeleteBanner) {
            // delete banner
            dispatch(
                deleteBanner({
                    banner_id: params.id!,
                    token: auth.loginData?.access_token!,
                })
            );
            setHideDeleteModel((prevState) => ({ ...prevState, type: true }));
        } else {
            // close the model
            deleteBannerHandler();
        }
    };

    return (
        <>
            {hideDeleteModel.text.length > 0 ? (
                <Message>{hideDeleteModel.text}</Message>
            ) : (
                <SpecificItem
                    title={`${id}`}
                    subTitle={`${id}`}
                    deleteText='حذف البانر'
                    delteItem={deleteBannerHandler}
                    editText='تعديل البانر'
                    StoreItemInLocaStorage={storeBannerInLocalStorageHandler}
                    imgSrc={cover}
                    imgAlt={`${id}`}
                    editLink={`/banners?updateBanner=true&id=${params.id}`}
                >
                    <>
                        <div className='flex gap-5 flex-col-reverse'>
                            <div className='flex bg-darkRed p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150'>
                                <span className='capitalize'>
                                    تنتهى صلاحيته فى
                                </span>
                                <span className=''>
                                    <CreatedAt createdAt={valid_to} />
                                </span>
                            </div>
                        </div>
                        {created_at && (
                            <div className='flex bg-success p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150'>
                                <span>تم إنشاؤه في</span>
                                <span className='tracking-tighter'>
                                    <CreatedAt createdAt={created_at} />
                                </span>
                            </div>
                        )}
                        {updated_at && (
                            <div className='flex bg-stars p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150'>
                                <span>تم تعديله في</span>
                                <span className='tracking-tighter'>
                                    <CreatedAt createdAt={updated_at} />
                                </span>
                            </div>
                        )}
                    </>
                </SpecificItem>
            )}
            {showDeleteModel && <Backdrop onClose={deleteBannerHandler} />}
            <ConfirmDelete
                deleteBtnContent={
                    banners.deleteBannerLoading ? "الرجاء الانتظار..." : "أحذف"
                }
                showDeleteModel={showDeleteModel}
                confirmDeleteHandler={confirmDeleteHandler}
                header={` هل انت متاكد من حذف البانر ذو`}
                element={`الرقم ${id}`}
                text='عند حذفك لهذا البانر لايمكنك استرجاعه مره اخرى هل انت متاكد من انك تريد حذفه'
            />
        </>
    );
};

export default SpecificBannerUi;
