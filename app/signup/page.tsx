"use client";
import { CheckSquareOutlined, LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input } from "antd";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  //   const onFinish = (values: any) => {
  //     console.log("Success:", values);
  //   };
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
            <p className="text-sm leading-6 text-[#000000e0]">Create an account, it’s free!</p>
          </div>
        </div>
        <div>
          <Form name="sign up" autoComplete="off">
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
            <Link href="#" className="block mt-1">
              I’m already a member
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
