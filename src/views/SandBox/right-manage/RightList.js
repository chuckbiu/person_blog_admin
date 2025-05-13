import React, { useEffect, useState } from 'react'
import { Table, Space, Switch, Tag, Pagination, Button, message, Popconfirm, Popover } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import axios from 'axios';
export default function RightList() {
    const content = (record) => {
        return (
            <div>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={record.pagepermisson == 1 ? true : false} onChange={(checked) => {
                    console.log('change', checked, record)
                    // web
                    record.pagepermisson = record.pagepermisson == 1 ? 0 : 1
                    setData([...data])

                    if (record.grade == 1) {
                        axios.patch(`http://localhost:5000/rights/${record.id}`, {
                            pagepermisson: record.pagepermisson
                        })
                    } else {
                        axios.patch(`http://localhost:5000/children/${record.id}`, {
                            pagepermisson: record.pagepermisson
                        })
                    }
                }} />

            </div>
        )
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '12%',
        },
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '路由权限',
            dataIndex: 'key',
            width: '30%',
            key: 'key',
            render: (text, record) => {
                return <Tag color="green">{record.key}</Tag>
            },
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            render: (text, record) =>
                <>
                    <Popover content={content(record)} title="" trigger={record.pagepermisson == undefined ? '' : 'click'}>
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => {
                            console.log('edit', record.id)

                        }} disabled={record.pagepermisson == 1 ? false : true} />
                    </Popover>

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
    // const data = [
    //     {
    //         key: 1,
    //         name: 'John Brown sr.',
    //         age: 60,
    //         address: 'New York No. 1 Lake Park',
    //         children: [
    //             {
    //                 key: 11,
    //                 name: 'John Brown',
    //                 age: 42,
    //                 address: 'New York No. 2 Lake Park',
    //             },
    //             {
    //                 key: 12,
    //                 name: 'John Brown jr.',
    //                 age: 30,
    //                 address: 'New York No. 3 Lake Park',
    //                 children: [
    //                     {
    //                         key: 121,
    //                         name: 'Jimmy Brown',
    //                         age: 16,
    //                         address: 'New York No. 3 Lake Park',
    //                     },
    //                 ],
    //             },
    //             {
    //                 key: 13,
    //                 name: 'Jim Green sr.',
    //                 age: 72,
    //                 address: 'London No. 1 Lake Park',
    //                 children: [
    //                     {
    //                         key: 131,
    //                         name: 'Jim Green',
    //                         age: 42,
    //                         address: 'London No. 2 Lake Park',
    //                         children: [
    //                             {
    //                                 key: 1311,
    //                                 name: 'Jim Green jr.',
    //                                 age: 25,
    //                                 address: 'London No. 3 Lake Park',
    //                             },
    //                             {
    //                                 key: 1312,
    //                                 name: 'Jimmy Green sr.',
    //                                 age: 18,
    //                                 address: 'London No. 4 Lake Park',
    //                             },
    //                         ],
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    //     {
    //         key: 2,
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sydney No. 1 Lake Park',
    //     },
    // ];
    useEffect(() => {
        axios.get('http://localhost:3000/rights').then(res => {
            // console.log(res)
            res.data.map((item) => {
                if (item.children?.length != 0) {
                } else {
                    delete item.children
                }
            })
            setData(res.data)
        })
    }, [])
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
    const [checkStrictly, setCheckStrictly] = useState(false);
    const [data, setData] = useState([]);
    const confirm = (params) => {
        // console.log('delete', params, data)
        if (params.grade == 1) {
            setData(data.filter(item => item.id !== params.id))
            axios.delete(`http://localhost:3000/rights/${params.id}`).then(res => {
                setTimeout(() => { }, 1000);
            })
        } else {
            axios.delete(`http://localhost:3000/children/${params.id}`).then(res => {
                setTimeout(() => { }, 1000);
            })

            setData(data.filter(item => item.children?.filter(item => item.id !== params.id)))
        }

    }
    return (
        <>
            <Space
                align="center"
                style={{
                    marginBottom: 16,
                }}
            >
                {/* CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} /> */}
            </Space>
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
        </>
    );
}
