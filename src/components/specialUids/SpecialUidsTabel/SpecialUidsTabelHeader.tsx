import React from "react";

const SpecialUidsTabelHeader = () => {
    return (
        <thead className='border-b-[1px] bg-lightDark/5 border-white'>
            <tr className='text-[10px] font-semibold sm:font-normal sm:text-base'>
                <td className='capitalize text-center pb-3 pl-1 sm:pl-3 border-r-[1px] border-l-[1px] border-white'>
                    الرقم
                </td>
                <td className='capitalize text-center  pb-3  border-l-[1px] border-white'>
                    الرقم المميز (الجسم)
                </td>
                <td className='capitalize text-center pb-3  border-l-[1px] border-white'>
                    السعر
                </td>
                <td className='capitalize text-center pb-3  border-l-[1px] border-white'>
                    الحاله
                </td>
                <td className='capitalize text-center pb-3 border-l-[1px] border-white  hidden sm:table-cell'>
                    المستخدم
                </td>
                <td className='capitalize text-center pb-3 hidden sm:table-cell border-l-[1px] border-white'>
                    اسم المستخدم
                </td>
                <td className='capitalize text-center pb-3 border-l-[1px] border-white'>
                    حذف الرقم
                </td>
                <td className='capitalize text-center pb-3 border-l-[1px] border-white'>
                    صفحه الرقم
                </td>
            </tr>
        </thead>
    );
};

export default SpecialUidsTabelHeader;
