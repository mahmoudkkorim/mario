import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { specificUser } from "../../../../store/slices/users/usersSlice";

// components
import Spinner from "../../../ui/spinner/Spinner";
import Message from "../../../ui/Message";
import PagesHeaders from "../../../ui/PagesHeaders";
import SpecifcRowDataForSpecifcItem from "../../../utils/SpecifcRowDataForSpecifcItem";
import SingleFriendFollowerFollowing from "./SingleFriendFollowerFollowing";
import Manipulation from "./Manipulation";
import GetUserDesignStore from "../../../designStore/specificDesignStore/manipulation/GetUserDesignStore";

// utils
import ConvertNumberWishK_M from "../../../utils/ConvertNumberWishK_M";

// utils
import CreatedAt from "../../../helpers/CreatedAt";

const SpecificUser = () => {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();

    // selectors
    const auth = useSelector((state: RootState) => state.auth);
    const users = useSelector((state: RootState) => state.users);

    // useEffect to fetch data specific user from Redux
    useEffect(() => {
        dispatch(
            specificUser({
                token: auth.loginData?.access_token!,
                userId: params.id!,
            })
        );
    }, [auth.loginData?.access_token, dispatch, params.id]);

    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            {users.specificUserLoading ? (
                <Spinner />
            ) : users.specificUserError ? (
                <Message>{users.specificUserError}</Message>
            ) : users.specificUserData?.id ? (
                <section className='mt-2 mr-5'>
                    <h3 className='my-2 pb-0.5 border-b-[1px] w-fit border-lightBlue'>
                        {users.specificUserData.name ||
                            users.specificUserData.id}
                    </h3>
                    {/* MANIPULATION */}
                    <Manipulation />

                    <PagesHeaders small>بيانات العضو</PagesHeaders>
                    <div className='flex flex-col sm:flex-row justify-start sm:items-center gap-10 mt-5'>
                        <img
                            className='rounded-full w-52 h-52 bg-cover self-center'
                            src={users.specificUserData.profile_picture}
                            alt={`${users.specificUserData.name}_image`}
                        />
                        <div className='flex flex-col gap-2 mx-3 sm:mx-none'>
                            <SpecifcRowDataForSpecifcItem
                                data={users.specificUserData.uid}
                                text='الرقم التعريفى'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={users.specificUserData.name}
                                text='الاسم'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={users.specificUserData.email}
                                text='الايميل'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={users.specificUserData.phone}
                                text='التليفون'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={ConvertNumberWishK_M(
                                    users.specificUserData.money,
                                    1
                                )}
                                text='النقود'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={ConvertNumberWishK_M(
                                    users.specificUserData.diamond_balance,
                                    1
                                )}
                                text='رصيد الماس'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={ConvertNumberWishK_M(
                                    users.specificUserData.gold_balance,
                                    1
                                )}
                                text='رصيد الذهب'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={users.specificUserData.level_id}
                                text='المستوى'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={users.specificUserData.gender}
                                text='النوع'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col justify-start gap-2 mt-10'>
                        <PagesHeaders small>بيانات اخرى</PagesHeaders>
                        <div className='flex flex-col gap-2 mx-3 sm:mx-none'>
                            <SpecifcRowDataForSpecifcItem
                                data={users.specificUserData.friends.length}
                                text='عدد الاصدقاء'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={users.specificUserData.followers.length}
                                text='عدد المتابعين'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={users.specificUserData.followings.length}
                                text='عدد المتابعات'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    <span
                                        className={`${
                                            users.specificUserData
                                                .is_hosting_agency_owner === 0
                                                ? "bg-darkRed/40"
                                                : "bg-success/40"
                                        } text-white p-1 pt-0 px-3 rounded-md`}
                                    >
                                        {users.specificUserData
                                            .is_hosting_agency_owner === 0
                                            ? "لا"
                                            : "نعم"}
                                    </span>
                                }
                                text='مالك وكاله شحن'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    <span
                                        className={`${
                                            users.specificUserData
                                                .is_charge_agent === 0
                                                ? "bg-darkRed/40"
                                                : "bg-success/40"
                                        } text-white p-1 pt-0 px-3 rounded-md`}
                                    >
                                        {users.specificUserData
                                            .is_charge_agent === 0
                                            ? "لا"
                                            : "نعم"}
                                    </span>
                                }
                                text='وكيل شحن'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    <span
                                        className={`${
                                            users.specificUserData
                                                .is_hosting_agency_owner === 0
                                                ? "bg-darkRed/40"
                                                : "bg-success/40"
                                        } text-white p-1 pt-0 px-3 rounded-md`}
                                    >
                                        {users.specificUserData
                                            .is_hosting_agency_owner === 0
                                            ? "لا"
                                            : "نعم"}
                                    </span>
                                }
                                text='مالك وكاله استضافه'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    <span
                                        className={`${
                                            users.specificUserData
                                                .is_hosting_agent === 0
                                                ? "bg-darkRed/40"
                                                : "bg-success/40"
                                        } text-white p-1 pt-0 px-3 rounded-md`}
                                    >
                                        {users.specificUserData
                                            .is_hosting_agent === 0
                                            ? "لا"
                                            : "نعم"}
                                    </span>
                                }
                                text='وكيل استضافه'
                            />
                            {users.specificUserData.deactivated_until && (
                                <SpecifcRowDataForSpecifcItem
                                    data={
                                        <CreatedAt
                                            createdAt={
                                                users.specificUserData
                                                    .deactivated_until!
                                            }
                                        />
                                    }
                                    text='تاريخ فك الحظر'
                                />
                            )}
                            <SpecifcRowDataForSpecifcItem
                                data={users.specificUserData.language}
                                text='اللغه'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    <CreatedAt
                                        createdAt={
                                            users.specificUserData?.created_at!
                                        }
                                    />
                                }
                                text='أنشئ في'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    <CreatedAt
                                        createdAt={
                                            users.specificUserData?.updated_at!
                                        }
                                    />
                                }
                                text='اخر تعديل في'
                            />
                            <SpecifcRowDataForSpecifcItem
                                data={users.specificUserData.device_id}
                                text='رقم الجهاز'
                            />
                        </div>
                    </div>
                    {/* GetUserDesignStore */}
                    <GetUserDesignStore />

                    {/* FRIENDS */}
                    {users.specificUserData.friends.length > 0 && (
                        <div className='flex flex-col justify-start gap-2 mt-10'>
                            <PagesHeaders small>الاصدقاء</PagesHeaders>
                            <div className='flex flex-wrap justify-center gap-2'>
                                {users.specificUserData.friends.map(
                                    (friend, i) => (
                                        <SingleFriendFollowerFollowing
                                            key={i}
                                            userId={friend.friend_id}
                                            name={friend.friend_user.name}
                                            src={
                                                friend.friend_user
                                                    .profile_picture
                                            }
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    )}
                    {/* FOLLOWERS */}
                    {users.specificUserData.followers.length > 0 && (
                        <div className='flex flex-col justify-start gap-2 mt-10'>
                            <PagesHeaders small>المتابعين</PagesHeaders>
                            <div className='flex flex-wrap justify-center gap-2'>
                                {users.specificUserData.followers.map(
                                    (follower, i) => (
                                        <SingleFriendFollowerFollowing
                                            key={i}
                                            userId={follower.follower_id}
                                            name={follower.follower_user.name}
                                            src={
                                                follower.follower_user
                                                    .profile_picture
                                            }
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    )}
                    {/* FOLLOWINGS */}
                    {users.specificUserData.followings.length > 0 && (
                        <div className='flex flex-col justify-start gap-2 mt-10'>
                            <PagesHeaders small>المتابعات</PagesHeaders>
                            <div className='flex flex-wrap justify-center gap-2'>
                                {users.specificUserData.followings.map(
                                    (following, i) => (
                                        <SingleFriendFollowerFollowing
                                            key={i}
                                            userId={following.following_id}
                                            name={following.following_user.name}
                                            src={
                                                following.following_user
                                                    .profile_picture
                                            }
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </section>
            ) : (
                <div className='mt-5'>
                    <Message>العضو غير موجوده.</Message>
                </div>
            )}
        </section>
    );
};

export default SpecificUser;
