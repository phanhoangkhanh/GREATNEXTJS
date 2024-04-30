import { useEffect, useState } from "react";
import UsersTable from "../components/users/users.table";

const UserPage = () => {
  const access_token = localStorage.getItem("access_token");
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
  return (
    <div>
      <UsersTable data={listUsers} getData2={getData2} />
    </div>
  );
};

export default UserPage;
