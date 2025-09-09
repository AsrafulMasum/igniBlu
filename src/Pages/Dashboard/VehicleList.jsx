import { useState } from "react";
import { ConfigProvider, Input, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import { imageUrl } from "../../redux/api/baseApi";
import moment from "moment";
import { useGetVehicleQuery } from "../../redux/features/assetsApi";

const VehicleList = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const { data: vehicleData, isLoading } = useGetVehicleQuery({
    page,
    limit,
    searchText,
  });
  const vehicles = vehicleData?.data;

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
      title: "Vehicle Name",
      dataIndex: "Make",
      key: "Make",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <img
            src={
              record?.image && record?.image.startsWith("http")
                ? record?.image
                : record?.image
                ? `${imageUrl}${record?.image}`
                : "/default-avatar.jpg"
            }
            className="w-10 h-10 object-cover rounded-full"
          />

          <p
            style={{
              letterSpacing: 0.4,
              fontSize: "#666666",
              fontWeight: "400",
              color: "#FDFDFD",
              textTransform: "capitalize",
            }}
          >
            {record?.Make}
          </p>
        </div>
      ),
    },
    {
      title: "Vehicle Model",
      dataIndex: "Model",
      key: "Model",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Model Year",
      dataIndex: "modelYear",
      key: "modelYear",
      render: (text) => (
        <span style={{ color: "#FDFDFD" }}>{moment(text)?.format("YYYY")}</span>
      ),
    },
    {
      title: "VIN No.",
      dataIndex: "VIN",
      key: "VIN",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Tag No.",
      dataIndex: "TagNumber",
      key: "TagNumber",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Assign Driver",
      dataIndex: "assignDriver",
      key: "assignDriver",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD", textTransform: "capitalize" }}>
          {record?.assignedUsers
            .map((user) => `${user.firstName} ${user.lastName}`)
            .join(", ")}
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
            Vehicle Lists
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
              dataSource={vehicles}
              loading={isLoading}
              pagination={{
                total: vehicleData?.data?.data?.meta?.total,
                current: page,
                pageSize: limit,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default VehicleList;
