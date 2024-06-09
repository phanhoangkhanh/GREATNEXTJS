"use client";
import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, Tag, notification } from "antd";
import type { TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { CANCELLED } from "dns";

export interface ITracks {
  _id: string;
  title: string;
  description: string;
  category: string;
  imgUrl: string;
  trackUrl: string;
  countLike: number;
  countPlay: number;
}

interface DataType {
  stt: number;
  title: string;
  description: string;
  category: string;
  trackUrl: string;
  uploader: string;
  actions: string;
}

const TracksPage = () => {
  const access_token = localStorage.getItem("access_token") as string;
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 5,
    pages: 0,
    total: 20,
  });

  const [listTracks, setListTracks] = useState<DataType[]>();
  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  //ban API voi access token trong header để lấy tracks list
  const getData = async () => {
    const res = await fetch(
      `http://localhost:8000/api/v1/tracks?current=${meta.current}&pageSize=${meta.pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const d = await res.json();
    setListTracks(d?.data?.result);
  };

  const handleOnChange = async (page: number, pageSize: number) => {
    // goi lai API để reload page phù hợp khi chọn page- dưa vào page + pageSize
    const res2 = await fetch(
      `http://localhost:8000/api/v1/tracks?current=${page}&pageSize=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data2 = await res2.json();
    setListTracks(data2?.data?.result);

    setMeta({
      current: data2.data.meta.current,
      pageSize: data2.data.meta.pageSize,
      pages: data2.data.meta.pages,
      total: data2.data.meta.total,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  // hàm xử lý xóa
  const confirm: PopconfirmProps["onConfirm"] = async (tracks: ITracks) => {
    console.log(tracks);
    const res = await fetch(
      `http://localhost:8000/api/v1/tracks/${tracks._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const d = await res.json();
    if (d.data) {
      // Nếu api bắn thành công lấy 1 hàm từ cha truyền qua prop để rerender lại list danh sách
      await getData();
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
  };

  const columns: ColumnsType<DataType[]>["column"] = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "stt",
      render: (value, index: number) => {
        return <>{{ index } + 1}</>;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Track URL",
      dataIndex: "trackUrl",
      key: "trackUrl",
    },
    {
      title: "Uploader",
      dataIndex: ["uploader", "name"],
      key: "uploader",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (value, record) => {
        return (
          <>
            <Popconfirm
              title="Delete the USER"
              description={`Are you sure to delete ${record.title}`}
              onConfirm={() => confirm(record)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger style={{ marginLeft: "20px" }}>
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  // const data: DataType[] = [
  //   {
  //     stt: 1,
  //     title: "khanh yeu doi",
  //     description: "coganglen",
  //     category: "ok nha",
  //     trackurl: "cogang",
  //     uploader: "upsot",
  //     actions: "ok lun",
  //   },
  //   {
  //     stt: 1,
  //     title: "khanh yeu doi",
  //     description: "coganglen",
  //     category: "ok nha",
  //     trackurl: "cogang",
  //     uploader: "upsot",
  //     actions: "ok lun",
  //   },
  // ];

  return (
    <Table
      columns={columns}
      dataSource={listTracks}
      pagination={{
        current: meta.current,
        pageSize: meta.pageSize,
        total: meta.total,
        onChange: (page: number, pageSize: number) =>
          handleOnChange(page, pageSize),
      }}
    />
  );
};
export default TracksPage;
