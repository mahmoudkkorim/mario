import React from "react";

const LevelsTabelHeader = () => {
    return (
        <thead className='border-b-[1px] bg-lightDark/5 border-white'>
            <tr className='text-[10px] font-semibold sm:font-normal sm:text-base'>
                <td className='capitalize text-center pb-3 pl-1 sm:pl-3 border-r-[1px] border-l-[1px] border-white'>
                    الرقم
                </td>
                <td className='capitalize text-center hidden lg:table-cell pb-3 pl-1 sm:pl-3 border-l-[1px] border-white'>
                    الرقم التعريفى للمستوى
                </td>
                <td className='capitalize text-center pb-3 border-l-[1px] border-white'>
                    إنشئ في
                </td>
                <td className='capitalize text-center pb-3 border-l-[1px] border-white'>
                    اخر تحديث في
                </td>
                <td className='capitalize text-center pb-3 border-l-[1px] border-white'>
                    الاكسبى المطلوب
                </td>
                <td className='capitalize text-center pb-3 border-l-[1px] border-white'>
                    عدد الاعضاء
                </td>
                <td className='capitalize text-center pb-3 border-l-[1px] border-white'>
                    صفحه المستوى
                </td>
            </tr>
        </thead>
    );
};

export default LevelsTabelHeader;
