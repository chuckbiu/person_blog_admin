import React, { useEffect, useState } from 'react'
import {
    LeftSquareTwoTone,
    RightSquareTwoTone,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    MergeCellsOutlined,
    DownOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Avatar, Dropdown } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import './css/styles.scss'
import { click } from '@testing-library/user-event/dist/click';
const { Header, Sider, Content } = Layout;
export default function SandBox() {
    const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const location = useLocation();
    // const [defaultSelectedKeysValue, setDefaultSelectedKeysValue] = useState([location.pathname])
    const defaultSelectedKeysValue = [location.pathname.slice(8)]
    const defaultOpenKeysValue = ['/' + location.pathname.split('/')[2]]

    useEffect(() => {
        axios.get('http://localhost:3000/rights').then(res => {
            res.data.map((item) => {
                // console.log(item)
                item.label = item.title
                if (item.children?.length > 0) {
                    item.children.map((item) => {
                        item.label = item.title
                        delete item.rightId
                    })
                } else {
                    delete item.children
                }
            })
            // console.log(res.data)

            setMenuItems(res.data)
            // setDefaultSelectedKeysValue([location.pathname])
            // console.log(location.pathname.split('/')[2])

        })
    }, [])

    const iconClick = (data) => {
        // console.log(data)
        navigate('/sandbox' + data.key)
        // let array = []
        // array.push(key)
        // setDefaultSelectedKeysValue(array);
        // switch (key) {
        //     case '1':
        //         navigate('/sandbox/home')
        //         break;
        //     case '2':
        //         navigate('/sandbox/user-manage/list')
        //         break;
        //     case '3':
        //         navigate('/sandbox/right-manage/role/list')
        //         break;
        //     case '4':
        //         navigate('/sandbox/right-manage/right/list')
        //         break;
        //     default:
        //         break;
        // }
        // console.log(defaultSelectedKeysValue)
        // console.log(location.pathname)
    }
    const items = [
        {
            label: '基本信息',
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: <div onClick={() => {
                navigate('/login'
            )}}>退出登录</div>,
            key: '3',
        },
    ];
    // 菜单数组
    const [menuItems, setMenuItems] = useState([
        {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1',
        },
        {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
        },
        {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
        },
        {
            key: '4',
            icon: <MergeCellsOutlined />,
            label: 'nav 4',
            children: [
                {
                    key: '5',
                    label: 'Option 5',
                },
                {
                    key: '6',
                    label: 'Option 6',
                },
                {
                    key: '7',
                    label: 'Option 7',
                },
                {
                    key: '8',
                    label: 'Option 8',
                },
            ],
        }
    ])
    const handleSelect = (e) => {
        console.log('selected', e);
    }
    // 第一次选中的菜单
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" style={{ textAlign: 'center', margin: '10px' }}>
                    <span style={{ color: '#8badac', textAlign: 'center' }}>
                        海学
                    </span>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={defaultSelectedKeysValue}
                    defaultOpenKeys={defaultOpenKeysValue}
                    onSelect={iconClick}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <RightSquareTwoTone /> : <LeftSquareTwoTone />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className='header-right'>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            trigger={['click']}
                            placement="bottom"
                        >
                            <div onClick={(e) => e.preventDefault()}>
                                <span className='header-right-username'>admin</span>
                                <DownOutlined />
                            </div>
                        </Dropdown>
                        <Avatar src={<img src={url} alt="avatar" />} />
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: '85vh',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
