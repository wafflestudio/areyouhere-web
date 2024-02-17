import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { postSignIn } from "../../api/user";
import {
  OptionalActionLabel,
  OptionalActionLink,
} from "../../components/admin/OptionalAction";
import TransferBanner from "../../components/admin/TransferBanner";
import { PrimaryButton } from "../../components/Button";
import TextField from "../../components/TextField";

function SignIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // TODO: handle failure cases
  const { mutate } = useMutation({
    mutationFn: postSignIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/class");
    },
  });

  return (
    <Container>
      <TransferBanner from="admin" />
      <LoginContainer>
        <DisplayMessage>
          Simply manage attendance
          <br />
          for your seminars, meetings,
          <br />
          and lectures
        </DisplayMessage>
        <InputContainer
          onSubmit={(e) => {
            e.preventDefault();
            mutate({ email, password });
          }}
        >
          <TextField
            type="text"
            name="email"
            autoComplete="username"
            label="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            autoComplete="current-password"
            label="Password"
            style={{ marginTop: "1.4rem" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ForgotPasswordLink
            to="/admin/forgotpassword"
            style={{ marginTop: "1.4rem" }}
          >
            Forgot Password
          </ForgotPasswordLink>
          <PrimaryButton type="submit" style={{ marginTop: "3.0rem" }}>
            Sign In
          </PrimaryButton>
          <OptionalActionLabel style={{ marginTop: "5.0rem" }}>
            Don't have an account?{" "}
            <OptionalActionLink to="/admin/signup">
              Sign up now
            </OptionalActionLink>
          </OptionalActionLabel>
        </InputContainer>
      </LoginContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 14.7rem;
  margin-left: 14.3rem;
  margin-right: 14.6rem;
`;

const DisplayMessage = styled.p`
  font-size: 4.8rem;
  line-height: 5.8rem;
  color: #000000;
  font-weight: 800;
  flex: 1;
  margin-right: 10rem;
  width: 60.7rem;
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 44.4rem;
`;

const ForgotPasswordLink = styled(Link)`
  font-size: 1.6rem;
  color: #4f4f4f;
  text-decoration: none;
  font-weight: 400;
  margin-left: auto;
`;

export default SignIn;
