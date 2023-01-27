import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import {
  useLoginMutation,
  useSignupMutation,
} from "../redux/services/quiz.services";
import { showNotification, updateNotification } from "@mantine/notifications";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/services/auth.services";
// import { GoogleButton, TwitterButton } from "../SocialButtons/SocialButtons";

import Cookies from "js-cookie";

export default function AuthenticationForm(props) {
  const [type, toggle] = useToggle(["login", "register"]);
  const [formValidation, toggleFormValidation] = useToggle([
    {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 6 ? "Password should include at least 6 characters" : null,
    },
    {
      name: (val) => (val.length > 0 ? null : "Please enter your name"),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 6 ? "Password should include at least 6 characters" : null,
    },
  ]);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: formValidation,
  });

  const dispatch = useDispatch();

  const [signupFunction, signupResponse] = useSignupMutation();
  const [loginFunction, loginResponse] = useLoginMutation();

  useEffect(() => {
    if (loginResponse.isLoading) {
      showNotification({
        id: "load-data",
        loading: true,
        title: "Loading...",
        autoClose: false,
        disallowClose: true,
        w: "300px",
        left: "120px",
      });
    }

    if (loginResponse.isError) {
      updateNotification({
        id: "load-data",
        color: "red",
        title: "Failed!",
        message: loginResponse.error?.message
          ? loginResponse.error?.message
          : loginResponse.error?.data?.message,
        icon: <XMarkIcon className="p-1" />,
        autoClose: 500,
        w: "300px",
        left: "120px",
      });

      // console.log(loginResponse.error);
    }

    if (loginResponse.isSuccess) {
      // setMakeReadOnly(true);
      updateNotification({
        id: "load-data",
        color: "teal",
        title: "Success!",
        message: "Login Successfully!",
        icon: <CheckIcon className="p-1" />,
        autoClose: 500,
        w: "300px",
        left: "120px",
      });

      Cookies.set("authToken", loginResponse?.data?.token);
      Cookies.set("auth", JSON.stringify(loginResponse?.data));

      // localStorage.setItem("auth", loginResponse.data);

      dispatch(setUser(loginResponse.data));
      router.push("/");
    }

    // console.log("Login Successfully", loginResponse.data);
  }, [loginResponse]);

  const router = useRouter();

  useEffect(() => {
    if (Cookies.get("auth")) {
      dispatch(setUser(JSON.parse(Cookies.get("auth"))));
    }
  }, []);

  return (
    <Paper
      shadow={"lg"}
      radius="md"
      p="xl"
      w={500}
      m={"50px auto"}
      withBorder
      {...props}
    >
      <Text size="lg" weight={500}>
        Welcome to Quizier, {upperFirst(type)} with
      </Text>

      <Group grow mb="md" mt="md">
        {/* <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton> */}
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit((data) => {
          // console.log("Submitting Data", data);
          if (type === "register") {
            signupFunction(data);
          } else {
            loginFunction(data);
          }
        })}
      >
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              error={form.errors.name && "Please enter your name"}
              withAsterisk
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
          />

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => {
              toggle();
              toggleFormValidation();
            }}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <button
            className="bg-blue-500 px-5 py-2 rounded hover:bg-blue-600 focus:bg-blue-600  text-white"
            type="submit"
          >
            {upperFirst(type)}
          </button>
        </Group>
      </form>
    </Paper>
  );
}
