"use client";
import { CheckSquareOutlined, LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Checkbox, Form, Input, notification } from "antd";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const { data }: any = await axios.post("http://localhost:3010/auth/login", values);
      console.log("onFinish ~ data:", data);

      notification.success({ message: "Signup successful!", description: "You can now log in." });
    } catch (error: any) {
      console.error("Signup failed:", error.response || error.message);

      const errorMessage = error.response?.data?.message || "An error occurred during signup.";
      notification.error({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };
  //   const onFinishFailed = (errorInfo: any) => {
  //     console.log("Failed:", errorInfo);
  //   };
  return (
    <div className="bg-[#f5f5f5] flex-center w-screen h-screen">
      <div className="w-[480px] bg-white p-12 flex flex-col justify-between gap-12">
        <div className="flex flex-col items-center gap-4">
          <Avatar style={{ backgroundColor: "#2dd4bf" }} size={64} icon={<UserOutlined />} />
          <div className="flex flex-col items-center">
            <h3 className="text-2xl leading-8">Hello, Friend!</h3>
            <p className="text-sm leading-6 text-[#000000e0]">Sign in to your account to continue</p>
          </div>
        </div>
        <div>
          <Form name="sign up" onFinish={onFinish} autoComplete="off">
            <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
              <Input placeholder="Username" prefix={<UserOutlined className="mr-1 !text-[#00000073]" />} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]} hasFeedback>
              <Input.Password placeholder="Password" prefix={<LockOutlined className="mr-1 !text-[#00000073]" />} />
            </Form.Item>
            <div className="flex justify-between">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link href="#">Forgot password</Link>
            </div>
            <Button htmlType="submit" className="w-full" type="primary">
              Login
            </Button>
            <p className="mt-1">
              Or
              <Link href="#" className="ml-1">
                Register now!
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
