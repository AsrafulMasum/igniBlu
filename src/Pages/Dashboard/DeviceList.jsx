import { useState } from "react";
import { ConfigProvider, Input, Modal, Select, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import { CiLock, CiUnlock } from "react-icons/ci";
import {
  useGetUsersQuery,
  useLockUserMutation,
} from "../../redux/features/usersApi";
import toast from "react-hot-toast";
import moment from "moment";

const data = [
  {
    key: "1",
    deviceName: "Tracker-X1",
    registeredDate: "2024-01-12",
    currentVehicleNo: "DHA-1234",
    previousVehicleNo: "DHA-9876",
    status: "active",
    _id: "dev001",
  },
  {
    key: "2",
    deviceName: "Tracker-Y2",
    registeredDate: "2024-02-05",
    currentVehicleNo: "CTG-5678",
    previousVehicleNo: "CTG-1234",
    status: "inactive",
    _id: "dev002",
  },
  {
    key: "3",
    deviceName: "Tracker-Z3",
    registeredDate: "2024-03-08",
    currentVehicleNo: "RAJ-3344",
    previousVehicleNo: "RAJ-1122",
    status: "active",
    _id: "dev003",
  },
  {
    key: "4",
    deviceName: "GPS-Pro",
    registeredDate: "2024-03-15",
    currentVehicleNo: "SYL-7788",
    previousVehicleNo: "SYL-4455",
    status: "inactive",
    _id: "dev004",
  },
  {
    key: "5",
    deviceName: "NavTrack",
    registeredDate: "2024-04-01",
    currentVehicleNo: "BARI-9999",
    previousVehicleNo: "BARI-8877",
    status: "active",
    _id: "dev005",
  },
  {
    key: "6",
    deviceName: "SmartTrack",
    registeredDate: "2024-04-20",
    currentVehicleNo: "DHA-4545",
    previousVehicleNo: "DHA-6767",
    status: "inactive",
    _id: "dev006",
  },
  {
    key: "7",
    deviceName: "FleetMaster",
    registeredDate: "2024-05-02",
    currentVehicleNo: "CTG-2525",
    previousVehicleNo: "CTG-3434",
    status: "active",
    _id: "dev007",
  },
  {
    key: "8",
    deviceName: "GeoTrack",
    registeredDate: "2024-05-22",
    currentVehicleNo: "RAJ-1414",
    previousVehicleNo: "RAJ-5151",
    status: "active",
    _id: "dev008",
  },
  {
    key: "9",
    deviceName: "PathFinder",
    registeredDate: "2024-06-10",
    currentVehicleNo: "SYL-6262",
    previousVehicleNo: "SYL-2121",
    status: "inactive",
    _id: "dev009",
  },
  {
    key: "10",
    deviceName: "RoadEye",
    registeredDate: "2024-06-30",
    currentVehicleNo: "BARI-3030",
    previousVehicleNo: "BARI-8080",
    status: "active",
    _id: "dev010",
  },
  {
    key: "11",
    deviceName: "TrackMate",
    registeredDate: "2024-07-11",
    currentVehicleNo: "DHA-1717",
    previousVehicleNo: "DHA-9191",
    status: "inactive",
    _id: "dev011",
  },
  {
    key: "12",
    deviceName: "DriveSafe",
    registeredDate: "2024-07-28",
    currentVehicleNo: "CTG-6565",
    previousVehicleNo: "CTG-8787",
    status: "active",
    _id: "dev012",
  },
  {
    key: "13",
    deviceName: "AutoTrack",
    registeredDate: "2024-08-03",
    currentVehicleNo: "RAJ-9991",
    previousVehicleNo: "RAJ-1119",
    status: "inactive",
    _id: "dev013",
  },
  {
    key: "14",
    deviceName: "FleetGuard",
    registeredDate: "2024-08-21",
    currentVehicleNo: "SYL-1123",
    previousVehicleNo: "SYL-3321",
    status: "active",
    _id: "dev014",
  },
  {
    key: "15",
    deviceName: "RouteMaster",
    registeredDate: "2024-09-06",
    currentVehicleNo: "BARI-5566",
    previousVehicleNo: "BARI-7788",
    status: "inactive",
    _id: "dev015",
  },
  {
    key: "16",
    deviceName: "NavLink",
    registeredDate: "2024-09-15",
    currentVehicleNo: "DHA-4242",
    previousVehicleNo: "DHA-2424",
    status: "active",
    _id: "dev016",
  },
  {
    key: "17",
    deviceName: "CarSecure",
    registeredDate: "2024-09-28",
    currentVehicleNo: "CTG-1111",
    previousVehicleNo: "CTG-2222",
    status: "inactive",
    _id: "dev017",
  },
  {
    key: "18",
    deviceName: "TrackOne",
    registeredDate: "2024-10-05",
    currentVehicleNo: "RAJ-3435",
    previousVehicleNo: "RAJ-8789",
    status: "active",
    _id: "dev018",
  },
  {
    key: "19",
    deviceName: "SkyTrack",
    registeredDate: "2024-10-22",
    currentVehicleNo: "SYL-6263",
    previousVehicleNo: "SYL-7373",
    status: "inactive",
    _id: "dev019",
  },
  {
    key: "20",
    deviceName: "RoadSense",
    registeredDate: "2024-11-01",
    currentVehicleNo: "BARI-9595",
    previousVehicleNo: "BARI-4646",
    status: "active",
    _id: "dev020",
  },
];

const DeviceList = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [lock, setLock] = useState("");
  const [deviceStatus, setDeviceStatus] = useState("Device Status");

  const deviceStatusOptions = [
    { value: "Device Status", label: "Device Status" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const statusColorMap = {
    active: { color: "#52C41A", bg: "#D9F2CD" },
    inactive: { color: "#FF4D4F", bg: "#FFD8D7" },
  };

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
      dataIndex: "deviceName",
      key: "deviceName",
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
        <span style={{ color: "#FDFDFD" }}>{record?.currentVehicleNo}</span>
      ),
    },
    {
      title: "Previous Vehicle",
      dataIndex: "previousVehicleNo",
      key: "previousVehicleNo",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>{record?.previousVehicleNo}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        const currentStyle = statusColorMap[status] || {
          color: "#595959",
          bg: "#FAFAFA",
        };

        return (
          <select
            value={status}
            onChange={async (e) => {
              const newStatus = e.target.value;
              console.log(newStatus);

              //   const data = {
              //     orderId: record._id,
              //     status: { status: newStatus },
              //   };
              //   try {
              //     const res = await changeOrderStatus({ data }).unwrap();
              //     if (res?.success) {
              //       refetch();
              //       toast.success(res?.message);
              //     }
              //   } catch (error) {
              //     console.error("Failed to update status", error);
              //     toast.error(error?.data?.message);
              //   }
            }}
            style={{
              backgroundColor: currentStyle.bg,
              color: currentStyle.color,
              fontWeight: 500,
              borderRadius: 6,
              fontSize: 13,
              width: 120,
              height: 28,
              padding: "0 8px",
              border: "none",
              cursor: "pointer",
              textAlign: "center",
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              outline: "none",
            }}
          >
            {statusOptions.map(({ value, label }) => (
              <option key={value} value={value} style={{ textAlign: "center" }}>
                {label}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",

            paddingRight: 10,
          }}
        >
          {/* <button
            className="flex justify-center items-center rounded-md"
            onClick={() => setValue(record)}
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
              backgroundColor: "#121212",
              width: "40px",
              height: "32px",
            }}
          >
            <GoArrowUpRight size={26} className="text-secondary" />
          </button> */}

          <div>
            <button
              className="flex justify-center items-center rounded-md"
              onClick={() => setLock(record?._id)}
              style={{
                cursor: "pointer",
                border: "none",
                outline: "none",
                backgroundColor: "#121212",
                width: "40px",
                height: "32px",
              }}
            >
              {record?.status === "active" ? (
                <CiUnlock size={26} className="text-secondary" />
              ) : (
                <CiLock size={26} className="text-[#FF0000]" />
              )}
            </button>
          </div>
        </div>
      ),
    },
  ];

  const handleDelete = async () => {
    console.log("lock");
    setLock("");
    // try {
    //   const res = await lockUser({ id: lock });
    //   if (res?.data?.success) {
    //     refetch();
    //     setLock("");
    //     toast.success(res?.data?.message);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleDeviceStatus = (value) => {
    setDeviceStatus(value);
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

            <div>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#242424",
                  },
                  components: {
                    Select: {
                      optionSelectedBg: "#0F78FF",
                    },
                  },
                }}
              >
                <Select
                  value={deviceStatus}
                  onChange={handleDeviceStatus}
                  style={{
                    width: 150,
                    height: 40,
                  }}
                  options={deviceStatusOptions}
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
              dataSource={data}
              //   loading={isLoading}
              pagination={{
                total: 20,
                current: page,
                pageSize: 12,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>

      {/* <UserDetailsModal value={value} setValue={setValue} /> */}

      <Modal
        centered
        open={lock}
        onCancel={() => setLock(null)}
        width={400}
        footer={false}
      >
        <div className="p-6 text-center">
          <p className="text-[#D93D04] text-center font-semibold">
            Are you sure!
          </p>
          <p className="pt-4 pb-12 text-center">
            Do you want to delete this content?
          </p>
          <button
            onClick={handleDelete}
            className="bg-[#0F78FF] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DeviceList;
