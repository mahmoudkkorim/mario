import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import SearchInputByUId from "../../ui/SearchInputByUId";

const SearchForUser = () => {
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");

    const navigate = useNavigate();

    // when user id is changed nav to user page
    useEffect(() => {
        if (title === "") {
            return;
        }

        const timer = setTimeout(() => {
            navigate(`/members/${title}`);
            setTitle("");
        }, 500);

        return () => clearTimeout(timer);
    }, [navigate, title]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setUserId(e.currentTarget.value);
    };

    // bearor is transfare id to parent element
    const bearorIdHandler = (id: number, uid: string) => {
        setTitle(id.toString());
        setUserId(uid);
    };

    return (
        <div className='flex justify-end'>
            <div className='relative w-96 max-w-[80vw]'>
                <SearchInputByUId
                    htmlFor='user id'
                    id='user id'
                    label='البحث عن عضو'
                    name='user id'
                    onChange={onChange}
                    value={userId}
                    title={title}
                    placeholder='*User id'
                    required
                    type='number'
                    bearorIdFun={bearorIdHandler}
                    labelBgColor='bg-gradient-to-b from-lighterGray to-white'
                />
            </div>
        </div>
    );
};

export default SearchForUser;
