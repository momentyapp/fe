import { useState } from "react";
import { useNavigate } from "react-router";

import API from "~/apis";

import AppBar from "~/components/common/AppBar";
import ErrorModal from "~/components/common/ErrorModal";

import useSession from "~/contexts/useSession";

import Bottom from "~/components/login/Bottom";
import Body from "~/components/login/Body";
import Top from "~/components/login/Top";

export default function Login() {
  const session = useSession();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await API.auth.login({ username, password });
    const { code, result, message } = response.data;

    if (code === "success" && result !== undefined) {
      session.login(result.user, result.accessToken, result.refreshToken);
      navigate("/");
    } else {
      setErrorMessage(message);
      setErrorModalOpen(true);
    }
  }

  return (
    <>
      <AppBar />
      <Top />
      <Body
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        onSubmit={handleSubmit}
      />
      <Bottom onSubmit={() => handleSubmit} />

      <ErrorModal
        message={errorMessage}
        isOpen={errorModalOpen}
        onRequestClose={() => setErrorModalOpen(false)}
      />
    </>
  );
}
