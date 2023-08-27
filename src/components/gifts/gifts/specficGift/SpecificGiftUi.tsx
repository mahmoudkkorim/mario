import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// interfaces
import { SingleGift } from "../../../../interfaces/pages/gifts/gifts";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { deleteGift } from "../../../../store/slices/gifts/giftsSlice";

// helpers
import CreatedAt from "../../../helpers/CreatedAt";

// icons
import { IoDiamondSharp } from "react-icons/io5";

// components
import Message from "../../../ui/Message";
import ConfirmDelete from "../../../models/ConfirmDelete";
import Backdrop from "../../../models/Backdrop";
import SpecificItem from "../../../ui/SpecificItem";

const SpecificGiftUi = (props: SingleGift) => {
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [hideDeleteModel, setHideDeleteModel] = useState({
        type: false,
        text: "",
    });

    const { cover, created_at, id, name, price, svga, type, updated_at } =
        props;

    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const gifts = useSelector((state: RootState) => state.gifts);

    useEffect(() => {
        if (hideDeleteModel.type && !gifts.deleteGiftLoading) {
            setHideDeleteModel({ type: true, text: "لقد تم مسح الهديه" });
            setShowDeleteModel(false);
        }
    }, [hideDeleteModel.type, gifts.deleteGiftLoading]);

    // store gift data into local storage to not make an req to get the data again from server and to compare the inputs to know what the exactly input has been changed
    const storeGiftInLocalStorageHandler = () => {
        localStorage.setItem("gift", JSON.stringify(props));
    };

    // this function handle showing delete model
    const deleteGiftHandler = () => {
        setShowDeleteModel((prevState) => !prevState);
    };

    // confirm delete => if the fun return true means delete gift, if it false just close the model
    const confirmDeleteHandler = (deleteDesign: boolean) => {
        if (deleteDesign) {
            // delete gift
            dispatch(
                deleteGift({
                    gift_id: params.id!,
                    token: auth.loginData?.access_token!,
                })
            );
            setHideDeleteModel((prevState) => ({ ...prevState, type: true }));
        } else {
            // close the model
            deleteGiftHandler();
        }
    };

    return (
        <>
            {hideDeleteModel.text.length > 0 ? (
                <Message>{hideDeleteModel.text}</Message>
            ) : (
                <SpecificItem
                    title={name}
                    subTitle={type}
                    deleteText="حذف الهديه"
                    delteItem={deleteGiftHandler}
                    editText="تعديل الهديه"
                    StoreItemInLocaStorage={storeGiftInLocalStorageHandler}
                    imgSrc={cover}
                    imgAlt={name}
                    editLink={`/gifts?updateGift=true&id=${params.id}`}
                >
                    <>
                        <div className="flex gap-5 flex-col-reverse">
                            {price > 0 ? (
                                <div className="flex bg-stars p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150">
                                    <IoDiamondSharp />
                                    <span className="">{price}</span>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="flex justify-start items-center gap-2">
                            <span>تم إنشاؤه في</span>
                            <span className="tracking-tighter">
                                <CreatedAt createdAt={created_at} />
                            </span>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                            <span>تم تعديله في</span>
                            <span className="tracking-tighter">
                                <CreatedAt createdAt={updated_at} />
                            </span>
                        </div>
                    </>
                </SpecificItem>
            )}
            {showDeleteModel && <Backdrop onClose={deleteGiftHandler} />}
            <ConfirmDelete
                deleteBtnContent={
                    gifts.deleteGiftLoading ? "الرجاء الانتظار..." : "أحذف"
                }
                showDeleteModel={showDeleteModel}
                confirmDeleteHandler={confirmDeleteHandler}
                header={`هل انت متاكد من حذف`}
                element={name}
                text="عند حذفك لهذه الهديه لايمكنك استرجاعها مره اخرى هل انت متاكد من انك تريد حذفه"
            />
        </>
    );
};

export default SpecificGiftUi;
