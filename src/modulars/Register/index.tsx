"use client";
import { isEmpty } from "@/ultis/helpers";
import Form from "@/components/Form";
import FormItem from "@/components/FormItem";
import Input from "@/components/Input";
import useRefForm from "@/hooks/useRefForm";
import React from "react";

type Props = {};

const Register = (props: Props) => {
  const [form] = useRefForm();

  const handleSubmit = async (data: any) => {
    const { email, password } = data ?? ({} as any);
    if (isEmpty(email) || isEmpty(password)) return;
    console.log({ email, password });
  };
  return (
    <div>
      <h3>Sign Up</h3>
      <Form form={form} onSubmit={handleSubmit}>
        <FormItem
          label="email"
          name="email"
          rules={[
            {
              required: {
                value: true,
                message: "email khong duoc de trong",
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
                message: "password khong duoc de trong",
              },
            },
          ]}
        >
          <Input type="password" placeholder="password" />
        </FormItem>

        <button
          type="submit"
          className="bg-secondary-color px-5 py-2 rounded hover:pointer"
        >
          submit
        </button>
      </Form>
    </div>
  );
};

export default Register;
