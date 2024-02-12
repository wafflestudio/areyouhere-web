import styled from "styled-components";
import TransferBanner from "../../components/TransferBanner";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import {
  OptionalActionLabel,
  OptionalActionLink,
} from "../../components/OptionalAction";
import { postSignUp } from "../../api/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function SignUp() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // TODO: handle failure cases
  const { mutate } = useMutation({
    mutationFn: postSignUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/admin");
    },
  });

  return (
    <Container>
      <TransferBanner from="admin" />
      <Title>Create a free account</Title>
      <InputContainer
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: input field validations
          mutate({ name, email, password });
        }}
      >
        <TextField
          autoComplete="name"
          type="text"
          label="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          autoComplete="email"
          type="email"
          label="Email address"
          style={{ marginTop: "1.4rem" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          autoComplete="new-password"
          type="password"
          label="Password"
          style={{ marginTop: "1.4rem" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          autoComplete="new-password"
          type="password"
          label="Repeat password"
          style={{ marginTop: "1.4rem" }}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <Button style={{ marginTop: "3.0rem" }}>Sign up</Button>
        <OptionalActionLabel style={{ marginTop: "5.0rem" }}>
          Already a member?{" "}
          <OptionalActionLink to="/admin/signin">Sign in</OptionalActionLink>
        </OptionalActionLabel>
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 3.8rem;

  margin-top: 11.1rem;
  margin-bottom: 6.6rem;
  text-align: center;
`;

const InputContainer = styled.form`
  max-width: 44.4rem;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export default SignUp;
