import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  deleteUser,
  editProfile,
  NAME_REGEX,
  useUser,
} from "../../api/user.ts";
import AlertModal from "../../components/AlertModal.tsx";
import { PrimaryButton } from "../../components/Button.tsx";
import SnackBar from "../../components/SnackBar.tsx";
import { SingleLineTextField } from "../../components/TextField.tsx";
import TitleBar from "../../components/TitleBar.tsx";
import useModalState from "../../hooks/modal.tsx";
import { usePasswordValidation } from "../../hooks/password.tsx";
import useSnackbar from "../../hooks/snackbar.tsx";
import useSubmitHandler from "../../hooks/submitHandler.tsx";

function Account() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useUser();

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
      navigate("/");
    },
  });

  const [deleteModalState, openDeleteModal, closeDeleteModal] = useModalState();

  const [name, setName] = useState(user?.name ?? "");
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isNameError, setIsNameError] = useState(false);

  useEffect(() => {
    if (name === "") {
      setIsNameError(false);
    } else {
      setIsNameError(!NAME_REGEX.test(name));
    }
  }, [isNameFocused]);

  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    setIsPasswordFocused,
    setIsConfirmPasswordFocused,
    isPasswordError,
    isConfirmPasswordError,
    isButtonDisabled,
  } = usePasswordValidation();

  const { showSnackbar, show } = useSnackbar();

  const submit = () => {
    if (!isNameError && !isPasswordError && !isConfirmPasswordError) {
      editUserMutate({ name, password });
    }
  };

  const { isSubmitting, handleSubmit } = useSubmitHandler();

  return (
    <Container>
      <TitleBar label="Account Settings" />
      <AccountForm
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(submit);
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
          maxLength={50}
          onFocus={() => {
            setIsNameFocused(true);
          }}
          onBlur={() => {
            setIsNameFocused(false);
          }}
          onChange={(e) => setName(e.target.value)}
          supportingText={
            isNameError ? "Name must be 2-16 characters long." : undefined
          }
          hasError={isNameError}
          value={name}
        />
        <SingleLineTextField
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => {
            setIsPasswordFocused(true);
          }}
          onBlur={() => {
            setIsPasswordFocused(false);
          }}
          supportingText={
            isPasswordError
              ? "Password must be 8-20 characters long, including at least one letter, one number, and one special character."
              : undefined
          }
          hasError={isPasswordError}
        />
        <SingleLineTextField
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={() => {
            setIsConfirmPasswordFocused(true);
          }}
          onBlur={() => {
            setIsConfirmPasswordFocused(false);
          }}
          supportingText={
            isConfirmPasswordError ? "Passwords do not match." : undefined
          }
          hasError={isConfirmPasswordError}
        />
        <div>
          <PrimaryButton
            style={{ width: "45rem" }}
            disabled={
              !NAME_REGEX.test(name) || isButtonDisabled || isSubmitting
            }
          >
            Save Changes
          </PrimaryButton>
          <DeleteUserButton onClick={openDeleteModal}>
            Delete my account
          </DeleteUserButton>
        </div>
        {showSnackbar && (
          <SnackBar isSuccess={true} message="All saved changes." />
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
