import React from "react";

const SpecifcvedioGiftsGenreTabelHeader = () => {
    return (
        <thead className='border-b-[1px] bg-lightDark/5 border-white'>
            <tr className='text-[10px] font-semibold sm:font-normal sm:text-base'>
                <td className='capitalize text-center pb-3 pl-1 sm:pl-3 border-r-[1px] border-l-[1px] border-white'>
                    الرقم
                </td>
                <td className='capitalize text-center pb-3 pl-1 sm:pl-3 border-l-[1px] border-white'>
                    الاسم
                </td>
                <td className='capitalize text-center pb-3 pl-1 sm:pl-3 border-l-[1px] border-white'>
                    السعر
                </td>
                <td className='capitalize text-center pb-3 pl-1 sm:pl-3 border-l-[1px] border-white'>
                    الهديه
                </td>
                <td className='capitalize text-center hidden lg:table-cell pb-3 border-l-[1px] border-white'>
                    إنشئ في
                </td>
                <td className='capitalize text-center hidden lg:table-cell pb-3 border-l-[1px] border-white'>
                    اخر تحديث في
                </td>
                <td className='capitalize text-center pb-3 border-l-[1px] border-white'>
                    صفحه الهديه
                </td>
            </tr>
        </thead>
    );
};

export default SpecifcvedioGiftsGenreTabelHeader;
