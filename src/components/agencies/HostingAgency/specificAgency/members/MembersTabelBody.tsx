import React from "react";

// interface
import { MultiMembers } from "../../../../../interfaces/pages/agencies/hostingAgencies/HostingAgencies";

// components
import Button from "../../../../ui/Button";

// helpers
import CreatedAt from "../../../../helpers/CreatedAt";

// icons
import { AiOutlineLink } from "react-icons/ai";

const MembersTabelBody = (props: MultiMembers) => {
    const { members } = props;
    return (
        <tbody className="font-light text-sm">
            {members.map((member, i) => (
                <tr
                    key={i}
                    className={`border-b-[1px] border-white hover:bg-white/30 `}
                >
                    <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white">
                        {i + 1}
                    </td>
                    <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white">
                        {member.user.uid}
                    </td>

                    <td className="capitalize text-center text-[10px] sm:text-base border-r-[1px] justify-center border-white">
                        <img
                            loading="lazy"
                            className="rounded-sm object-cover w-6 sm:w-8 h-6 sm:h-8 mx-auto"
                            src={member.user.profile_picture}
                            alt={`${member.user.name}_image`}
                        />
                    </td>
                    <td className="capitalize text-center py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-r-[1px] border-white">
                        {member.user.name && member.user.name.length > 10
                            ? member.user.name.slice(0, 10) + "..."
                            : member.user.name}
                    </td>
                    <td className=" py-3 pl-1 sm:pl-3 text-[10px] sm:text-base border-l-[1px] border-r-[1px] border-white">
                        <Button
                            type="link"
                            className="text-xs mx-auto pb-1.5 p-1 rounded-md sm:text-sm bg-lightBlue text-white"
                            to={`/members/${member.user_id}`}
                        >
                            <AiOutlineLink />
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default MembersTabelBody;
