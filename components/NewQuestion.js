import { Button, Checkbox, CheckIcon, Slider } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
// import { IconCheck } from "@tabler/icons";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";
import TextBox from "./TextBox";
import { useCreateQuestionMutation } from "../redux/services/quiz.services";
import { DndListHandle } from "./DragAndDrop";

const NewQuestion = ({ submittedQuestions, setSubmittedQuestions }) => {
  const [createQuestionFunction, createQuestionResponse] =
    useCreateQuestionMutation();

  const optionName = ["A", "B", "C", "D", "E", "F"];
  const [options, setOptions] = useState([
    {
      option_text: "",
      is_correct: false,
    },
    {
      option_text: "",
      is_correct: false,
    },
    {
      option_text: "",
      is_correct: false,
    },
    {
      option_text: "",
      is_correct: false,
    },
  ]);

  const deleteOption = (i) => {
    if (options.length > 2) {
      setOptions((prev) => {
        console.log(i);
        const newArray = prev.filter((opt, index) => index != i);
        console.log(newArray);
        return newArray;
      });
    }
  };

  const [questionData, setQuestionData] = useState({
    question_text: "",
    options: options,
    solution: {},
    question_image: "",
    question_difficulty: 5,
  });

  const handleChange = (e, i) => {
    setOptions((prev) => {
      prev.map((o) => (o.is_correct = false));
      prev[i].is_correct = e.target.checked;
      return [...prev];
    });
  };

  const handleSubmit = (e) => {
    console.log("Question Data", questionData);

    if (!questionData.question_text)
      return showNotification({
        id: "load-data",
        color: "red",
        title: "Error!",
        message: "Question is required!",
        autoClose: 2000,
      });

    if (!options.every((option) => option.option_text))
      return showNotification({
        id: "load-data",
        color: "red",
        title: "Error!",
        message: "All Option is required!",
        autoClose: 2000,
      });

    if (!options.some((option) => option.is_correct))
      return showNotification({
        id: "load-data",
        color: "red",
        title: "Error!",
        message: "Mark the Correct Option!",
        autoClose: 2000,
      });

    createQuestionFunction(questionData);
  };

  console.log("Create Question Response", createQuestionResponse.data);

  const [makeReadOnly, setMakeReadOnly] = useState(false);
  const [addSolution, setAddSolution] = useState(false);

  useEffect(() => {
    if (createQuestionResponse.isLoading) {
      showNotification({
        id: "load-data",
        loading: true,
        title: "Loading...",
        message: "Submitting Question...",
        autoClose: false,
        disallowClose: true,
      });
    }

    if (createQuestionResponse.isSuccess) {
      // setMakeReadOnly(true);
      updateNotification({
        id: "load-data",
        color: "teal",
        title: "Success!",
        message: "Question successfully submitted",
        icon: <CheckIcon height={10} />,
        autoClose: 2000,
      });
      setSubmittedQuestions((prev) => [...prev, createQuestionResponse.data]);
      setOptions([
        {
          option_text: "",
          is_correct: false,
        },
        {
          option_text: "",
          is_correct: false,
        },
        {
          option_text: "",
          is_correct: false,
        },
        {
          option_text: "",
          is_correct: false,
        },
      ]);
      setQuestionData({
        question_text: "",
        options: options,
        solution: {},
        question_image: "",
        question_difficulty: 5,
      });
    }
  }, [createQuestionResponse]);

  const [questionErrorMessage, optionErrorMessage] = [
    "Question is a required field!",
    "Option is required!",
  ];

  return (
    <div className="px-2 sm:pl-10 sm:pr-20 grid grid-cols-2 gap-10">
      {/* md:px-12 xl:px-20 2xl:px-32 py-5 */}
      <div className="">
        <p className="mb-2 text-xl font-bold">
          Question
          <span className="text-red-500 text-xl">*</span>
        </p>
        <div className="grid gap-3">
          <TextBox
            id="rte-question"
            // readOnly={makeReadOnly} //TODO: uncomment while update module is complete
            name="question"
            className={`${
              addSolution ? "row-span-1 h-[400px]" : "row-span-1 h-[648px]"
            }`}
            value={questionData.question_text}
            onChange={(value) =>
              setQuestionData((prev) => ({ ...prev, question_text: value }))
            }
          />

          {addSolution && (
            <div className={``}>
              <p className="mb-2 text-xl font-bold">Solution</p>
              <TextBox
                id="rte-solution"
                // readOnly={makeReadOnly} //TODO: uncomment while update module is complete
                name="question"
                className={`${addSolution && "h-[200px]"}`}
                value={questionData.solution.solution_text}
                onChange={(value) =>
                  setQuestionData((prev) => ({
                    ...prev,
                    solution: {
                      solution_text: value,
                    },
                  }))
                }
              />
            </div>
          )}
        </div>
      </div>

      <div className="">
        <p className="mb-2 text-xl font-bold">
          Options
          <span className="text-red-500 text-xl">*</span>
        </p>
        <div className="flex flex-col gap-3">
          {options.map((opt, i) => {
            return (
              <div>
                <div className="flex justify-between">
                  <p
                    className={`${
                      opt.is_correct && "text-green-600"
                    } duration-500 font-semibold`}
                  >
                    {optionName.at(i)}.
                  </p>
                  <Checkbox
                    label="Correct"
                    checked={opt.is_correct}
                    onChange={(e) => handleChange(e, i)}
                    color="green"
                  />
                </div>
                <div className="relative">
                  <TextBox
                    id={`rte-option-${i}`}
                    name="option"
                    className={`${
                      opt.is_correct && "bg-green-200"
                    } duration-500`}
                    value={options[i].option_text}
                    onChange={(value) =>
                      setOptions((prev) => {
                        prev[i].option_text = value;
                        return [...prev];
                      })
                    }
                    controls={[
                      ["bold", "italic", "underline", "link", "image"],
                      ["unorderedList", "h1", "h2", "h3"],
                      [("sup", "sub")],
                      ["blockquote", "codeBlock"],
                      [("alignLeft", "alignCenter", "alignRight")],
                    ]}
                  />
                  <button
                    onClick={() => deleteOption(i)}
                    className="absolute hover:text-red-600 -right-8 bottom-0"
                  >
                    <ArchiveBoxXMarkIcon className="w-6" />
                  </button>
                </div>
              </div>
            );
          })}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-center font-semibold mb-1">Difficulty</p>
              <Slider
                defaultValue={5}
                step={1}
                min={1}
                max={10}
                onChange={(value) => {
                  console.log(value);
                  setQuestionData((prev) => ({
                    ...prev,
                    question_difficulty: value,
                  }));
                }}
                styles={{ markLabel: { display: "none" } }}
                // className="w-40"
              />
            </div>
            <button
              onClick={() => {
                setOptions((prev) => [
                  ...prev,
                  {
                    option_text: "",
                    is_correct: false,
                  },
                ]);
              }}
              className="border-blue-500 border text-blue-500 duration-200 hover:bg-blue-50 rounded px-5 py-2"
            >
              Add Option
            </button>
            <button
              onClick={() => {
                setAddSolution(!addSolution);
                if (addSolution) {
                  setQuestionData((prev) => ({
                    ...prev,
                    solution: {
                      solution_text: "",
                    },
                  }));
                }
              }}
              className="bg-blue-500 text-white duration-200 hover:bg-blue-600 rounded px-2 py-2"
            >
              {addSolution ? "Remove Solution" : "Add Solution"}
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-400 text-white duration-200 hover:bg-green-600 rounded px-5 py-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQuestion;
