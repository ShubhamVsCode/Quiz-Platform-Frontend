import React, { useEffect, useState } from "react";
import HTMLParser from "html-react-parser";
import NewQuestion from "../components/NewQuestion";
import {
  Bars3BottomLeftIcon,
  CalculatorIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";

import {
  Button,
  CheckIcon,
  createStyles,
  Modal,
  NativeSelect,
  SegmentedControl,
  Switch,
  TextInput,
} from "@mantine/core";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import { DatePicker, TimeRangeInput } from "@mantine/dates";
import { motion } from "framer-motion";
import UpdateQuestion from "../components/UpdateQuestion";
import { useSelector } from "react-redux";
import { authState } from "../redux/services/auth.services";
import { useRouter } from "next/router";
import { useCreateQuizMutation } from "../redux/services/quiz.services";
import { showNotification, updateNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
  },

  active: {
    backgroundImage: theme.fn.gradient({ from: "pink", to: "orange" }),
  },

  control: {
    border: "0 !important",
  },

  labelActive: {
    color: `${theme.white} !important`,
  },
}));

const variants = {
  open: { x: 0, display: "inline" },
  closed: { x: "-100%", display: "none" },
};

const Quiz = () => {
  const auth = useSelector(authState);
  const router = useRouter();
  // useEffect(() => {
  //   if (!auth?.success) {
  //     router.push("/login");
  //   }
  // }, [auth]);

  const [value, onChange] = useState(new Date());

  const [quizData, setQuizData] = useState({
    quiz_name: "",
    questions: [],
    quiz_image: "",
    quiz_difficulty: "MEDIUM",
    quiz_type: "SINGLE_CORRECT",
    is_published: false,
    is_live: false,
    quiz_date: {
      start: value,
    },
  });

  console.log("quizData", quizData);

  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [selectedQuestionForUpdate, setSelectedQuestionForUpdate] = useState(
    {}
  );

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  useEffect(() => {
    if (selectedQuestionForUpdate?._id) {
      setOpenUpdateModal(true);
    } else {
      setOpenUpdateModal(false);
    }
  }, [selectedQuestionForUpdate]);

  useEffect(() => {
    if (submittedQuestions.length > 0) {
      const questionIds = submittedQuestions.map((ques) => ques?._id);
      setQuizData((prev) => ({ ...prev, questions: [...questionIds] }));
    }
  }, [submittedQuestions]);

  const { classes } = useStyles();

  const [openSidebar, setOpenSidebar] = useState(true);
  const open = () => setOpenSidebar(true);
  const close = () => setOpenSidebar(false);

  const data = [
    { value: "min", label: "Minutes" },
    { value: "hr", label: "Hours" },
    { value: "day", label: "Days" },
  ];

  const select = (
    <NativeSelect
      data={data}
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
      }}
    />
  );

  const [createQuizFunction, createQuizResponse] = useCreateQuizMutation();

  const handleSubmit = (isPublished) => {
    createQuizFunction({
      ...quizData,
      is_published: isPublished,
    });
  };

  useEffect(() => {
    if (createQuizResponse.isLoading) {
      showNotification({
        id: "load-data",
        loading: true,
        title: "Loading...",
        message: "Submitting Quiz...",
        autoClose: false,
        disallowClose: true,
      });
    }

    if (createQuizResponse.isSuccess) {
      // setMakeReadOnly(true);
      updateNotification({
        id: "load-data",
        color: "teal",
        title: "Success!",
        message: "Quiz successfully created",
        icon: <CheckIcon height={10} />,
        autoClose: 500,
        w: "300px",
        left: "120px",
      });
      setSubmittedQuestions([]);
      setQuizData({
        quiz_name: "",
        questions: [],
        quiz_image: "",
        quiz_difficulty: "MEDIUM",
        quiz_type: "SINGLE_CORRECT",
        is_published: false,
        is_live: false,
        quiz_date: {
          start: value,
        },
      });
    }
    if (createQuizResponse.isError) {
      updateNotification({
        id: "load-data",
        color: "red",
        title: "Failed!",
        message: createQuizResponse.error?.message
          ? createQuizResponse.error?.message
          : createQuizResponse.error?.data?.message,
        icon: <XMarkIcon className="p-1" />,
        autoClose: 500,
        w: "300px",
        left: "120px",
      });
    }
  }, [createQuizResponse]);

  return (
    <div className="">
      <div className="grid grid-cols-6">
        <motion.div
          //   initial={{ x: -300 }}
          //   animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 360,
            damping: 26,
          }}
          animate={openSidebar ? "open" : "closed"}
          variants={variants}
          className="h-[calc(100vh-81px)] relative col-span-1 px-4 space-y-5 py-6 border-r"
        >
          <div className="flex flex-col">
            <label htmlFor="quiz_name" className="mb-2 text-xl font-bold">
              Title
              <span className="text-red-500 text-xl">*</span>
            </label>
            <input
              type="text"
              name="quiz_name"
              id="quiz_name"
              value={quizData.quiz_name}
              className="rounded px-5 py-3 border border-black/20"
              onChange={(e) =>
                setQuizData((prev) => ({
                  ...prev,
                  quiz_name: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="quiz_name" className="mb-2 text-xl font-bold">
              Questions
              {/* <span className="text-red-500 text-xl">*</span> */}
            </label>
            {submittedQuestions.length == 0 ? (
              <p>No Question Saved</p>
            ) : (
              submittedQuestions.map((ques, i) => {
                return (
                  <div
                    key={ques._id || i}
                    className="flex justify-between bg-slate-100 hover:bg-slate-200 duration-300 py-2 px-2 mb-1 rounded"
                  >
                    <div className="">
                      {HTMLParser(ques?.question_text?.substring(0, 100))}
                    </div>
                    <button onClick={() => setSelectedQuestionForUpdate(ques)}>
                      <PencilSquareIcon className="w-6 hover:text-green-600 duration-300 items-center" />
                    </button>
                  </div>
                );
              })
            )}

            <Modal
              title={<p className="font-bold">Update Question</p>}
              size="calc(100vw - 400px)"
              overlayOpacity={0.55}
              overlayBlur={3}
              opened={openUpdateModal}
              centered
              padding={"6px 16px"}
              onClose={() => setSelectedQuestionForUpdate({})}
            >
              <UpdateQuestion
                setSubmittedQuestions={setSubmittedQuestions}
                questionData={selectedQuestionForUpdate}
              />
            </Modal>
            {/* Button Add a Question */}
          </div>

          <div className="flex flex-col">
            <label htmlFor="quiz_name" className="mb-2 text-xl font-bold">
              {/* <span className="text-red-500 text-xl">*</span> */}
            </label>

            <SegmentedControl
              radius="xl"
              size="md"
              data={["EASY", "MEDIUM", "HARD"]}
              classNames={classes}
              onChange={(val) =>
                setQuizData((prev) => ({ ...prev, quiz_difficulty: val }))
              }
            />
          </div>

          <div className="flex gap-3 flex-col">
            <label htmlFor="quiz_name" className="mb-2 text-xl font-bold">
              {/* <span className="text-red-500 text-xl">*</span> */}
              <Switch
                label="Schedule Quiz"
                value={quizData.is_live}
                onChange={(e) => {
                  setQuizData((prev) => ({
                    ...prev,
                    is_live: e.target.checked,
                  }));
                }}
                classNames=""
              />
            </label>
            {quizData.is_live && (
              <>
                <DatePicker
                  placeholder="Pick date"
                  label="Schedule Date"
                  withAsterisk
                  icon={<CalendarIcon className="w-4" />}
                />
                <TimeRangeInput
                  label="Timing"
                  // value={value}
                  // onChange={setValue}
                  clearable
                  format="12"
                  amPmPlaceholder="AM"
                  amPmLabel="AM"
                  labelSeparator="to"
                  withAsterisk
                  icon={<ClockIcon className="w-4" />}
                />
              </>
            )}
          </div>

          <div className="absolute bottom-5 flex gap-2">
            <Button onClick={() => handleSubmit(true)} className="bg-blue-500">
              Create Quiz
            </Button>
            <Button
              onClick={() => handleSubmit(false)}
              variant="outline"
              className=""
            >
              Save for later
            </Button>
          </div>
        </motion.div>

        <div className={`${openSidebar ? "col-span-5" : "col-span-full"}`}>
          <button onClick={() => setOpenSidebar(!openSidebar)}>
            <Bars3BottomLeftIcon className="w-8 absolute top-6 left-5 hover:rounded-full hover:bg-slate-300 p-1" />
          </button>
          <NewQuestion
            submittedQuestions={submittedQuestions}
            setSubmittedQuestions={setSubmittedQuestions}
          />
        </div>
      </div>
    </div>
  );
};

export default Quiz;

// Quiz Starts at:{" "}
// <DateTimePicker onChange={onChange} value={value} />
// <TextInput
// type="number"
// placeholder=""
// label="Quiz Ends in"
// rightSection={select}
// rightSectionWidth={95}
// />
