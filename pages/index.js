import { Button, Checkbox, Slider } from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TextBox from "../components/TextBox";
import { useCreateQuestionMutation } from "../redux/services/quiz.services";

export default function Home() {
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

    createQuestionFunction(questionData);
  };

  console.log("Create Question Response", createQuestionResponse.data);

  const [makeReadOnly, setMakeReadOnly] = useState(false);
  const [addSolution, setAddSolution] = useState(false);

  useEffect(() => {
    if (createQuestionResponse.isSuccess) {
      setMakeReadOnly(true);
    }
  }, [createQuestionResponse.isSuccess]);

  return (
    <div className="">
      <Head>
        <title>Quiz Platform</title>
        <meta
          name="description"
          content="A open-source project that make taking quiz easier"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className="px-2 sm:px-5 md:px-12 xl:px-20 2xl:px-32 py-5 grid grid-cols-2 gap-10">
        <div className="h-full">
          <p className="mb-2 text-xl font-bold">Question</p>
          <div className="grid grid-rows-2 gap-3">
            <TextBox
              id="rte"
              // readOnly={makeReadOnly} //TODO: uncomment while update module is complete
              name="question"
              className={`${
                addSolution ? "row-span-1 h-[400px]" : "row-span-2 h-[620px]"
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
                  id="rte"
                  // readOnly={makeReadOnly} //TODO: uncomment while update module is complete
                  name="question"
                  className={`${addSolution && "h-[235px]"}`}
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
          <p className="mb-2 text-xl font-bold">Options</p>
          <div className="flex flex-col gap-6">
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
                      label="Correct Option"
                      checked={opt.is_correct}
                      onChange={(e) => handleChange(e, i)}
                      color="green"
                    />
                  </div>
                  <TextBox
                    id="rte"
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
                  />
                </div>
              );
            })}
            <div className="grid grid-cols-3 gap-10">
              <div>
                <p className="text-center font-semibold mb-1">
                  Question Difficulty
                </p>
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
                onClick={() => setAddSolution(!addSolution)}
                className="bg-blue-500 text-white duration-200 hover:bg-blue-600 rounded px-5 py-2"
              >
                Add Solution
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
    </div>
  );
}
