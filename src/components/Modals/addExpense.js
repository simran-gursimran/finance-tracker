import React from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

const AddExpense = ({
  accounts,
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expense"
      open={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
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
              message: "Please enter the name of the transaction",
            },
          ]}
        >
          <Input type="text" className="custome-input" />
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
            { required: true, message: "Please select the expense date" },
          ]}
        >
          <DatePicker className="custome-input" format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Account"
          name="account"
          rules={[
            { required: true, message: "Please enter the account" },
          ]}
        >
          <Select>
            {accounts.map((account) => (
              <Select.Option id={account.id} value={account.id}>{account.name}</Select.Option>
            ))}

          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="btn reset-balance-btn">
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddExpense;
