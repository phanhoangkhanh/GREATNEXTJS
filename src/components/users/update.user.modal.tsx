import { useEffect, useState } from "react";
import { Modal, Input, notification } from "antd";
import { IUsers } from "./users.table";

interface IProps {
  access_token: string | null;
  getData2: any;
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: any | IUsers;
  setDataUpdate: any;
}
const UpdateUserModal = (props: IProps) => {
  const {
    access_token,
    getData2,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    dataUpdate,
    setDataUpdate,
  } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (dataUpdate) {
      setName(dataUpdate.name);
      setEmail(dataUpdate.email);
      setPassword(dataUpdate.password);
      setAge(dataUpdate.age);
      setGender(dataUpdate.gender);
      setAddress(dataUpdate.address);
      setRole(dataUpdate.role);
    }
  }, [dataUpdate]);

  const handleOk = async () => {
    const data = {
      _id: dataUpdate?._id,
      name,
      age,
      email,
      gender,
      role,
      address,
    };
    const res = await fetch("http://localhost:8000/api/v1/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(data),
    });
    const d = await res.json();
    // test loi dưa tren cau truc respond của API + notification của ant
    if (d.data) {
      // Nếu api bắn thành công lấy 1 hàm từ cha truyền qua prop để rerender lại list danh sách
      await getData2();
      notification.success({
        message: "ok nhé",
      });
      handleCloseUpdateModal();
    } else {
      notification.error({
        description: "something is wrong",
        message: JSON.stringify(d.message),
      });
      return;
    }
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setName("");
    setEmail("");
    setPassword("");
    setAge("");
    setGender("");
    setAddress("");
    setRole("");
    setDataUpdate(null);
  };

  return (
    <>
      <Modal
        title="Update User"
        open={isUpdateModalOpen}
        onOk={handleOk}
        onCancel={() => setIsUpdateModalOpen(false)}
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
            disabled={true}
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

export default UpdateUserModal;
