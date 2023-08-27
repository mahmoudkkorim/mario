import React from "react";
import { useLocation } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

// utils
import ConvertNumberWishK_M from "../../utils/ConvertNumberWishK_M";

// helpers
import CreatedAt from "../../helpers/CreatedAt";

// components
import Button from "../../ui/Button";

// react icons
import { AiOutlineLink } from "react-icons/ai";

const LevelsTabelBody = () => {
    const { pathname, search } = useLocation();

    const levels = useSelector((state: RootState) => state.levels);

    return (
        <>
            {levels.allLevelsData?.data &&
            levels.allLevelsData?.data.length > 0 ? (
                <tbody className='font-light text-sm'>
                    {levels.allLevelsData?.data.map((level, i) => (
                        <tr
                            key={i}
                            className={`border-b-[1px] hover:bg-white/30 border-white`}
                        >
                            <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                {i +
                                    1 +
                                    levels.allLevelsData?.per_page! *
                                        (+levels.allLevelsData?.current_page! -
                                            1)}
                            </td>
                            <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white hidden lg:table-cell'>
                                {level.id}
                            </td>

                            <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                <CreatedAt createdAt={level.created_at} />
                            </td>
                            <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                <CreatedAt createdAt={level.updated_at} />
                            </td>
                            <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                {ConvertNumberWishK_M(level.required_exp, 1)}
                            </td>
                            <td className='capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white'>
                                {ConvertNumberWishK_M(level.users_count, 1)}
                            </td>

                            <td className=' py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-r-[1px] border-white'>
                                <Button
                                    type='link'
                                    className='text-xs mx-auto pb-1.5 p-1 rounded-md sm:text-sm bg-lightBlue text-white'
                                    to={`${pathname}/${level.id}`}
                                >
                                    <AiOutlineLink />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            ) : (
                <tbody></tbody>
            )}
        </>
    );
};

export default LevelsTabelBody;
