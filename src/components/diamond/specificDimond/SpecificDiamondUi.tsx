import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// interfaces
import { SingleDiamond } from "../../../interfaces/pages/diamond";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { deleteDiamondPackage } from "../../../store/slices/diamondSlice";

// helpers
import CreatedAt from "../../helpers/CreatedAt";

// icons
import { IoDiamondSharp } from "react-icons/io5";

// components
import Message from "../../ui/Message";
import ConfirmDelete from "../../models/ConfirmDelete";
import Backdrop from "../../models/Backdrop";
import SpecificItem from "../../ui/SpecificItem";

const SpecificDiamondUi = (props: SingleDiamond) => {
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [hideDeleteModel, setHideDeleteModel] = useState({
        type: false,
        text: "",
    });

    const { cover, created_at, id, price, quantity, updated_at } = props;

    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const diamond = useSelector((state: RootState) => state.diamond);

    useEffect(() => {
        if (hideDeleteModel.type && !diamond.deleteDiamondPackageLoading) {
            setHideDeleteModel({ type: true, text: "لقد تم مسح الماسه" });
            setShowDeleteModel(false);
        }
    }, [hideDeleteModel.type, diamond.deleteDiamondPackageLoading]);

    // store diamond data into local storage to not make an req to get the data again from server and to compare the inputs to know what the exactly input has been changed
    const storeDiamondInLocalStorageHandler = () => {
        localStorage.setItem("diamond", JSON.stringify(props));
    };

    // this function handle showing delete model
    const deleteDiamondHandler = () => {
        setShowDeleteModel((prevState) => !prevState);
    };

    // confirm delete => if the fun return true means delete diamond, if it false just close the model
    const confirmDeleteHandler = (deleteDiamond: boolean) => {
        if (deleteDiamond) {
            // delete diamond
            dispatch(
                deleteDiamondPackage({
                    diamond_id: params.id!,
                    token: auth.loginData?.access_token!,
                })
            );
            setHideDeleteModel((prevState) => ({ ...prevState, type: true }));
        } else {
            // close the model
            deleteDiamondHandler();
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
                    deleteText="حذف الماسه"
                    delteItem={deleteDiamondHandler}
                    editText="تعديل الماسه"
                    StoreItemInLocaStorage={storeDiamondInLocalStorageHandler}
                    imgSrc={cover}
                    imgAlt={`${id}`}
                    editLink={`/diamond?updateDiamond=true&id=${params.id}`}
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
                        <div className="flex gap-5 flex-col-reverse">
                            <div className="flex bg-stars p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150">
                                <span className="">{quantity}</span>
                                <span className="capitalize">quantity</span>
                            </div>
                        </div>
                        {created_at && (
                            <div className="flex justify-start items-center gap-2">
                                <span>تم إنشاؤه في</span>
                                <span className="tracking-tighter">
                                    <CreatedAt createdAt={created_at} />
                                </span>
                            </div>
                        )}
                        {updated_at && (
                            <div className="flex justify-start items-center gap-2">
                                <span>تم تعديله في</span>
                                <span className="tracking-tighter">
                                    <CreatedAt createdAt={updated_at} />
                                </span>
                            </div>
                        )}
                    </>
                </SpecificItem>
            )}
            {showDeleteModel && <Backdrop onClose={deleteDiamondHandler} />}
            <ConfirmDelete
                deleteBtnContent={
                    diamond.deleteDiamondPackageLoading
                        ? "الرجاء الانتظار..."
                        : "أحذف"
                }
                showDeleteModel={showDeleteModel}
                confirmDeleteHandler={confirmDeleteHandler}
                header={` هل انت متاكد من حذف الماسه ذات`}
                element={`الرقم ${id}`}
                text="عند حذفك لهذه الماسه لايمكنك استرجاعها مره اخرى هل انت متاكد من انك تريد حذفها"
            />
        </>
    );
};

export default SpecificDiamondUi;
