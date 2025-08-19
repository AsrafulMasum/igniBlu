import { useState } from "react";
import { ConfigProvider, Input, Table } from "antd";
import { FiSearch } from "react-icons/fi";

const data = [
  {
    key: 1,
    carName: "Toyota Corolla",
    driverName: "John Doe",
    vinNumber: "VIN-10001",
    tripDuration: "2h 30m",
    outTime: "08:00",
    inTime: "10:30",
    status: "complete",
  },
  {
    key: 2,
    carName: "Honda Civic",
    driverName: "Alice Smith",
    vinNumber: "VIN-10002",
    tripDuration: "-",
    outTime: "09:15",
    inTime: "-",
    status: "inProgress",
  },
  {
    key: 3,
    carName: "Ford Focus",
    driverName: "Robert Brown",
    vinNumber: "VIN-10003",
    tripDuration: "3h 15m",
    outTime: "07:45",
    inTime: "11:00",
    status: "complete",
  },
  {
    key: 4,
    carName: "Hyundai Elantra",
    driverName: "Emily Johnson",
    vinNumber: "VIN-10004",
    tripDuration: "-",
    outTime: "10:00",
    inTime: "-",
    status: "inProgress",
  },
  {
    key: 5,
    carName: "Chevrolet Malibu",
    driverName: "Michael Davis",
    vinNumber: "VIN-10005",
    tripDuration: "4h 05m",
    outTime: "06:30",
    inTime: "10:35",
    status: "complete",
  },
  {
    key: 6,
    carName: "Nissan Altima",
    driverName: "Sophia Wilson",
    vinNumber: "VIN-10006",
    tripDuration: "-",
    outTime: "11:00",
    inTime: "-",
    status: "inProgress",
  },
  {
    key: 7,
    carName: "Kia Optima",
    driverName: "James Anderson",
    vinNumber: "VIN-10007",
    tripDuration: "3h 40m",
    outTime: "07:15",
    inTime: "10:55",
    status: "complete",
  },
  {
    key: 8,
    carName: "Mazda 6",
    driverName: "Olivia Martinez",
    vinNumber: "VIN-10008",
    tripDuration: "-",
    outTime: "09:45",
    inTime: "-",
    status: "inProgress",
  },
  {
    key: 9,
    carName: "Volkswagen Passat",
    driverName: "William Taylor",
    vinNumber: "VIN-10009",
    tripDuration: "5h 20m",
    outTime: "06:00",
    inTime: "11:20",
    status: "complete",
  },
  {
    key: 10,
    carName: "Subaru Legacy",
    driverName: "Isabella Thomas",
    vinNumber: "VIN-10010",
    tripDuration: "-",
    outTime: "10:30",
    inTime: "-",
    status: "inProgress",
  },
  {
    key: 11,
    carName: "BMW 3 Series",
    driverName: "Benjamin Lee",
    vinNumber: "VIN-10011",
    tripDuration: "1h 35m",
    outTime: "08:20",
    inTime: "09:55",
    status: "complete",
  },
  {
    key: 12,
    carName: "Mercedes C-Class",
    driverName: "Mia White",
    vinNumber: "VIN-10012",
    tripDuration: "-",
    outTime: "09:50",
    inTime: "-",
    status: "inProgress",
  },
  {
    key: 13,
    carName: "Audi A4",
    driverName: "Daniel Harris",
    vinNumber: "VIN-10013",
    tripDuration: "3h 25m",
    outTime: "07:10",
    inTime: "10:35",
    status: "complete",
  },
  {
    key: 14,
    carName: "Lexus ES",
    driverName: "Charlotte Clark",
    vinNumber: "VIN-10014",
    tripDuration: "-",
    outTime: "11:20",
    inTime: "-",
    status: "inProgress",
  },
  {
    key: 15,
    carName: "Tesla Model 3",
    driverName: "Matthew Lewis",
    vinNumber: "VIN-10015",
    tripDuration: "5h 50m",
    outTime: "06:10",
    inTime: "12:00",
    status: "complete",
  },
  {
    key: 16,
    carName: "Volvo S60",
    driverName: "Amelia Walker",
    vinNumber: "VIN-10016",
    tripDuration: "-",
    outTime: "10:05",
    inTime: "-",
    status: "inProgress",
  },
  {
    key: 17,
    carName: "Jaguar XE",
    driverName: "Henry Hall",
    vinNumber: "VIN-10017",
    tripDuration: "4h 30m",
    outTime: "07:40",
    inTime: "12:10",
    status: "complete",
  },
  {
    key: 18,
    carName: "Acura TLX",
    driverName: "Evelyn Allen",
    vinNumber: "VIN-10018",
    tripDuration: "-",
    outTime: "09:25",
    inTime: "-",
    status: "inProgress",
  },
  {
    key: 19,
    carName: "Infiniti Q50",
    driverName: "Alexander Young",
    vinNumber: "VIN-10019",
    tripDuration: "3h 05m",
    outTime: "08:50",
    inTime: "11:55",
    status: "complete",
  },
  {
    key: 20,
    carName: "Genesis G70",
    driverName: "Harper King",
    vinNumber: "VIN-10020",
    tripDuration: "-",
    outTime: "10:40",
    inTime: "-",
    status: "inProgress",
  },
];

const GarageHistory = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const statusColorMap = {
    complete: { color: "#52C41A", bg: "#D9F2CD" },
    inProgress: { color: "#F4891C", bg: "#FFE8CC" },
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
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Driver Name",
      dataIndex: "driverName",
      key: "driverName",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "VIN Number",
      dataIndex: "vinNumber",
      key: "vinNumber",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Trip Duration",
      dataIndex: "tripDuration",
      key: "tripDuration",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Out Time",
      dataIndex: "outTime",
      key: "outTime",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "In Time",
      dataIndex: "inTime",
      key: "inTime",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
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
              textTransform: "capitalize",
            }}
          >
            {status}
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
              dataSource={data}
              // loading={isLoading}
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
    </div>
  );
};

export default GarageHistory;
