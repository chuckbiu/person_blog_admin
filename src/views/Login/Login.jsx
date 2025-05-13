import React from 'react'
import axios from 'axios';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import ParticlesBg from 'particles-bg' // 背景插件
import styles from './Login.module.scss'
// import { config } from '../../plugnConfig/LoginBackground';
export default function Login() {
    const getclick = () => {
        // 取
        axios.get('http://localhost:3000/posts').then(res => {
            console.log(res)
        })
    }
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <>
         <div className={styles.login}>
            {/* login
            <Button onClick={getclick}>Button</Button> */}
            <Form
                name="normal_login"
                className={styles.loginform}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                    <a className="login-form-forgot" href="">
                        忘记密码
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    <a href="">现在注册</a>
                </Form.Item>
            </Form>
        </div>
        <ParticlesBg type="ball"  bg={true} color='#001529' />
        </>
       
    )
}
