"use client";
import Button from "@/components/Button";
import Form from "@/components/Form";
import FormItem from "@/components/FormItem";
import Input from "@/components/Input";
import graphqlActions from "@/graphql";
import useRefForm from "@/hooks/useRefForm";
import { isEmpty } from "@/ultis/helpers";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const loginMutation = graphqlActions.mutation.login;

const Login = (props: Props) => {
  const [form] = useRefForm();
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const [loginUser] = useMutation(loginMutation, {
    onCompleted: (dataReturn) => {
      if (!isEmpty(dataReturn.login.US_Email)) {
        localStorage.setItem("email", dataReturn.login.US_Email);
        localStorage.setItem("name", dataReturn.login.US_Name);
        localStorage.setItem("id", dataReturn.login.US_Id);
        router.push("/");
        setShowError(false);
      }
      setShowError(true);
    },
    onError: () => {
      setShowError(true);
    },
  });

  const handleSubmit = async (data: any) => {
    const { email, password } = data ?? ({} as any);
    if (isEmpty(email) || isEmpty(password)) return;

    return loginUser({
      variables: {
        loginInput: {
          email,
          password,
        },
      },
    });
  };
  return (
    <div className="relative">
      <h3>Sign In</h3>
      <Button className="absolute" style={{ top: -250 }} type="button" onClick={() => setShowEmail((prevState) => !prevState)}>
        show email password
      </Button>
      {showEmail ? (
        <div className="absolute border rounded border-green-500 p-5" style={{ top: -200 }}>
          <p>
            <span className="text-lime-500">Email:</span> haito@gmail.com
          </p>
          <p>
            <span className="text-lime-500">Password:</span> Haito_123*
          </p>
        </div>
      ) : (
        <></>
      )}
      <Form form={form} onSubmit={handleSubmit}>
        <FormItem
          label="email"
          name="email"
          rules={[
            {
              required: {
                value: true,
                message: "Email is required!",
              },
            },
          ]}
        >
          <Input type="text" placeholder="email" />
        </FormItem>
        <FormItem
          label="password"
          name="password"
          rules={[
            {
              required: {
                value: true,
                message: "Password is required!",
              },
            },
          ]}
        >
          <Input type="password" placeholder="password" />
        </FormItem>

        <Button type="submit">submit</Button>
      </Form>
      {showError ? (
        <div className="pt-5">
          <span className="errorMessage text-red-500">
            Email or password is wrong!
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Login;
