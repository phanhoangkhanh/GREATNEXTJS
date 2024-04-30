import { useEffect, useState } from "react";
import UsersTable from "../components/users/users.table";

const UserPage = () => {
  // DINH NGHIA API
  const getData = async () => {
    const res1 = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "admin@gmail.com",
        password: "123456",
      }),
    });
    const data1 = await res1.json();
    console.log("fetch data 1 nè:", data1);
  };
  const getData2 = async () => {
    const res2 = await fetch("http://localhost:8000/api/v1/users/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data2 = await res2.json();
    setListUsers(data2.data.result);
    console.log("fetch data tông:", data2);
  };

  // STATE XUẤT BIẾN
  const [listUsers, setListUsers] = useState([
    { email: "", name: "", role: "" },
  ]);

  // THỰC THI USEEFFECT
  useEffect(() => {
    getData2();
    getData();
  }, []);

  // những api quan trong phải gửi kèm token
  const access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjYyZjIwMTY5Yzk4NGM4ZTAyYTU1MDVkIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MTQ0NDUxNzcsImV4cCI6MTgwMDg0NTE3N30.RhwxH6U_mUvsz8yxCCtGyfmsVnQIDFRhRRF6uKswUbc";
  return (
    <div>
      <UsersTable data={listUsers} getData2={getData2} />
    </div>
  );
};

export default UserPage;
