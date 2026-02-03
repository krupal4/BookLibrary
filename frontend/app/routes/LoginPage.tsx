import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { StylesProvider } from "../StylesProvider";
import axios, { type AxiosResponse } from 'axios';
import { ApiClient } from '~/common/ApiClient';
import { useNavigate } from "react-router";
import type { LoginResponse } from '~/models/response/LoginResponse';

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const LoginPage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setLoading(true);
    try {

      //  TODO: AxiosResponse<LoginResponse>
      const response: any = await ApiClient.instance.post<LoginResponse>("/api/auth/login", {
        email: values.email,
        password: values.password, 
      });
      
      message.success('Login successful!');
      
      console.log("saving token: ", response.token)
      localStorage.setItem("authToken", response.data.token);
      navigate("/books");
      
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Login failed!');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StylesProvider>
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
          label="Email"
          name="email"
          initialValue="krupal@gmail.com"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          initialValue="Krupal@123"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </StylesProvider>
  );
};

export default LoginPage;