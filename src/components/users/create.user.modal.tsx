import { useState } from "react";
import { Modal, Input, notification } from "antd";

interface IProps {
  access_token: string;
  getData2: any;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}
const CreateUserModal = (props: IProps) => {
  const { access_token, getData2, isCreateModalOpen, setIsCreateModalOpen } =
    props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const handleOk = async () => {
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

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setName("");
    setEmail("");
    setPassword("");
    setAge("");
    setGender("");
    setAddress("");
    setRole("");
  };

  return (
    <>
      <Modal
        title="Add New User"
        open={isCreateModalOpen}
        onOk={handleOk}
        onCancel={() => setIsCreateModalOpen(false)}
        maskClosable={false}
        width={"60vw"}
      >
        <div>
          <label>Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Age</label>
          <Input value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div>
          <label>Gender</label>
          <Input value={gender} onChange={(e) => setGender(e.target.value)} />
        </div>
        <div>
          <label>Address</label>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>Role</label>
          <Input value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
      </Modal>
    </>
  );
};

export default CreateUserModal;
