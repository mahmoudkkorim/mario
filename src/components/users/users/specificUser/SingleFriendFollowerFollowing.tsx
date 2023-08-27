import React from "react";
import { useNavigate } from "react-router-dom";

interface SingleFriendFollowerFollowingI {
    userId: number | string;
    src: string;
    name: string | null;
}

const SingleFriendFollowerFollowing = (
    props: SingleFriendFollowerFollowingI
) => {
    const { name, src, userId } = props;

    const navigate = useNavigate();

    return (
        <div
            className="w-28 relative group h-28 rounded-sm overflow-hidden cursor-pointer"
            onClick={() => navigate(`/members/${userId}`)}
        >
            <img
                className="w-28 h-28 group-hover:scale-110 duration-300"
                src={src}
                alt={`${name || ""}_image`}
            />
            {/* overlay */}
            <div className="opacity-0 group-hover:opacity-100 bg-gradient-to-t from-darkBody/30 to-darkBody-0 duration-300 absolute top-0 left-0 w-full h-full flex items-end"></div>
        </div>
    );
};

export default SingleFriendFollowerFollowing;
