import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { ApiClient } from "~/common/ApiClient";
import ApiConstants from "~/constants/ApiConstants";
import type { LoginResponse } from "~/models/response/LoginResponse";

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
  remember?: string;
  confirmPassword?: string;
};

const SignUpPage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      if (values.password !== values.confirmPassword) {
        message.error("Passwords do not match!");
        setLoading(false);
        return;
      }

      //  TODO: AxiosResponse<LoginResponse>
      const response: any = await ApiClient.instance.post<LoginResponse>(
        ApiConstants.signup,
        {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      );

      message.success("Sign up successful!");

      navigate("/books");
    } catch (error: any) {
      message.error(error.response?.data?.message || "Sign up failed!");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        label="Confirm Password"
        name="confirmPassword"
        rules={[{ required: true, message: "Please confirm your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>


      Already have an account? <a href="/login" >Login</a>
    </Form>
  );
};

export default SignUpPage;