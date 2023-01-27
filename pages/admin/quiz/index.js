import { ArrowRightIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button, Skeleton } from "@mantine/core";
import React from "react";
import QuizCard from "../../../components/QuizCard";
import { useGetUpcomingQuizzesQuery } from "../../../redux/services/quiz.services";

const Manage = () => {
  const upcomingQuizzes = useGetUpcomingQuizzesQuery();

  return (
    <div className="max-w-6xl py-10 mx-auto">
      <div className="flex justify-between">
        <h1>Upcoming</h1>

        <Button
          rightIcon={<ChevronRightIcon className="text-white w-4" />}
          className="bg-blue-500 hover:bg-blue-600 duration-300 "
        >
          See All
        </Button>
      </div>
      <div className="grid my-10 grid-cols-2 gap-x-10 gap-y-8 ">
        {upcomingQuizzes?.isLoading ? (
          <>
            <Skeleton w="auto" h="230px" radius={15}></Skeleton>
            <Skeleton w="auto" h="230px" radius={15}></Skeleton>
            <Skeleton w="auto" h="230px" radius={15}></Skeleton>
            <Skeleton w="auto" h="230px" radius={15}></Skeleton>
          </>
        ) : (
          upcomingQuizzes?.data?.map((quiz, i) => (
            <QuizCard quiz={quiz} key={quiz?._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default Manage;
