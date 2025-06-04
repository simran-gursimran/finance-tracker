import React from "react";
import {
    Button,
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
} from "antd";

const AddAccount = ({ isAccountModalVisible, handleAccountCancel, onFinish }) => {
    const [form] = Form.useForm();

    return (
        <div>
            <Modal
                title="Add Account"
                open={isAccountModalVisible}
                onCancel={handleAccountCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        onFinish(values);
                        form.resetFields();
                    }}
                >
                    <Form.Item
                        style={{ fontWeight: 600 }}
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the name of the account",
                            },
                        ]}
                    >
                        <Input type="text" className="custome-input" />
                    </Form.Item>
                    <Form.Item
                        style={{ fontWeight: 600 }}
                        label="Type"
                        name="type"
                        rules={[
                            { required: true, message: "Please enter the amount" },
                        ]}
                    >
                        <Select>

                            <Select.Option value="bank">Bank</Select.Option>
                            <Select.Option value="mutuaalfund">Mutual Fund</Select.Option>
                            <Select.Option value="stock">Stock</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        style={{ fontWeight: 600 }}
                        label="Amount"
                        name="amount"
                        rules={[
                            { required: true, message: "Please enter the expense amount" },
                        ]}
                    >
                        <Input type="number" className="custome-input" />
                    </Form.Item>
                    <Form.Item
                        style={{ fontWeight: 600 }}
                        label="Date"
                        name="date"
                        rules={[
                            { required: true, message: "Please select the income date!" },
                        ]}
                    >
                        <DatePicker className="custome-input" format="DD-MM-YYYY" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            className="btn reset-balance-btn"
                        >
                            Add Account
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddAccount;
