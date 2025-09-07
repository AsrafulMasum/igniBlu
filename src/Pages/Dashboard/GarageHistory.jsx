import { useState } from "react";
import { ConfigProvider, Input, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import moment from "moment";
import { useGetGarageHistoryQuery } from "../../redux/features/trackingApi";

const data = [
  {
    key: 1,
    carName: "Toyota Corolla",
    vinNumber: "VIN-10001",
    driverName: "John Doe",
    date: "2025-08-01T08:00:00",
    startTime: "2025-08-01T08:00:00",
    endTime: "2025-08-01T10:30:00",
    tripDuration: "2h 30m",
    status: "complete",
  },
  {
    key: 2,
    carName: "Honda Civic",
    vinNumber: "VIN-10002",
    driverName: "Alice Smith",
    date: "2025-08-02T09:15:00",
    startTime: "2025-08-02T09:15:00",
    endTime: null,
    tripDuration: "-",
    status: "inProgress",
  },
  {
    key: 3,
    carName: "Ford Focus",
    vinNumber: "VIN-10003",
    driverName: "Robert Brown",
    date: "2025-08-03T07:45:00",
    startTime: "2025-08-03T07:45:00",
    endTime: "2025-08-03T11:00:00",
    tripDuration: "3h 15m",
    status: "complete",
  },
  {
    key: 4,
    carName: "Hyundai Elantra",
    vinNumber: "VIN-10004",
    driverName: "Emily Johnson",
    date: "2025-08-04T10:00:00",
    startTime: "2025-08-04T10:00:00",
    endTime: null,
    tripDuration: "-",
    status: "inProgress",
  },
  {
    key: 5,
    carName: "Chevrolet Malibu",
    vinNumber: "VIN-10005",
    driverName: "Michael Davis",
    date: "2025-08-05T06:30:00",
    startTime: "2025-08-05T06:30:00",
    endTime: "2025-08-05T10:35:00",
    tripDuration: "4h 5m",
    status: "complete",
  },
  {
    key: 6,
    carName: "Nissan Altima",
    vinNumber: "VIN-10006",
    driverName: "Sophia Wilson",
    date: "2025-08-06T11:00:00",
    startTime: "2025-08-06T11:00:00",
    endTime: null,
    tripDuration: "-",
    status: "inProgress",
  },
  {
    key: 7,
    carName: "Kia Optima",
    vinNumber: "VIN-10007",
    driverName: "James Anderson",
    date: "2025-08-07T07:15:00",
    startTime: "2025-08-07T07:15:00",
    endTime: "2025-08-07T10:55:00",
    tripDuration: "3h 40m",
    status: "complete",
  },
  {
    key: 8,
    carName: "Mazda 6",
    vinNumber: "VIN-10008",
    driverName: "Olivia Martinez",
    date: "2025-08-08T09:45:00",
    startTime: "2025-08-08T09:45:00",
    endTime: null,
    tripDuration: "-",
    status: "inProgress",
  },
  {
    key: 9,
    carName: "Volkswagen Passat",
    vinNumber: "VIN-10009",
    driverName: "William Taylor",
    date: "2025-08-09T06:00:00",
    startTime: "2025-08-09T06:00:00",
    endTime: "2025-08-09T11:20:00",
    tripDuration: "5h 20m",
    status: "complete",
  },
  {
    key: 10,
    carName: "Subaru Legacy",
    vinNumber: "VIN-10010",
    driverName: "Isabella Thomas",
    date: "2025-08-10T10:30:00",
    startTime: "2025-08-10T10:30:00",
    endTime: null,
    tripDuration: "-",
    status: "inProgress",
  },
  {
    key: 11,
    carName: "BMW 3 Series",
    vinNumber: "VIN-10011",
    driverName: "Benjamin Lee",
    date: "2025-08-11T08:20:00",
    startTime: "2025-08-11T08:20:00",
    endTime: "2025-08-11T09:55:00",
    tripDuration: "1h 35m",
    status: "complete",
  },
  {
    key: 12,
    carName: "Mercedes C-Class",
    vinNumber: "VIN-10012",
    driverName: "Mia White",
    date: "2025-08-12T09:50:00",
    startTime: "2025-08-12T09:50:00",
    endTime: null,
    tripDuration: "-",
    status: "inProgress",
  },
  {
    key: 13,
    carName: "Audi A4",
    vinNumber: "VIN-10013",
    driverName: "Daniel Harris",
    date: "2025-08-13T07:10:00",
    startTime: "2025-08-13T07:10:00",
    endTime: "2025-08-13T10:35:00",
    tripDuration: "3h 25m",
    status: "complete",
  },
  {
    key: 14,
    carName: "Lexus ES",
    vinNumber: "VIN-10014",
    driverName: "Charlotte Clark",
    date: "2025-08-14T11:20:00",
    startTime: "2025-08-14T11:20:00",
    endTime: null,
    tripDuration: "-",
    status: "inProgress",
  },
  {
    key: 15,
    carName: "Tesla Model 3",
    vinNumber: "VIN-10015",
    driverName: "Matthew Lewis",
    date: "2025-08-15T06:10:00",
    startTime: "2025-08-15T06:10:00",
    endTime: "2025-08-15T12:00:00",
    tripDuration: "5h 50m",
    status: "complete",
  },
  {
    key: 16,
    carName: "Volvo S60",
    vinNumber: "VIN-10016",
    driverName: "Amelia Walker",
    date: "2025-08-16T10:05:00",
    startTime: "2025-08-16T10:05:00",
    endTime: null,
    tripDuration: "-",
    status: "inProgress",
  },
  {
    key: 17,
    carName: "Jaguar XE",
    vinNumber: "VIN-10017",
    driverName: "Henry Hall",
    date: "2025-08-17T07:40:00",
    startTime: "2025-08-17T07:40:00",
    endTime: "2025-08-17T12:10:00",
    tripDuration: "4h 30m",
    status: "complete",
  },
  {
    key: 18,
    carName: "Acura TLX",
    vinNumber: "VIN-10018",
    driverName: "Evelyn Allen",
    date: "2025-08-18T09:25:00",
    startTime: "2025-08-18T09:25:00",
    endTime: null,
    tripDuration: "-",
    status: "inProgress",
  },
  {
    key: 19,
    carName: "Infiniti Q50",
    vinNumber: "VIN-10019",
    driverName: "Alexander Young",
    date: "2025-08-19T08:50:00",
    startTime: "2025-08-19T08:50:00",
    endTime: "2025-08-19T11:55:00",
    tripDuration: "3h 5m",
    status: "complete",
  },
  {
    key: 20,
    carName: "Genesis G70",
    vinNumber: "VIN-10020",
    driverName: "Harper King",
    date: "2025-08-20T10:40:00",
    startTime: "2025-08-20T10:40:00",
    endTime: null,
    tripDuration: "-",
    status: "inProgress",
  },
];

const GarageHistory = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const { data: garageHistoryData, isLoading } = useGetGarageHistoryQuery({
    page,
    limit,
    searchText,
  });
  const garageHistory = garageHistoryData?.data;
  console.log(garageHistory);

  const statusColorMap = {
    COMPLETED: { color: "#52C41A", bg: "#D9F2CD" },
    CONFIRMED: { color: "#F4891C", bg: "#FFE8CC" },
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
      title: "Car Name",
      dataIndex: "carName",
      key: "carName",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD", textTransform: "capitalize" }}>
          {record?.serviceId?.Make}
        </span>
      ),
    },
    {
      title: "VIN Number",
      dataIndex: "vinNumber",
      key: "vinNumber",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>{record?.serviceId?.VIN}</span>
      ),
    },
    {
      title: "Driver Name",
      dataIndex: "driverName",
      key: "driverName",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD", textTransform: "capitalize" }}>
          {record?.userId?.firstName} {record?.userId?.lastName}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>
          {moment(record?.confirmedAt).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>
          {moment(record?.confirmedAt).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>
          {record?.endTime ? moment(record?.endTime).format("HH:mm") : "-"}
        </span>
      ),
    },
    {
      title: "Trip Duration",
      dataIndex: "tripDuration",
      key: "tripDuration",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>{record?.totalTime} Min</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const currentStyle = statusColorMap[status] || {
          color: "#595959",
          bg: "#FAFAFA",
        };

        return (
          <p
            style={{
              backgroundColor: currentStyle.bg,
              color: currentStyle.color,
              fontWeight: 500,
              borderRadius: 6,
              fontSize: 13,
              width: 120,
              height: 28,
              lineHeight: "28px",
              textAlign: "center",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            {status === "CONFIRMED" ? "On Trip" : status}
          </p>
        );
      },
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
            Garage History
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
              dataSource={garageHistory}
              loading={isLoading}
              pagination={{
                total: garageHistory?.data?.meta?.total,
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

export default GarageHistory;
