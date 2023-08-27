import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { specificSpecialUid } from "../../../store/slices/specialUidsSlice";

// components
import PagesHeaders from "../../ui/PagesHeaders";
import Spinner from "../../ui/spinner/Spinner";
import Message from "../../ui/Message";
import SpecificSpecialUidUi from "./SpecificSpecialUidUi";

const SpecificSpecialUid = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { id } = useParams();
    const auth = useSelector((state: RootState) => state.auth);
    const specialUids = useSelector((state: RootState) => state.specialUids);

    useEffect(() => {
        dispatch(
            specificSpecialUid({
                uid: id!,
                token: auth.loginData?.access_token!,
            })
        );
    }, [auth.loginData?.access_token, dispatch, id]);

    console.log(specialUids.specificSpecialUidData);

    return (
        <section className="container mx-auto h-full px-2 pt-5 flex flex-col">
            <PagesHeaders>الارقام المميزه</PagesHeaders>

            {specialUids.specificSpecialUidLoading ? (
                <Spinner />
            ) : specialUids.specificSpecialUidError ? (
                <Message>{specialUids.specificSpecialUidError}</Message>
            ) : specialUids.specificSpecialUidData ? (
                <>
                    <SpecificSpecialUidUi
                        body={specialUids.specificSpecialUidData.body}
                        created_at={
                            specialUids.specificSpecialUidData.created_at
                        }
                        id={specialUids.specificSpecialUidData.id}
                        is_purchased={
                            specialUids.specificSpecialUidData.is_purchased
                        }
                        price={specialUids.specificSpecialUidData.price}
                        updated_at={
                            specialUids.specificSpecialUidData.updated_at
                        }
                        user={specialUids.specificSpecialUidData.user}
                        user_id={specialUids.specificSpecialUidData.user_id}
                    />
                </>
            ) : (
                <Message>الرقم المميز غير موجود</Message>
            )}
        </section>
    );
};

export default SpecificSpecialUid;
