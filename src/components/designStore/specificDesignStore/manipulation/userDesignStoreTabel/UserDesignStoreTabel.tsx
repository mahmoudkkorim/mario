import React from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";

// components
import UserDesignStoreTabelHeader from "./UserDesignStoreTabelHeader";
import UserDesignStoreTabelBody from "./UserDesignStoreTabelBody";

const UserDesignStoreTabel = () => {
    const designStore = useSelector((state: RootState) => state.designStore);
    return (
        <>
            <div className="flex mt-10 mb-5 justify-end gap-2 font-semibold text-success/80 text-xs">
                <span>عدد التصميمات :</span>
                <span>
                    {designStore.getUserDesignStoreData?.decorations.length}
                </span>
            </div>
            <table className="w-full">
                <UserDesignStoreTabelHeader />
                <UserDesignStoreTabelBody />
            </table>
        </>
    );
};

export default UserDesignStoreTabel;
