import React, { useEffect, useState, forwardRef, useRef } from 'react'
import { Table, Space, Switch, Tag, Pagination, Button, message, Popconfirm, Select, Form, Modal, Radio, Input } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { render } from '@testing-library/react';
import XinzengUser from '../../../components/xinzenguser';
import EditUser from '../../../components/EditUser'
export default function UserList() {

    const rolesId = ['超级管理员', '区域管理员', '区域编辑']

    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            key: 'region',
            width: '12%',
            render: (text, record) => {
                return (
                    record.region == '' ? '全球' : record.region
                )
            }
        },
        {
            title: '角色名称',
            dataIndex: 'roleId',
            key: 'roleId',
            render: (text, record) => {
                return (
                    rolesId[record.roleId - 1]
                )
            }
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '用户状态',
            dataIndex: 'key',
            width: '30%',
            key: 'key',
            render: (text, record) => {
                return <Switch checked={record.roleState} onChange={() => { handleSwitch(record) }} disabled={record.default} checkedChildren="开启" unCheckedChildren="关闭"  >

                </Switch>
            },
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            render: (text, record) =>
                <>
                    <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => {
                        setEditModalVisible(true)
                        setItemData(record)

                    }} />
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => {
                        deleteUser(record)
                    }} />


                </>
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };
    const [data, setData] = useState([]);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

    const [regionList, setRegionList] = useState([]);
    const [rolesList, setRolesList] = useState([]);
    const [itemData, setItemData] = useState(null);

    const formRef = useRef(null)
    // 表格数据
    useEffect(() => {
        axios.get('http://localhost:3000/users').then(res => {
            res.data.map((item) => {
                item.key = item.id
            })
            setData(res.data)
        })
    }, [itemData])
    // 地区数据
    useEffect(() => {
        axios.get('http://localhost:3000/regions').then(res => {
            setRegionList(res.data)
        })

    }, [])
    // 角色列表
    useEffect(() => {
        axios.get('http://localhost:3000/roles').then(res => {
            setRolesList(res.data)
        })
    }, [])
    const showAddModal = () => {
        setAddModalVisible(true);
    };
    const handleAddModalClose = () => {
        setAddModalVisible(false);
    };
    const handlEditModalCancel = () => {
        setEditModalVisible(false);
    };
    const handleAddModaladmit = (params) => {
        axios.post('http://localhost:3000/users', {
            ...params,
            "roleState": true,
            "default": false
        }).then(res => {
            console.log(res.data)
            setData([...data, res.data])
        }).catch(err => {
            console.log(err)
        })
    };

    const deleteUser = (item) => {
        setData(data.filter((item1 => item.id !== item1.id)))
        axios.delete(`http://localhost:3000/users/${item.id}`)
    }
    const handleSwitch = (item) => {
        item.roleState = !item.roleState
        setData([...data])
        axios.patch(`http://localhost:3000/users/${item.id}`, {
            roleState: item.roleState
        })
        
    }

    const handleEditModaladmit = (values) => {
        // 请求后端
        console.log(values.id)
        axios.patch(`http://localhost:3000/users/${values.id}`, {
            ...values
        })
        setItemData(values)
    }
    return (
        <div>
            <div>
                <Button type="primary" onClick={showAddModal}>添加用户</Button>
            </div>

            <Table
                columns={columns}
                rowSelection={{
                    ...rowSelection,
                    // checkStrictly,
                }}
                dataSource={data}
                pagination={{
                    position: ['bottomLeft'],
                    pageSize: 5
                }}
            />
            <XinzengUser addModalVisible={addModalVisible} handleAddModalClose={handleAddModalClose} regionList={regionList} rolesList={rolesList} ref={formRef} handleAddModaladmit={handleAddModaladmit} />
            <EditUser editModalVisible={editModalVisible} regionList={regionList} rolesList={rolesList} handlEditModalCancel={handlEditModalCancel} itemData={itemData} handleEditModaladmit={handleEditModaladmit} />
        </div>

    )
}
