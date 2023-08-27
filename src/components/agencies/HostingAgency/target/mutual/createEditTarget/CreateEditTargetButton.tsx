import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// components
import Button from "../../../../../ui/Button";
import CreateEditForm from "./CreateEditForm";

// icons
import { IoMdCreate } from "react-icons/io";
import { BiEdit } from "react-icons/bi";

// interface
import { CreateEditTarget } from "../../../../../../interfaces/pages/agencies/hostingAgencies/target/AudioVideoTarget";

const CreateEditTargetButton = (props: CreateEditTarget) => {
    const { processType } = props;
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const target = query.get("target");

    const [showCreateEditModel, setShowCreateEditModel] = useState(false);

    const toggleCreateEditModelHandler = () => {
        setShowCreateEditModel((prevState) => !prevState);
    };

    return (
        <>
            {processType === "create" ? (
                <Button
                    onClick={toggleCreateEditModelHandler}
                    createBtn
                    className="text-xs sm:text-sm"
                >
                    <>
                        <IoMdCreate />
                        إنشاء تارجت {target === "audio" ? "صوتى" : "فيديو"}
                    </>
                </Button>
            ) : (
                <Button
                    onClick={toggleCreateEditModelHandler}
                    editBtn
                    className="text-xs sm:text-sm"
                >
                    <>
                        <BiEdit />
                        تعديل{" "}
                        {target === "audio"
                            ? "التارجت الصوتى"
                            : "تارجت الفيديو"}
                    </>
                </Button>
            )}

            <CreateEditForm
                processType={processType}
                showCreateEditModel={showCreateEditModel}
                toggleCreateEditModelHandler={toggleCreateEditModelHandler}
            />
        </>
    );
};

export default CreateEditTargetButton;
