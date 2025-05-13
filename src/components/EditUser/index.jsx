import React, { useEffect, useState, forwardRef } from 'react'
import { Table, Space, Switch, Tag, Pagination, Button, message, Popconfirm, Select, Form, Modal, Radio, Input } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
} from '@ant-design/icons';
const EditUser = forwardRef((props) => {
    const rolesId = ['超级管理员', '区域管理员', '区域编辑']


    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState();
    const [open, setOpen] = useState(false);
    const [regionlist, setRegionlist] = useState([]);
    const [roleslist, setRoleslist] = useState([])
    const [regionVaild, setRegionVaild] = useState(true);


    const onCreate = (values) => {
        console.log('Received values of form: ', values, props.itemData);
        const data = {...props.itemData, ...values}
        setFormValues(values);
        setOpen(false);
        props.handlEditModalCancel();
        props.handleEditModaladmit(data);
    };
    const handleChange = (value) => {
        if (value == 1) {
            setRegionlist([])
            setRegionVaild(false)
            form.setFieldValue('region', '')
        } else {
            setRegionVaild(true)

            setRegionlist(props.regionList.map(item => {
                return {
                    label: item.title,
                    value: item.value
                }
            }))
        }
    };
    const RegionhandleChange = (value) => {
        console.log(`selected ${value}`);
    };

    useEffect(() => {
        // console.log(form)
        setOpen(props.editModalVisible)
        setRegionlist(props.regionList.map(item => {
            return {
                label: item.title,
                value: item.value
            }
        }))
        setRoleslist(props.rolesList.map(item => {
            return {
                label: item.roleName,
                value: item.id

            }
        }))
        setTimeout(()=>{
            console.log(props.itemData)
            form.setFieldsValue(props.itemData)
            form.setFieldValue('roleId', rolesId[props.itemData?.roleId - 1])
            if (props.itemData?.region == ''){
                setRegionlist([])
                setRegionVaild(true)
            }
        }, 300)
    }, [props])
    return (
        <Modal
            open={open}
            title="编辑用户"
            okText="Create"
            cancelText="Cancel"
            okButtonProps={{
                autoFocus: true,
                htmlType: 'submit',
            }}
            onCancel={() => { setOpen(false); props.handlEditModalCancel(); }}
            destroyOnClose
            modalRender={(dom) => (
                <Form
                    layout="vertical"
                    form={form}
                    name="form_in_modal"
                    initialValues={{
                        modifier: 'public',
                    }}
                    clearOnDestroy
                    onFinish={(values) => onCreate(values)}
                >
                    {dom}
                </Form>
            )}
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[
                    {
                        required: true,
                        message: '请输入你的用户名',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="password" label="密码" rules={[
                {
                    required: true,
                    message: '请输入你的密码',
                },
            ]}>
                <Input type='password' />
            </Form.Item>
            <Form.Item name="region" label="区域" rules={regionVaild ? [
                {
                    required: true,
                    message: '请选择你的区域',
                },
            ] : []}>
                <Select
                    defaultValue='请选择你的区域'
                    style={{
                        width: 470,
                    }}
                    onChange={RegionhandleChange}
                    options={regionlist}
                    disabled={regionlist.length == 0}
                />
            </Form.Item>
            <Form.Item name="roleId" label="角色" rules={[
                {
                    required: true,
                    message: '请选择你的角色',
                },
            ]}>
                <Select
                    defaultValue='请选择你的角色'
                    style={{
                        width: 470,
                    }}
                    onChange={handleChange}
                    options={roleslist}
                />
            </Form.Item>

        </Modal>
    )
})
export default EditUser