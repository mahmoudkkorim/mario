import React from "react";

const UserDesignStoreTabelHeader = () => {
    return (
        <thead className="border-b-[1px] bg-lightDark/5 border-white">
            <tr className="text-[10px] font-semibold sm:font-normal sm:text-base">
                <td className="capitalize text-center pb-3 pl-1 sm:pl-3 border-r-[1px] border-l-[1px] border-white">
                    الرقم
                </td>
                <td className="capitalize text-center pb-3  border-l-[1px] border-white">
                    الاسم
                </td>
                <td className="capitalize text-center pb-3  border-l-[1px] border-white">
                    التصميم
                </td>
                <td className="capitalize text-center pb-3 border-l-[1px] border-white">
                    حذف التصميم من المستخدم
                </td>
                <td className="capitalize text-center pb-3 border-l-[1px] border-white">
                    صفحه التصميم
                </td>
            </tr>
        </thead>
    );
};

export default UserDesignStoreTabelHeader;
