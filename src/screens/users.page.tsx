import { useEffect, useState } from "react";
import UsersTable from "../components/users/users.table";

const UserPage = () => {
  const access_token = localStorage.getItem("access_token");

  // call API động bằng page
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 3,
    pages: 0,
    total: 0,
  });

  // DINH NGHIA API
  const getData = async () => {
    const res1 = await fetch(
      `http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "admin@gmail.com",
          password: "123456",
        }),
      }
    );
    const data1 = await res1.json();
    console.log("fetch data 1 nè:", data1);
  };
  const getData2 = async () => {
    const res2 = await fetch(
      `http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data2 = await res2.json();
    setListUsers(data2.data.result);
    setMeta({
      current: data2.data.meta.current,
      pageSize: data2.data.meta.pageSize,
      pages: data2.data.meta.pages,
      total: data2.data.meta.total,
    });
  };

  // STATE XUẤT BIẾN
  const [listUsers, setListUsers] = useState([
    { email: "", name: "", role: "" },
  ]);

  // THỰC THI USEEFFECT
  useEffect(() => {
    getData2();
    //getData();
  }, []);

  // những api quan trong phải gửi kèm token
  return (
    <div>
      <UsersTable
        data={listUsers}
        getData2={getData2}
        meta={meta}
        setMeta={setMeta}
        setListUsers={setListUsers}
      />
    </div>
  );
};

export default UserPage;
