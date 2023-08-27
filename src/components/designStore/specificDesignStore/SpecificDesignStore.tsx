import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { specificDesignsStore } from "../../../store/slices/designStoreSlice";

import SpecificDesignStoreUi from "./SpecificDesignStoreUi";
import Spinner from "../../ui/spinner/Spinner";
import Message from "../../ui/Message";
import GiveDesignStoreToUser from "./manipulation/GiveDesignStoreToUser";

const SpecificDesignStore = () => {
    const dispatch = useDispatch<AppDispatch>();

    const auth = useSelector((state: RootState) => state.auth);
    const designStore = useSelector((state: RootState) => state.designStore);
    const { id } = useParams();

    useEffect(() => {
        dispatch(
            specificDesignsStore({
                id: id!,
                token: auth.loginData?.access_token!,
            })
        );
    }, [auth.loginData?.access_token, dispatch, id]);

    return (
        <section className="container mx-auto h-full px-2 pt-5 flex flex-col">
            <h2 className="font-semibold mb-5 sm:mb-0 text-xl border-b-2 border-lightBlue w-fit pb-1">
                متجر التصاميم
            </h2>

            {designStore.specificDesignStoreLoading ? (
                <Spinner />
            ) : designStore.specificDesignStoreError ? (
                <Message>{designStore.specificDesignStoreError}</Message>
            ) : designStore.specificDesignStoreData ? (
                <>
                    {/* give designStore to user */}
                    <GiveDesignStoreToUser />

                    <SpecificDesignStoreUi
                        cover={designStore.specificDesignStoreData.cover}
                        created_at={
                            designStore.specificDesignStoreData.created_at
                        }
                        currency_type={
                            designStore.specificDesignStoreData.currency_type
                        }
                        id={designStore.specificDesignStoreData.id}
                        is_free={designStore.specificDesignStoreData.is_free}
                        name={designStore.specificDesignStoreData.name}
                        price={designStore.specificDesignStoreData.price}
                        svga={designStore.specificDesignStoreData.svga}
                        type={designStore.specificDesignStoreData.type}
                        updated_at={
                            designStore.specificDesignStoreData.updated_at
                        }
                        users_count={
                            designStore.specificDesignStoreData.users_count
                        }
                        valid_days={
                            designStore.specificDesignStoreData.valid_days
                        }
                    />
                </>
            ) : (
                <Message>التصميم غير موجود</Message>
            )}
        </section>
    );
};

export default SpecificDesignStore;
