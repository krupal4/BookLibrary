import type { FormProps } from "antd";
import { Button, Form, Input, message, Card, Typography } from "antd";
import React from "react";
import { Navigate } from "react-router";
import { useNavigate } from "react-router";
import { AxiosHelper } from "~/common/AxiosHelper";
import { Repository } from "~/common/Repository";
import type { LoginResponse } from "~/models/response/LoginResponse";

const { Title } = Typography;

type FieldType = {
  email?: string;
  password?: string;
};

const LoginPage: React.FC = () => {
    if (AxiosHelper.getJwtToken() !== null) {
    return <Navigate to="/dashboard" replace />;
  }

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
          Login
        </Title>
        
        <Form
          name="login"
          layout="vertical"
          initialValues={{ email: "krupal@gmail.com", password: "Krupal@123" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              size="large"
              block
            >
              Login
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            Don't have an account? <a href="/signup">Sign Up</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;