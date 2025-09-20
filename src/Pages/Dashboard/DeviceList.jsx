import { useState } from "react";
import { ConfigProvider, Input, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import moment from "moment";
import { useGetDevicesQuery } from "../../redux/features/devicesApi";

const DeviceList = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const { data: devices, isLoading } = useGetDevicesQuery({ page, searchText });

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "key",
      key: "key",
      render: (_, __, index) => (
        <span className="text-[#FDFDFD]">{index + 1}</span>
      ),
    },
    {
      title: "Device Name",
      dataIndex: "DeviceName",
      key: "DeviceName",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Device ID",
      dataIndex: "DeviceId",
      key: "DeviceId",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Registered Date",
      dataIndex: "registeredDate",
      key: "registeredDate",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>
          {moment(record?.registeredDate).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "Current Vehicle",
      dataIndex: "currentVehicleNo",
      key: "currentVehicleNo",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>
          {record?.Make} {record?.Model}
        </span>
      ),
    },
  ];

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  return (
    <div className="w-full h-full bg-[#242424]">
      <div
        style={{
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0px 16px",
            padding: "16px 0px",
          }}
        >
          <h3
            style={{
              color: "#FDFDFD",
              fontSize: 18,
              fontWeight: "500",
              lineHeight: "24px",
            }}
          >
            Device Lists
          </h3>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "350px",
                height: "40px",
                borderRadius: "8px",
              }}
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#242424",
                  },
                }}
              >
                <Input
                  placeholder="Search..."
                  onChange={handleSearchChange}
                  prefix={<FiSearch size={14} color="#868FA0" />}
                  style={{
                    width: "100%",
                    height: "100%",
                    fontSize: "14px",
                    backgroundColor: "#FAFAFA",
                  }}
                  size="middle"
                />
              </ConfigProvider>
            </div>
          </div>
        </div>

        <div className="relative h-full">
          <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  itemActiveBg: "#0F78FF",
                  borderRadius: "100%",
                  colorText: "white",
                  colorTextDisabled: "#6C6C6C",
                },
                Table: {
                  rowHoverBg: "#242424",
                },
              },
              token: {
                colorPrimary: "#242424",
              },
            }}
          >
            <Table
              size="small"
              columns={columns}
              rowKey="_id"
              dataSource={devices?.data}
              loading={isLoading}
              pagination={{
                total: devices?.pagination?.total,
                current: page,
                pageSize: 10,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default DeviceList;
