import { useForm } from "@mantine/form";
import { AxiosError } from "axios";
import { login } from "../../api/index";
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
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: ""
    }
  });

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof login>["0"]
  >(login, {
    onSuccess: () => {
      router.push("/");
    }
  });

  return (
    <>
      <Head>
        <title>Login</title>
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
                label="Password"
                placeholder="password"
                required
                {...form.getInputProps("password")}
              />
              <Button type="submit">Login</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}
