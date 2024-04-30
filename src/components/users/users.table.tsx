import { Button, Table, Modal, Input, notification } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  HomeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import CreateUserModal from "./create.user.modal";
import { ColumnType } from "antd/es/table";
import UpdateUserModal from "./update.user.modal";

export interface IUsers {
  data: [
    {
      email: string;
      name: string;
      role: string;
      _id: string;
      address: string;
      gender: string;
      password: string;
      age: number;
    }
  ];
  getData2: (v?: any) => void;
}

const UsersTable = (props: IUsers) => {
  const { data, getData2 } = props;

  const columns: ColumnType<null | IUsers> = [
    {
      title: "Email",
      dataIndex: "email",
      render: (value, record: any) => {
        return <a>{record.email}</a>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Action",
      // record chính là bản ghi 1 item của row tương dương
      render: (value, record) => {
        return (
          <div>
            <button
              onClick={() => {
                setDataUpdate(record);
                setIsUpdateModalOpen(true);
              }}
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  // code của Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<null | IUsers>(null);

  const access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjYyZjIwMTY5Yzk4NGM4ZTAyYTU1MDVkIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MTQ0NDUxNzcsImV4cCI6MTgwMDg0NTE3N30.RhwxH6U_mUvsz8yxCCtGyfmsVnQIDFRhRRF6uKswUbc";

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Table User ANT Component</h2>
        <div>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add new
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey={"_id"}
        loading={false}
      />

      <h2>Thủ công dùng table html</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: any) => {
            return (
              <tr key={index._id}>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <CreateUserModal
        access_token={access_token}
        getData2={getData2}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      <UpdateUserModal
        access_token={access_token}
        getData2={getData2}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};

export default UsersTable;
