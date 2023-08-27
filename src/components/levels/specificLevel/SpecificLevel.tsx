import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { specificLevel } from "../../../store/slices/levelsSlice";

// utils
import ConvertNumberWishK_M from "../../utils/ConvertNumberWishK_M";

// helpers
import CreatedAt from "../../helpers/CreatedAt";

// components
import PagesHeaders from "../../ui/PagesHeaders";
import Spinner from "../../ui/spinner/Spinner";
import Message from "../../ui/Message";
import SpecifcRowDataForSpecifcItem from "../../utils/SpecifcRowDataForSpecifcItem";
import Mapnipulation from "./manipulation/Mapnipulation";

const SpecificLevel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();

    // selectors
    const auth = useSelector((state: RootState) => state.auth);
    const levels = useSelector((state: RootState) => state.levels);

    // useEffect to fetch data specific level from Redux
    useEffect(() => {
        dispatch(
            specificLevel({
                token: auth.loginData?.access_token!,
                level_id: params.id!,
            })
        );
    }, [auth.loginData?.access_token, dispatch, params.id]);

    return (
        <section className='container mx-auto h-full px-2 pt-5 flex flex-col'>
            <PagesHeaders>{`المستوى ${params.id}`}</PagesHeaders>
            <Mapnipulation />
            {levels.specificLevelLoading ? (
                <Spinner />
            ) : levels.specificLevelError ? (
                <Message>{levels.specificLevelError}</Message>
            ) : levels.specificLevelData?.id ? (
                <section className='mt-2 mr-5'>
                    <PagesHeaders small>معلومات عن المستوى</PagesHeaders>

                    <div className='flex flex-col justify-start gap-1 mt-5'>
                        <SpecifcRowDataForSpecifcItem
                            data={levels.specificLevelData.number}
                            text='رقم المستووى'
                        />
                        <SpecifcRowDataForSpecifcItem
                            data={levels.specificLevelData.id}
                            text='الرقم التعريفى للمستوى'
                        />
                        <SpecifcRowDataForSpecifcItem
                            data={ConvertNumberWishK_M(
                                levels.specificLevelData.users_count,
                                1
                            )}
                            text='عدد الاعضاء فى المستوى'
                        />
                        <SpecifcRowDataForSpecifcItem
                            data={ConvertNumberWishK_M(
                                levels.specificLevelData.required_exp,
                                1
                            )}
                            text='الاكسبى المطلوب'
                        />
                        {levels.specificLevelData.created_at && (
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    <CreatedAt
                                        createdAt={
                                            levels.specificLevelData.created_at
                                        }
                                    />
                                }
                                text='إنشئ في'
                            />
                        )}
                        {levels.specificLevelData.updated_at && (
                            <SpecifcRowDataForSpecifcItem
                                data={
                                    <CreatedAt
                                        createdAt={
                                            levels.specificLevelData.updated_at
                                        }
                                    />
                                }
                                text='اخر تحديث في'
                            />
                        )}
                    </div>
                </section>
            ) : (
                <div className='mt-5'>
                    <Message>المستوى غير موجوده.</Message>
                </div>
            )}
        </section>
    );
};

export default SpecificLevel;
