'use client';

import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Checkbox, Space, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CreateUserData } from "@/reducer/thunks";

const { Option } = Select;

const Register: React.FC = () => {
  const dispatch = useDispatch<any>();
  const {
    loading: createUserLoading,
    error: createUserError,
    userData: createUserResponse,
  } = useSelector((state: any) => state.userData);

  const [form] = Form.useForm();
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (createUserResponse) {
        if (typeof window !== "undefined" && createUserResponse?.user) {
      // localStorage.setItem("userId", loginResponse.userId);
      localStorage.setItem("tokenId", createUserResponse.token);

      // Redirect to home page after setting the localStorage
      window.location.href = "/";
    }
    }
    if (createUserError) {
      alert(createUserError);
    }
  }, [createUserResponse, createUserError]);

  const onFinish = (values: any) => {
    if (!agreed) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    const payload = {
      firstname: values.fullName,
      lastname: values.userName,
      mobilenumber: values.phone,
      email: values.email,
      password: values.password,
      serviceCountry: values.serviceCountry,
      serviceCity: values.serviceCity,
      serviceArea: values.serviceArea,
      UserType: "1",
    };

    dispatch(CreateUserData(payload));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <div className="text-center mb-6 text-xl font-semibold">Sign Up</div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter your full name' }]}
              >
                <Input placeholder="Full Name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="userName"
                label="User Name"
                rules={[{ required: true, message: 'Please enter your user name' }]}
              >
                <Input placeholder="User Name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter your phone number' }]}
              >
                <Input addonBefore="+91" placeholder="81234 56789" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter your password' }]}
                hasFeedback
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="serviceCountry"
                label="Service Country"
                rules={[{ required: true, message: 'Please select a country' }]}
              >
                <Select placeholder="Select Country">
                  <Option value="india">India</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="serviceCity"
                label="Service City"
                rules={[{ required: true, message: 'Please select a city' }]}
              >
                <Select placeholder="Select City">
                  <Option value="51">Bangalore</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="serviceArea"
                label="Service Area"
                rules={[{ required: true, message: 'Please select a service area' }]}
              >
                <Select placeholder="Select Area">
                  <Option value="north-bangalore">North Bangalore</Option>
                  <Option value="south-bangalore">South Bangalore</Option>
                  <Option value="east-bangalore">East Bangalore</Option>
                  <Option value="west-bangalore">West Bangalore</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item>
                <Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)}>
                  I agree to the{' '}
                  <a href="/terms" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                    Terms & Conditions
                  </a>
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className='w-25'
              disabled={!agreed || createUserLoading}
              loading={createUserLoading}
              block
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
