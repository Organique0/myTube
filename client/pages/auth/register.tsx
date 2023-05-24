import { useForm } from "@mantine/form";
import { AxiosError } from "axios";
import { registerUser } from "../../api/index";
import { useMutation } from "react-query";
import Head from "next/head";
import {
  Button,
  Container,
  Paper,
  Stack,
  TextInput,
  Title
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    }
  });

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof registerUser>["0"]
  >(registerUser, {
    onMutate: () => {
      showNotification({
        id: "register",
        title: "creating account",
        message: "wait",
        loading: true
      });
    },
    onSuccess: () => {
      updateNotification({
        id: "register",
        title: "success",
        message: "successfuly created account",
        loading: false
      });
      router.push("/auth/login");
    },
    onError: () => {
      updateNotification({
        id: "register",
        title: "Error",
        message: "could't create account",
        loading: false
      });
    }
  });

  return (
    <>
      <Head>
        <title>register user</title>
      </Head>
      <Container>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="luka@example.com"
                required
                {...form.getInputProps("email")}
              />
              <TextInput
                label="Username"
                placeholder="luka"
                required
                {...form.getInputProps("username")}
              />
              <TextInput
                label="Password"
                placeholder="password"
                required
                {...form.getInputProps("password")}
              />
              <TextInput
                label="Confirm Password"
                placeholder="confirm"
                required
                {...form.getInputProps("confirmPassword")}
              />
              <Button type="submit">Register</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}
