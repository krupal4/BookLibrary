import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { ApiClient } from "~/common/ApiClient";
import { Repository } from "~/common/Repository";
import ApiConstants from "~/constants/ApiConstants";
import type { LoginResponse } from "~/models/response/LoginResponse";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const LoginPage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const response: LoginResponse = await Repository.instance.login({
        email: values.email!,
        password: values.password!,
      });

      message.success("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      message.error(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    message.error(errorInfo?.message ?? "Failed!");
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ email: "krupal@gmail.com", password: "Krupal@123" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form.Item>

      <div>
        Already have an account? <a href="/signup">Sign Up</a>
      </div>
    </Form>
  );
};

export default LoginPage;
