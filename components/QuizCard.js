import dayjs from "dayjs";
import React, { useState } from "react";

const QuizCard = ({ quiz }) => {
  const [difficulty] = useState(quiz?.quiz_difficulty);

  return (
    <div className="hover:shadow-lg flex flex-col justify-between rounded-2xl py-3 px-4 h-56 border-2 border-black/5 hover:border-blue-400 duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-2xl mb-3">
            {quiz?.quiz_name || "N/A"}
          </p>
          <span
            className={`${
              difficulty == "EASY"
                ? "bg-green-200"
                : difficulty == "MEDIUM"
                ? "bg-yellow-200"
                : "bg-red-200"
            } px-3 py-1 rounded-full`}
          >
            {difficulty}
          </span>
        </div>

        <div>
          <p className="font-semibold text-lg flex items-center">
            {dayjs(quiz?.quiz_date?.start).format("MMM DD, hh:mm A")}
            <span className="animate-pulse bg-red-500 w-3 inline-block ml-2 aspect-square rounded-full"></span>
          </p>
          <p>
            Duration:{" "}
            <span className="font-semibold">
              {dayjs(quiz?.quiz_date?.end).diff(quiz?.quiz_date?.start, "m")}{" "}
              Minutes
            </span>
          </p>
        </div>
      </div>

      <div>
        <p className="">{quiz?.questions?.length} Questions</p>
        <p className="">
          {quiz?.quiz_type === "SINGLE_CORRECT"
            ? "Single Correct Answers"
            : "Multiple Correct Answers"}
        </p>
      </div>
    </div>
  );
};

export default QuizCard;
