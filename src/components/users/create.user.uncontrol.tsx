import { useState } from "react";
import { Modal, Input, notification, InputNumber, Button } from "antd";
import { Form, Select } from "antd";

interface IProps {
  access_token: string | null;
  getData2: any;
  isUnControlOpen: boolean;
  setIsUnControlOpen: (v: boolean) => void;
}
// uncotroll dùng useRef lấy input ko dùng prop hay state - ko reload lại DOm

const CreateUserUnControlModal = (props: IProps) => {
  const { access_token, getData2, isUnControlOpen, setIsUnControlOpen } = props;

  const { Option } = Select;
  const [form] = Form.useForm();

  const handleCloseCreateModal = () => {
    //reset lai cac truong
    form.resetFields();
    setIsUnControlOpen(false);
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const { name, email, password, age, gender, role, address } = values;
    const res = await fetch("http://localhost:8000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        name,
        email,
        password,
        age,
        gender,
        role,
        address,
      }),
    });
    const d = await res.json();
    // test loi dưa tren cau truc respond của API + notification của ant
    if (d.data) {
      // Nếu api bắn thành công lấy 1 hàm từ cha truyền qua prop để rerender lại list danh sách
      await getData2();
      notification.success({
        message: "ok nhé",
      });
      handleCloseCreateModal();
    } else {
      notification.error({
        description: "something is wrong",
        message: JSON.stringify(d.message),
      });
      return;
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title="Add New User UnControll Component"
        open={isUnControlOpen}
        onOk={() => form.submit()}
        onCancel={() => setIsUnControlOpen(false)}
        maskClosable={false}
        width={"60vw"}
      >
        <Form
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          form={form}
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input your Age!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your Address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              // onChange={onGenderChange}
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>

          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select
              placeholder="select your role"
              // onChange={onRoleChange}
              allowClear
            >
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              onClick={() => {
                // tạo 1 obj form chính là FORM và vì thế ta điều khiển form này tùy ý
                form.submit();
              }}
              // type="primary"
              // htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateUserUnControlModal;
