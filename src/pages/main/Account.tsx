import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  deleteUser,
  editProfile,
  NAME_REGEX,
  PASSWORD_REGEX,
  useUser,
} from "../../api/user.ts";
import AlertModal from "../../components/AlertModal.tsx";
import { PrimaryButton } from "../../components/Button.tsx";
import SnackBar from "../../components/SnackBar.tsx";
import { SingleLineTextField } from "../../components/TextField.tsx";
import TitleBar from "../../components/TitleBar.tsx";
import useModalState from "../../hooks/modal.tsx";
import useSnackbar from "../../hooks/snackbar.tsx";

function Account() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useUser();

  const [name, setName] = useState(user?.name ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nameError = name.match(NAME_REGEX) == null;
  const passwordError = password.match(PASSWORD_REGEX) == null;
  const confirmPasswordError = password !== confirmPassword;

  const { showSnackbar, show } = useSnackbar();
  const [showError, setShowError] = useState(false);

  const { mutate: editUserMutate } = useMutation({
    mutationFn: editProfile,
    mutationKey: ["editProfile"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setPassword("");
      setConfirmPassword("");
      show();
    },
  });

  const { mutate: deleteUserMutate } = useMutation({
    mutationFn: deleteUser,
    mutationKey: ["deleteUser"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const [deleteModalState, openDeleteModal, closeDeleteModal] = useModalState();

  return (
    <Container>
      <TitleBar label="Account Settings" />
      <AccountForm
        onSubmit={(e) => {
          e.preventDefault();

          if (nameError || passwordError || confirmPasswordError) {
            setShowError(true);
            return;
          }

          editUserMutate({ name, password });
        }}
      >
        <SingleLineTextField
          label="Email Address"
          value={user?.email ?? ""}
          readOnly
        />
        <SingleLineTextField
          type="text"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          supportingText={
            showError && nameError
              ? "name must be 2-16 characters long"
              : undefined
          }
          hasError={showError && nameError}
          value={name}
        />
        <SingleLineTextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          supportingText={
            " Password must be at least 8 characters long, with a letter, number, and special character."
          }
          hasError={showError && passwordError}
        />
        <SingleLineTextField
          type="password"
          label="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          supportingText={
            showError && confirmPasswordError
              ? "Passwords do not match"
              : undefined
          }
          hasError={showError && confirmPasswordError}
        />
        <div>
          <PrimaryButton
            style={{ width: "45rem" }}
            disabled={name === "" || password === "" || confirmPassword === ""}
          >
            Save Changes
          </PrimaryButton>
          <DeleteUserButton onClick={openDeleteModal}>
            Delete my account
          </DeleteUserButton>
        </div>
        {showSnackbar && (
          <SnackBar isSuccess={true} message="Successfully saved changes." />
        )}
      </AccountForm>
      {/* 계정 삭제 모달 */}
      <AlertModal
        state={deleteModalState}
        type="delete"
        title="Delete Account"
        content={
          <p>
            Are you sure you want to delete your account? <br />
            This action is
            <span style={{ color: "red" }}> permanent</span> and cannot be
            undone.
          </p>
        }
        onCancel={() => {
          closeDeleteModal();
        }}
        onConfirm={() => {
          deleteUserMutate();
          closeDeleteModal();
          navigate("/");
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const AccountForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  margin-left: 6rem;

  & > * {
    margin-bottom: 3.4rem;
  }
`;

const DeleteUserButton = styled.p`
  ${({ theme }) => theme.typography.b3};
  width: fit-content;
  color: #a0a0a0;
  text-decoration: underline;

  align-self: flex-start;
  margin-top: 1.5rem;

  cursor: pointer;
`;

export default Account;
