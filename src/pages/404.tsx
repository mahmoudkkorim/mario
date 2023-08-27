import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  // Naviage to previous page
  const navigateToPreviousHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="flex-1 flex flex-col gap-5 justify-center items-center">
      <p className="text-darkRed font-semibold">404 | هذه الصفحه غير موجوده</p>
      <button
        onClick={navigateToPreviousHandler}
        className="bg-darkGray border-[1px] text-white p-5 py-2 rounded-lg hover:bg-darkGray/80 hover:border-darkGray duration-300"
      >
        الرجوع للصفحه السابقه
      </button>
    </div>
  );
};

export default NotFound;
