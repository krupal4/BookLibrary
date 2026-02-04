import type { FormProps } from "antd";
import { Button, Form, Input, message, Card, Typography } from "antd";
import React from "react";
import { Navigate, useNavigate } from "react-router";
import { ApiClient } from "~/common/ApiClient";
import { AxiosHelper } from "~/common/AxiosHelper";
import ApiConstants from "~/constants/ApiConstants";
import type { LoginResponse } from "~/models/response/LoginResponse";

const { Title } = Typography;

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const SignUpPage: React.FC = () => {
   if (AxiosHelper.getJwtToken() !== null) {
    return <Navigate to="/dashboard" replace />;
  }

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

      const response: any = await ApiClient.instance.post<LoginResponse>(
        ApiConstants.signup,
        {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      );

      message.success("Sign up successful!");
      navigate("/dashboard");
    } catch (error: any) {
      console.log("error; ", error)
      message.error(error.message ?? "Sign up failed!");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {
    message.error("Please fill in all required fields!");
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
          Sign Up
        </Title>
        
        <Form
          name="signup"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input size="large" placeholder="Enter your name" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" }
            ]}
          >
            <Input size="large" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" }
            ]}
          >
            <Input.Password size="large" placeholder="Enter your password" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: "Please confirm your password!" },
            ]}
          >
            <Input.Password size="large" placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              size="large"
              block
            >
              Sign Up
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            Already have an account? <a href="/login">Login</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;