import {
  Button,
  Table,
  Modal,
  Input,
  notification,
  PopconfirmProps,
  message,
  Popconfirm,
} from "antd";
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
  meta: object;
  setMeta: (v?: any) => void;
  setListUsers: (v?) => void;
}

const UsersTable = (props: IUsers) => {
  const { data, getData2, meta, setMeta, setListUsers } = props;
  const access_token = localStorage.getItem("access_token");

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
            <Popconfirm
              title="Delete the USER"
              description={`Are you sure to delete ${record.name}`}
              onConfirm={() => confirm(record)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger style={{ marginLeft: "20px" }}>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  // code của Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<null | IUsers>(null);

  // PHAN POPCONFIRM
  const confirm: PopconfirmProps["onConfirm"] = async (user: IUsers) => {
    const res = await fetch(`http://localhost:8000/api/v1/users/${user._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    const d = await res.json();
    if (d.data) {
      // Nếu api bắn thành công lấy 1 hàm từ cha truyền qua prop để rerender lại list danh sách
      await getData2();
      notification.success({
        message: "ok nhé",
      });
    } else {
      notification.error({
        description: "something is wrong",
        message: JSON.stringify(d.message),
      });
      return;
    }

    message.success("Click on Yes");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleOnChange = async (page: number, pageSize: number) => {
    // goi lai API để reload page phù hợp khi chọn page- dưa vào page + pageSize
    const res = await fetch(
      `http://localhost:8000/api/v1/users?current=${page}&pageSize=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data2 = await res.json();
    if (!data2.data) {
      notification.error({ message: JSON.stringify(data2.message) });
    }
    setListUsers(data2.data.result);
    setMeta({
      current: data2.data.meta.current,
      pageSize: data2.data.meta.pageSize,
      pages: data2.data.meta.pages,
      total: data2.data.meta.total,
    });
  };

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
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          total: meta.total,
          onChange: (page: number, pageSize: number) =>
            handleOnChange(page, pageSize),
        }}
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
