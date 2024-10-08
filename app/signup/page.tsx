"use client";
import { CheckSquareOutlined, LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, notification } from "antd";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const { data }: any = await axios.post("http://localhost:3010/auth/signup", values);

      notification.success({ message: "Signup successful!", description: "You can now log in." });
    } catch (error: any) {
      console.error("Signup failed:", error.response || error.message);

      const errorMessage = error.response?.data?.message || "An error occurred during signup.";
      notification.error({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="bg-[#f5f5f5] flex-center w-screen h-screen">
      <div className="w-[480px] bg-white p-12 flex flex-col justify-between gap-12">
        <div className="flex flex-col items-center gap-4">
          <Avatar style={{ backgroundColor: "#2dd4bf" }} size={64} icon={<UserOutlined />} />
          <div className="flex flex-col items-center">
            <h3 className="text-2xl leading-8">Hello, Friend!</h3>
            <p className="text-sm leading-6 text-[#000000e0]">Create an account, it’s free!</p>
          </div>
        </div>
        <div>
          <Form name="sign up" onFinish={onFinish} autoComplete="off">
            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "The input is not valid E-mail!" },
                { required: true, message: "Please input your E-mail!" },
              ]}
            >
              <Input placeholder="E-mail" prefix={<MailOutlined className="mr-1 !text-[#00000073]" />} />
            </Form.Item>
            <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
              <Input placeholder="Username" prefix={<UserOutlined className="mr-1 !text-[#00000073]" />} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]} hasFeedback>
              <Input.Password placeholder="Password" prefix={<LockOutlined className="mr-1 !text-[#00000073]" />} />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("The new password that you entered do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                prefix={<CheckSquareOutlined className="mr-1 !text-[#00000073]" />}
              />
            </Form.Item>
            <Button htmlType="submit" className="w-full" type="primary">
              Sign up
            </Button>
            <Link href="/login" className="block mt-1">
              I’m already a member
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
