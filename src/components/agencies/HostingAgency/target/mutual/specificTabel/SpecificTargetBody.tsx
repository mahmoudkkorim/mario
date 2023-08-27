import React from "react";

// components
import Button from "../../../../../ui/Button";

// interface
import { SpecficTargetTabelI } from "../../../../../../interfaces/pages/agencies/hostingAgencies/target/AudioVideoTarget";

// icons
import { AiOutlineLink } from "react-icons/ai";

const SpecificTargetBody = (props: SpecficTargetTabelI) => {
    const { agencies_members } = props;

    return (
        <>
            {agencies_members && agencies_members.length > 0 ? (
                <tbody className="font-light text-sm">
                    {agencies_members.map((target, i) => (
                        <tr
                            key={i}
                            className={`border-b-[1px] hover:bg-white/30 border-white`}
                        >
                            <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white">
                                {i + 1}
                            </td>
                            <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white hidden lg:table-cell">
                                <img
                                    loading="lazy"
                                    className="rounded-sm object-cover w-6 sm:w-8 h-6 sm:h-8 mx-auto"
                                    src={target.agency.cover}
                                    alt={`${target.agency.name}_image`}
                                />
                            </td>
                            <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white">
                                {target.agency.name &&
                                target.agency.name.length > 10
                                    ? target.agency.name.slice(0, 10) + "..."
                                    : target.agency.name}
                            </td>
                            <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white hidden lg:table-cell">
                                <img
                                    loading="lazy"
                                    className="rounded-sm object-cover w-6 sm:w-8 h-6 sm:h-8 mx-auto"
                                    src={target.user.profile_picture}
                                    alt={`${target.user.name}_image`}
                                />
                            </td>
                            <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white">
                                {target.user.name &&
                                target.user.name.length > 10
                                    ? target.user.name.slice(0, 10) + "..."
                                    : target.user.name}
                            </td>

                            <td className=" py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-l-[1px] border-white">
                                <Button
                                    type="link"
                                    className="text-xs mx-auto pb-1.5 p-1 rounded-md sm:text-sm bg-lightBlue text-white"
                                    to={`/members/${target.user.id}`}
                                >
                                    <AiOutlineLink />
                                </Button>
                            </td>
                            <td className=" py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-white">
                                <Button
                                    type="link"
                                    className="text-xs mx-auto pb-1.5 p-1 rounded-md sm:text-sm bg-lightBlue text-white"
                                    to={`/agencies/?type=hosting&agency_id=${target.agency.id}`}
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

export default SpecificTargetBody;
