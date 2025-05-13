import React, { useEffect, useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  Switch,
  Radio,
  message,
  Checkbox
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./css/style.module.scss";
import { uploadItem } from "../../../api/itemList";
const { RangePicker } = DatePicker;

export default function TikuUpload() {
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 20,
        offset: 4,
      },
    },
  };
  const formItemLayoutxuanxiang = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 20,
      },
    },
  };
  const [dataSource, setDataSource] = useState({
    courseCategoryId: null,
    subjectType: "a",
  });
  const [visibleElements, setVisibleElements] = useState(3);
  const [componentVariant, setComponentVariant] = useState("outlined");
  const [singleSelection, setSingleSelection] = useState(0);
  const [istrueSelection, setIstrueSelection ] = useState(1);
  const [itemForm] =  Form.useForm();
  const [isTrueform] = Form.useForm();

  // function
  const onFormVariantChange = ({ variant }) => {
    setComponentVariant(variant);
  };
  const [itemType, setItemType] = useState(3);
  // 多选
  const [checked, setChecked] = useState(false);
  // 多选数组
  const [duoxuanArray, setDuoxuanArray] = useState([])
  // 单选事件
  const onItemTypeChange = (e) => {
    // console.log("radio checked", e.target.value);
    setItemType(e.target.value);
    const index = e.target.value;
    setVisibleElements(index);
  };
  // 多选事件
  const onDuoxuanTypeChange = (e) => {
    // console.log("check checked", e);
    setDuoxuanArray(e)
  }
  const onFinish = async (values) => {
    // names
    const { subjectType } = values
    const sinpleItemcontent = itemForm.getFieldsValue("names").names
    // console.log("Received values of form:", values, itemForm.getFieldsValue("names"), itemForm.getFieldValue("radiogroup"), singleSelection,  itemForm.getFieldValue("checkgroup"));
    // console.log("isTure", istrueSelection)
    // console.log(duoxuanArray)

    let sinpleItemdata = [{
      optionType: 1,
      optionContent: '',
      isCorrect: 0
    }]
    if (subjectType === 1) {
      //简答题型
      const res = await uploadItem(values)
      if (res.code == 20000){

        message.success(res.desc)
      }else {
        message.error(res.desc)

      }
    }
    else if (subjectType === 3){
      sinpleItemdata = [{
        optionType: 1,
        optionContent: '',
        isCorrect: 0
      }]
      sinpleItemcontent.map((item, index) => {
        if (index > 0){
          sinpleItemdata.push({
            optionType: 1,
            optionContent: '',
            isCorrect: 0
          })
        }
        sinpleItemdata[index].optionType = index + 1;
        sinpleItemdata[index].optionContent = item
        sinpleItemdata[index].isCorrect = 0
      })
      sinpleItemdata.map((item, index)=>{
        if (index + 1 == singleSelection){
          item.isCorrect = 1
        }else {
          item.isCorrect = 0
        }
      })
      const mergedObj = Object.assign(values, {
        subjectOptionDTOList: sinpleItemdata
      });
      //单选题型
      const res = await uploadItem(mergedObj)
      if (res.code == 20000){

        message.success(res.desc)
      }else {
        message.error(res.desc)

      }
    }
    else if (subjectType == 4) {
      sinpleItemdata = [{
        optionType: 1,
        optionContent: '',
        isCorrect: 0
      }]
      sinpleItemcontent.map((item, index) => {
        if (index > 0){
          sinpleItemdata.push({
            optionType: 1,
            optionContent: '',
            isCorrect: 0
          })
        }
        sinpleItemdata[index].optionType = index + 1;
        sinpleItemdata[index].optionContent = item
        sinpleItemdata[index].isCorrect = 0
      })

      sinpleItemdata.map((item, index)=>{
        let flag = false
        duoxuanArray.map((_item)=>{
          if (index == _item){
            flag = true
          }
        })
        if (flag){
          item.isCorrect = 1
        }else {
          item.isCorrect = 0
        }
      })

      const mergedObj = Object.assign(values, {
        subjectOptionDTOList: sinpleItemdata
      });
      //多选题型
      const res = await uploadItem(mergedObj)
      if (res.code == 20000){
        message.success(res.desc)
      }else {
        message.error(res.desc)

      }
    }
    else if (subjectType == 2) {
        const data = values
        data.isCorrect = data.switchField ? 1 : 0
      const res = await uploadItem(data)
      if (res.code == 20000){
        message.success(res.desc)
      }else {
        message.error(res.desc)

      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //单选 正确选项
  const onChangeitemTruth = (e) => {
    console.log('radio checked', e.target.value);
    setSingleSelection(e.target.value);
  }
  //判断 正确选项
  const onIsTrueitem = (e) => {
    setIstrueSelection(e.target.value)
  }

  const duoxuanClick = (checked) => {
    setChecked(checked)
  }
  const firstInputChange = (value) => {
    // console.log(value.target.value, isTrueform.getFieldValue('optionContent1'))
    isTrueform.setFieldValue('optionContent1', value.target.value)
  }
  // useEffect(() => {
  //   console.log("dataSource", dataSource);
  // }, [dataSource]);
  return (
    <div>
      <h2>添加题目</h2>
      <Form
        {...formItemLayout}
        onValuesChange={onFormVariantChange}
        variant={componentVariant}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          variant: componentVariant,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ switchField: false }}
      >
        <Form.Item
          label="所属科目"
          name="courseCategoryId"
          rules={[
            {
              required: true,
              message: "请选择",
            },
          ]}
          initialValue={"1"}
        >
          <Select
            defaultValue={"1"}
            // value={}
            options={[
              {
                value: "1",
                label: "数据库",
              },
              {
                value: "2",
                label: "英语",
              },
              {
                value: "3",
                label: "数学",
              },
            ]}
          />
        </Form.Item>
        {/*
         * 1-简答 2-判断 3-单选 4-多选
         */}
        <Form.Item
          name="subjectType"
          label="题目类型"
          rules={[
            {
              required: true,
              message: "请选择题目类型!",
            },
          ]}
          initialValue={3}
        >
          <Radio.Group
            onChange={onItemTypeChange}
            value={itemType}
            defaultValue={itemType}
          >
            <Radio value={3}>单选题</Radio>
            <Radio value={4}>多选题</Radio>
            <Radio value={2}>判断题</Radio>
            <Radio value={1}>简答题</Radio>
          </Radio.Group>
        </Form.Item>
        {visibleElements === 3 && (
          <div>
            <Form.Item
              label="题目名称"
              name="subjectName"
              rules={[
                {
                  required: true,
                  message: "请输入!",
                },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                }}
                placeholder="请输入题目名称"
              />
            </Form.Item>
            <Form.Item label="题目难度">
              <Form.Item name="difficulty" noStyle>
                <InputNumber min={1} max={5} placeholder="数字" />
              </Form.Item>
              <span
                className="ant-form-text"
                style={{
                  marginInlineStart: 8,
                }}
              >
                1-5分 题目难度
              </span>
            </Form.Item>
            <Form.Item label="题目分值">
              <Form.Item name="score" noStyle>
                <InputNumber min={1} max={100} placeholder="数字" />
              </Form.Item>
              <span
                className="ant-form-text"
                style={{
                  marginInlineStart: 8,
                }}
              >
                1-100分 题目分值
              </span>
            </Form.Item>

            <Form
              name="dynamic_form_item"
              {...formItemLayoutWithOutLabel}
              style={{
                maxWidth: 600,
              }}
              form={itemForm}
            >
              <Form.List
                name="names"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 2) {
                        return Promise.reject(new Error("至少添加两个选项"));
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    <Radio.Group name="radiogroup" defaultValue={1} style={{display: 'block'}} onChange={onChangeitemTruth}>
                      {fields.map((field, index) => (
                        <Form.Item
                          {...formItemLayoutxuanxiang}
                          label={index >= 0 ? `选项${index + 1}` : ""}
                          required={false}
                          key={field.key}
                        >
                          <Form.Item
                            {...field}
                            validateTrigger={["onChange", "onBlur"]}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: "请填写选项内容",
                              },
                            ]}
                            noStyle
                          >
                            <Input
                              placeholder="输入选项内容"
                              style={{
                                width: "60%",
                              }}
                            />
                          </Form.Item>
                          {fields.length > 1 ? (
                            <MinusCircleOutlined
                              className={styles.dynamicdeletebutton}
                              onClick={() => remove(field.name)}
                            />
                          ) : null}
                          {fields.length > 1 ? (
                            <Radio value={index + 1}>正确答案</Radio>
                          ) : null}
                        </Form.Item>
                      ))}
                    </Radio.Group>

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{
                          width: "60%",
                        }}
                        icon={<PlusOutlined />}
                      >
                        添加选项
                      </Button>

                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
            <Form.Item
              label="题目解析"
              name="subjectParse"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>
        )}
        {visibleElements === 4 && (
          <div>
            <Form.Item
              label="题目名称"
              name="subjectName"
              rules={[
                {
                  required: true,
                  message: "请输入!",
                },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                }}
                placeholder="请输入题目名称"
              />
            </Form.Item>
            <Form.Item label="题目难度">
              <Form.Item name="difficulty" noStyle>
                <InputNumber min={1} max={5} placeholder="数字" />
              </Form.Item>
              <span
                className="ant-form-text"
                style={{
                  marginInlineStart: 8,
                }}
              >
                1-5分 题目难度
              </span>
            </Form.Item>
            <Form.Item label="题目分值">
              <Form.Item name="score" noStyle>
                <InputNumber min={1} max={100} placeholder="数字" />
              </Form.Item>
              <span
                className="ant-form-text"
                style={{
                  marginInlineStart: 8,
                }}
              >
                1-100分 题目分值
              </span>
            </Form.Item>

            <Form
              name="dynamic_form_item"
              {...formItemLayoutWithOutLabel}
              style={{
                maxWidth: 600,
              }}
              form={itemForm}
            >
              <Form.List
                name="names"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 2) {
                        return Promise.reject(new Error("至少添加两个选项"));
                      }
                    },
                  },
                ]}
              >

                {(fields, { add, remove }, { errors }) => (
                  <>

                  <Checkbox.Group style={{display: 'block'}} name="checkgroup" onChange={onDuoxuanTypeChange}>

                    {fields.map((field, index) => (
                      <Form.Item
                        {...formItemLayoutxuanxiang}
                        label={index >= 0 ? `选项${index + 1}` : ""}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "请填写选项内容",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="输入选项内容"
                            style={{
                              width: "60%",
                            }}
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className={styles.dynamicdeletebutton}
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                        {fields.length > 1 ? (
                            <Checkbox value={index}>正确选项</Checkbox>
                            // <Switch checkedChildren="正确选项" unCheckedChildren="错误选项" onChange={()=>{duoxuanChange(fields, index, checked)}} onClick={duoxuanClick}/>
                        ) : null}
                      </Form.Item>
                    ))}
                  </Checkbox.Group>

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{
                          width: "60%",
                        }}
                        icon={<PlusOutlined />}
                      >
                        添加选项
                      </Button>

                      <Form.ErrorList errors={errors} />
                    </Form.Item>

                  </>

                )}
              </Form.List>
            </Form>
            <Form.Item
              label="题目解析"
              name="subjectParse"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>
        )}

        {visibleElements === 2 && (
          <div>
            <Form.Item
              label="题目名称"
              name="subjectName"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
              Form={isTrueform}

            >
              <Input
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item label="题目难度">
              <Form.Item name="difficulty" noStyle>
                <InputNumber min={1} max={5} />
              </Form.Item>
              <span
                className="ant-form-text"
                style={{
                  marginInlineStart: 8,
                }}
              >
                1-5分 题目难度
              </span>
            </Form.Item>
            <Form.Item label="题目分值">
              <Form.Item name="score" noStyle>
                <InputNumber min={1} max={100} />
              </Form.Item>
              <span
                className="ant-form-text"
                style={{
                  marginInlineStart: 8,
                }}
              >
                1-100分 题目分值
              </span>
            </Form.Item>

            <Form.Item label="答案" valuePropName="checked" name="switchField" >
              <Switch   checkedChildren="正确" unCheckedChildren="错误" />
            </Form.Item>




            <Form.Item
              label="题目解析"
              name="subjectParse"
              rules={[
                {
                  required: true,
                  message: "请输入!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>
        )}
        {visibleElements === 1 && (
          <div>
            <Form.Item
              label="题目名称"
              name="subjectName"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                }}
                placeholder="请输入题目名称"
              />
            </Form.Item>
            <Form.Item label="题目难度">
              <Form.Item name="difficulty" noStyle>
                <InputNumber min={1} max={5} />
              </Form.Item>
              <span
                className="ant-form-text"
                style={{
                  marginInlineStart: 8,
                }}
              >
                1-5分 题目难度
              </span>
            </Form.Item>
            <Form.Item label="题目分值">
              <Form.Item name="score" noStyle>
                <InputNumber min={1} max={100} />
              </Form.Item>
              <span
                className="ant-form-text"
                style={{
                  marginInlineStart: 8,
                }}
              >
                1-100分 题目分值
              </span>
            </Form.Item>
            <Form.Item
              label="题目解析"
              name="subjectParse"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            {/* subjectAnswer */}
            <Form.Item
              label="题目答案"
              name="subjectAnswer"
              rules={[
                {
                  required: true,
                  message: "请输入!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>
        )}

        {/* provinceId  省份*/}
        <Form.Item
          label="省份"
          name="provinceId"
          rules={[
            {
              required: true,
              message: "请选择!",
            },
          ]}
          initialValue={"1"}
        >
          <Select
            defaultValue={"1"}
            options={[
              {
                value: "1",
                label: "海南",
              },
              {
                value: "null",
                label: "全国",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="出题人名"
          name="settleName"
          rules={[
            {
              required: true,
              message: "请输入!",
            },
          ]}
          initialValue={"admin"}
        >
          <Select
            defaultValue={"admin"}
            value={"admin"}
            options={[
              {
                value: "admin",
                label: "管理员",
                disabled: true,
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className={styles.button_btn}
          >
            提交
          </Button>
          <Button htmlType="reset">重置</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
