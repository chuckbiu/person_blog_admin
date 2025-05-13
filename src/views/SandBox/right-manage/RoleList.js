import React, { useEffect, useState } from 'react'
import { Table, Switch, Tag, Pagination, Button, message, Popconfirm, Popover, Tree, Modal } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import axios from 'axios';
export default function RoleList() {

    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            roleName: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
            id: '1'
        },
        {
            key: '2',
            roleName: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
            id: '2'
        },
    ]);
    const [treeData, setTreeData] = useState([
        {
            title: 'Node1',
            value: '0-0',
            key: '0-0',
            children: [
                {
                    title: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0',
                },
            ],
        },
        {
            title: 'Node2',
            value: '0-1',
            key: '0-1',
            children: [
                {
                    title: 'Child Node3',
                    value: '0-1-0',
                    key: '0-1-0',
                },
                {
                    title: 'Child Node4',
                    value: '0-1-1',
                    key: '0-1-1',
                },
                {
                    title: 'Child Node5',
                    value: '0-1-2',
                    key: '0-1-2',
                },
            ],
        },
    ]);
    const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
    const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [currentId, setCurrentId] = useState(0)

    const onExpand = (expandedKeysValue) => {
        // console.log('onExpand', expandedKeysValue);

        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };
    const onSelect = (selectedKeysValue, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: '操作',
            dataIndex: 'roleType',
            key: 'roleType',
            render: (text, record) =>
                <>
                    <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => { showModal(record) }} />

                    <Popconfirm
                        title=""
                        description="您确定删除吗"
                        onConfirm={() => { confirm(record) }}
                        // onOpenChange={() => console.log('open change')}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button danger shape="circle" icon={<DeleteOutlined />} />
                    </Popconfirm>


                </>
        },
    ];
    useEffect(() => {
        axios.get('http://localhost:3000/roles').then(res => {
            setDataSource(res.data)
        }).catch(err => {
            console.log(err)
        })
        axios.get('http://localhost:3000/rights').then(res => {
            // console.log(res)
            setTreeData(res.data)

        })
    }, [])
    const confirm = (params) => {
        console.log('delete', params)
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (data) => {
        console.log('showModal', data)
        setCurrentId(data.id)
        setIsModalOpen(true);
        setCheckedKeys(data.rights)
    };
    const handleOk = () => {
        setIsModalOpen(false);
        // 同步datasource
        console.log(checkedKeys, dataSource, currentId)
        setDataSource(dataSource.map((item) => {
            if (item.id == currentId) {
                return {
                    ...item,
                    rights: checkedKeys
                }
            }
            return item
        }))
        // put后端
        axios.patch(`http://localhost:3000/roles/${currentId}`, {
            rights: checkedKeys

        })
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} rowKey="id" />
            <Modal title="操作" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Tree
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={onSelect}
                    selectedKeys={selectedKeys}
                    treeData={treeData}
                // defaultCheckedKeys={dataSource[0].rights}
                />

            </Modal>
        </div>
    )
}
