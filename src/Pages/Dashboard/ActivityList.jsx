import { useState } from "react";
import { ConfigProvider, Input, Table } from "antd";
import { FiSearch } from "react-icons/fi";

const data = [
  {
    key: 1,
    driverName: "John Doe",
    carName: "Toyota Corolla",
    vinNumber: "VIN-10001",
    status: "complete",
    tripDuration: "2h 30m",
  },
  {
    key: 2,
    driverName: "Alice Smith",
    carName: "Honda Civic",
    vinNumber: "VIN-10002",
    status: "inProgress",
    tripDuration: "-",
  },
  {
    key: 3,
    driverName: "Robert Brown",
    carName: "Ford Focus",
    vinNumber: "VIN-10003",
    status: "complete",
    tripDuration: "3h 15m",
  },
  {
    key: 4,
    driverName: "Emily Johnson",
    carName: "Hyundai Elantra",
    vinNumber: "VIN-10004",
    status: "inProgress",
    tripDuration: "-",
  },
  {
    key: 5,
    driverName: "Michael Davis",
    carName: "Chevrolet Malibu",
    vinNumber: "VIN-10005",
    status: "complete",
    tripDuration: "4h 5m",
  },
  {
    key: 6,
    driverName: "Sophia Wilson",
    carName: "Nissan Altima",
    vinNumber: "VIN-10006",
    status: "inProgress",
    tripDuration: "-",
  },
  {
    key: 7,
    driverName: "James Anderson",
    carName: "Kia Optima",
    vinNumber: "VIN-10007",
    status: "complete",
    tripDuration: "3h 40m",
  },
  {
    key: 8,
    driverName: "Olivia Martinez",
    carName: "Mazda 6",
    vinNumber: "VIN-10008",
    status: "inProgress",
    tripDuration: "-",
  },
  {
    key: 9,
    driverName: "William Taylor",
    carName: "Volkswagen Passat",
    vinNumber: "VIN-10009",
    status: "complete",
    tripDuration: "5h 20m",
  },
  {
    key: 10,
    driverName: "Isabella Thomas",
    carName: "Subaru Legacy",
    vinNumber: "VIN-10010",
    status: "inProgress",
    tripDuration: "-",
  },
  {
    key: 11,
    driverName: "Benjamin Lee",
    carName: "BMW 3 Series",
    vinNumber: "VIN-10011",
    status: "complete",
    tripDuration: "1h 35m",
  },
  {
    key: 12,
    driverName: "Mia White",
    carName: "Mercedes C-Class",
    vinNumber: "VIN-10012",
    status: "inProgress",
    tripDuration: "-",
  },
  {
    key: 13,
    driverName: "Daniel Harris",
    carName: "Audi A4",
    vinNumber: "VIN-10013",
    status: "complete",
    tripDuration: "3h 25m",
  },
  {
    key: 14,
    driverName: "Charlotte Clark",
    carName: "Lexus ES",
    vinNumber: "VIN-10014",
    status: "inProgress",
    tripDuration: "-",
  },
  {
    key: 15,
    driverName: "Matthew Lewis",
    carName: "Tesla Model 3",
    vinNumber: "VIN-10015",
    status: "complete",
    tripDuration: "5h 50m",
  },
  {
    key: 16,
    driverName: "Amelia Walker",
    carName: "Volvo S60",
    vinNumber: "VIN-10016",
    status: "inProgress",
    tripDuration: "-",
  },
  {
    key: 17,
    driverName: "Henry Hall",
    carName: "Jaguar XE",
    vinNumber: "VIN-10017",
    status: "complete",
    tripDuration: "4h 30m",
  },
  {
    key: 18,
    driverName: "Evelyn Allen",
    carName: "Acura TLX",
    vinNumber: "VIN-10018",
    status: "inProgress",
    tripDuration: "-",
  },
  {
    key: 19,
    driverName: "Alexander Young",
    carName: "Infiniti Q50",
    vinNumber: "VIN-10019",
    status: "complete",
    tripDuration: "3h 5m",
  },
  {
    key: 20,
    driverName: "Harper King",
    carName: "Genesis G70",
    vinNumber: "VIN-10020",
    status: "inProgress",
    tripDuration: "-",
  },
];

const ActivityList = () => {
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
      title: "Driver Name",
      dataIndex: "driverName",
      key: "driverName",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Car Name",
      dataIndex: "carName",
      key: "carName",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "VIN Number",
      dataIndex: "vinNumber",
      key: "vinNumber",
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
    {
      title: "Trip Duration",
      dataIndex: "tripDuration",
      key: "tripDuration",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
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
            Activity Lists
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

export default ActivityList;
