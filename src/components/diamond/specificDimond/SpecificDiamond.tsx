import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { specificDiamondPackage } from "../../../store/slices/diamondSlice";

// components
import PagesHeaders from "../../ui/PagesHeaders";
import Message from "../../ui/Message";
import Spinner from "../../ui/spinner/Spinner";
import SpecificDiamondUi from "./SpecificDiamondUi";

const SpecificDiamond = () => {
    const dispatch = useDispatch<AppDispatch>();

    const auth = useSelector((state: RootState) => state.auth);
    const diamond = useSelector((state: RootState) => state.diamond);
    const { id } = useParams();

    // Efftect => to get the specfic diamond data from store
    useEffect(() => {
        dispatch(
            specificDiamondPackage({
                diamond_id: id!,
                token: auth.loginData?.access_token!,
            })
        );
    }, [auth.loginData?.access_token, dispatch, id]);

    return (
        <section className="container mx-auto h-full px-2 pt-5 flex flex-col">
            <PagesHeaders>{`ماسه ${id}`}</PagesHeaders>

            {diamond.specificDiamondPackageLoading ? (
                <Spinner />
            ) : diamond.specificDiamondPackageError ? (
                <Message>{diamond.specificDiamondPackageError}</Message>
            ) : diamond.specificDiamondPackageData ? (
                <SpecificDiamondUi
                    cover={diamond.specificDiamondPackageData.cover}
                    created_at={diamond.specificDiamondPackageData.created_at}
                    id={diamond.specificDiamondPackageData.id}
                    price={diamond.specificDiamondPackageData.price}
                    quantity={diamond.specificDiamondPackageData.quantity}
                    updated_at={diamond.specificDiamondPackageData.updated_at}
                />
            ) : (
                <Message>الماسه غير موجود</Message>
            )}
        </section>
    );
};

export default SpecificDiamond;
