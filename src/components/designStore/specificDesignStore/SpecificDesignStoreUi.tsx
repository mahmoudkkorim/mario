import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { deleteDesignsStore } from "../../../store/slices/designStoreSlice";

// component
import Backdrop from "../../models/Backdrop";
import ConfirmDelete from "../../models/ConfirmDelete";
import SpecificItem from "../../ui/SpecificItem";
import Message from "../../ui/Message";

// icons
import { HiBadgeCheck, HiUserGroup } from "react-icons/hi";
import { IoDiamondSharp } from "react-icons/io5";

// interfaces
import { SingleDesignStore } from "../../../interfaces/pages/DesignStore";

const SpecificDesignStoreUi = (props: SingleDesignStore) => {
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [hideDeleteModel, setHideDeleteModel] = useState({
        type: false,
        text: "",
    });

    const {
        cover,
        created_at,
        currency_type,
        id,
        is_free,
        name,
        price,
        svga,
        type,
        updated_at,
        users_count,
        valid_days,
    } = props;

    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const designStore = useSelector((state: RootState) => state.designStore);

    useEffect(() => {
        if (hideDeleteModel.type && !designStore.deleteDesignStoreLoading) {
            setHideDeleteModel({ type: true, text: "لقد تم مسح التصميم" });
            setShowDeleteModel(false);
        }
    }, [hideDeleteModel.type, designStore.deleteDesignStoreLoading]);

    // store design data into local storage to not make an req to get the data again from server and to compare the inputs to know what the exactly input has been changed
    const storeDesignInLocalStorageHandler = () => {
        localStorage.setItem("designStore", JSON.stringify(props));
    };

    // this function handle showing delete model
    const deleteDesignHandler = () => {
        setShowDeleteModel((prevState) => !prevState);
    };

    // confirm delete => if the fun return true means delete desgin, if it false just close the model
    const confirmDeleteHandler = (deleteDesign: boolean) => {
        if (deleteDesign) {
            // delete design
            dispatch(
                deleteDesignsStore({
                    id: params.id!,
                    token: auth.loginData?.access_token!,
                })
            );
            setHideDeleteModel((prevState) => ({ ...prevState, type: true }));
        } else {
            // close the model
            deleteDesignHandler();
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
                    deleteText="حذف التصميم"
                    delteItem={deleteDesignHandler}
                    editText="تعديل التصميم"
                    StoreItemInLocaStorage={storeDesignInLocalStorageHandler}
                    imgSrc={cover}
                    imgAlt={name}
                    editLink={`/designStore?updateStore=true&id=${params.id}`}
                >
                    <>
                        <div className="flex gap-5 flex-col-reverse">
                            {price > 0 ? (
                                <div className="flex bg-stars p-0.5 px-2 w-fit text-white rounded-md justify-end items-center gap-1 font-semibold text-sm hover:scale-95 duration-150">
                                    <span className="capitalize">
                                        {currency_type === "diamond" ? (
                                            <IoDiamondSharp />
                                        ) : (
                                            currency_type
                                        )}
                                    </span>
                                    <span className="">{price}</span>
                                </div>
                            ) : (
                                <></>
                            )}
                            <span
                                className={`${
                                    is_free ? "bg-success" : "bg-darkRed"
                                } text-white w-fit p-0.5 px-2 rounded-md text-sm font-extrabold hover:scale-95 duration-150`}
                            >
                                {is_free === 0 ? "غير مجانى" : "مجانى"}
                            </span>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                            <HiUserGroup className="text-darkBody w-5 h-5" />
                            <span className="tracking-tighter">
                                {users_count === 0
                                    ? "لا يوجد مستخدمين"
                                    : users_count === 1
                                    ? "مستخدم واحد"
                                    : `${users_count} مستخدمين`}
                            </span>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                            <HiBadgeCheck className="text-success w-5 h-5" />
                            <span className="tracking-tighter">
                                صالحه لمده {valid_days} يوم
                            </span>
                        </div>
                    </>
                </SpecificItem>
            )}
            {showDeleteModel && <Backdrop onClose={deleteDesignHandler} />}
            <ConfirmDelete
                deleteBtnContent={
                    designStore.deleteDesignStoreLoading
                        ? "الرجاء الانتظار..."
                        : "أحذف"
                }
                showDeleteModel={showDeleteModel}
                confirmDeleteHandler={confirmDeleteHandler}
                header={`هل انت متاكد من حذف`}
                element={name}
                text="عند حذفك لهذا التصميم لايمكنك استرجاعه مره اخرى هل انت متاكد من انك تريد حذفه"
            />
        </>
    );
};

export default SpecificDesignStoreUi;
