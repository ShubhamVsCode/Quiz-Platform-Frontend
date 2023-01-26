import { Button, Checkbox, CheckIcon, Slider } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
// import { IconCheck } from "@tabler/icons";

import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import HomePage from "../components/HomePage";
import Navbar from "../components/Navbar";
import NewQuestion from "../components/NewQuestion";
import TextBox from "../components/TextBox";
import { useCreateQuestionMutation } from "../redux/services/quiz.services";

export default function Home() {
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

      {/* <NewQuestion /> */}
      <HomePage />
    </div>
  );
}
