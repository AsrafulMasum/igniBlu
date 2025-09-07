import { useState } from "react";
import { ConfigProvider, Input, Modal, Select, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import { CiLock, CiUnlock } from "react-icons/ci";
import { imageUrl } from "../../redux/api/baseApi";
import moment from "moment";
import { useGetDriversQuery } from "../../redux/features/usersApi";

const driversData = [
  {
    key: 1,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "john.doe@example.com",
    contact: "+880123456789",
    drivingLicense: "DL-123456",
    assignedCar: "Toyota Corolla",
    createdAt: "2025-08-01T10:00:00",
    status: "active",
  },
  {
    key: 2,
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    email: "jane.smith@example.com",
    contact: "+880987654321",
    drivingLicense: "DL-654321",
    assignedCar: "Honda Civic",
    createdAt: "2025-08-02T09:30:00",
    status: "inactive",
  },
  {
    key: 3,
    name: "Mike Johnson",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    email: "mike.johnson@example.com",
    contact: "+880112233445",
    drivingLicense: "DL-112233",
    assignedCar: "Ford Ranger",
    createdAt: "2025-08-03T11:15:00",
    status: "active",
  },
  {
    key: 4,
    name: "Emily Davis",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    email: "emily.davis@example.com",
    contact: "+880223344556",
    drivingLicense: "DL-223344",
    assignedCar: "Tesla Model 3",
    createdAt: "2025-08-04T08:45:00",
    status: "inactive",
  },
  {
    key: 5,
    name: "Robert Brown",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    email: "robert.brown@example.com",
    contact: "+880334455667",
    drivingLicense: "DL-334455",
    assignedCar: "BMW X5",
    createdAt: "2025-08-05T14:20:00",
    status: "active",
  },
  {
    key: 6,
    name: "Linda Wilson",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    email: "linda.wilson@example.com",
    contact: "+880445566778",
    drivingLicense: "DL-445566",
    assignedCar: "Audi A4",
    createdAt: "2025-08-06T13:10:00",
    status: "inactive",
  },
  {
    key: 7,
    name: "James Taylor",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    email: "james.taylor@example.com",
    contact: "+880556677889",
    drivingLicense: "DL-556677",
    assignedCar: "Mercedes C-Class",
    createdAt: "2025-08-07T12:05:00",
    status: "active",
  },
  {
    key: 8,
    name: "Patricia Anderson",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    email: "patricia.anderson@example.com",
    contact: "+880667788990",
    drivingLicense: "DL-667788",
    assignedCar: "Hyundai Elantra",
    createdAt: "2025-08-08T15:30:00",
    status: "inactive",
  },
  {
    key: 9,
    name: "William Thomas",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    email: "william.thomas@example.com",
    contact: "+880778899001",
    drivingLicense: "DL-778899",
    assignedCar: "Kia Sportage",
    createdAt: "2025-08-09T09:50:00",
    status: "active",
  },
  {
    key: 10,
    name: "Barbara Martinez",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    email: "barbara.martinez@example.com",
    contact: "+880889900112",
    drivingLicense: "DL-889900",
    assignedCar: "Nissan Altima",
    createdAt: "2025-08-10T10:40:00",
    status: "inactive",
  },
  {
    key: 11,
    name: "Steven Harris",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    email: "steven.harris@example.com",
    contact: "+880990011223",
    drivingLicense: "DL-990011",
    assignedCar: "Chevrolet Malibu",
    createdAt: "2025-08-11T11:20:00",
    status: "active",
  },
  {
    key: 12,
    name: "Susan Clark",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    email: "susan.clark@example.com",
    contact: "+880101112131",
    drivingLicense: "DL-101112",
    assignedCar: "Volkswagen Golf",
    createdAt: "2025-08-12T14:55:00",
    status: "inactive",
  },
  {
    key: 13,
    name: "Daniel Lewis",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    email: "daniel.lewis@example.com",
    contact: "+880121314151",
    drivingLicense: "DL-121314",
    assignedCar: "Mazda CX-5",
    createdAt: "2025-08-13T13:45:00",
    status: "active",
  },
  {
    key: 14,
    name: "Karen Walker",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
    email: "karen.walker@example.com",
    contact: "+880131415161",
    drivingLicense: "DL-131415",
    assignedCar: "Subaru Forester",
    createdAt: "2025-08-14T08:30:00",
    status: "inactive",
  },
  {
    key: 15,
    name: "Paul Hall",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    email: "paul.hall@example.com",
    contact: "+880141516171",
    drivingLicense: "DL-141516",
    assignedCar: "Jeep Wrangler",
    createdAt: "2025-08-15T09:15:00",
    status: "active",
  },
  {
    key: 16,
    name: "Nancy Allen",
    image: "https://randomuser.me/api/portraits/women/16.jpg",
    email: "nancy.allen@example.com",
    contact: "+880151617181",
    drivingLicense: "DL-151617",
    assignedCar: "Honda Accord",
    createdAt: "2025-08-16T10:05:00",
    status: "inactive",
  },
  {
    key: 17,
    name: "Mark Young",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
    email: "mark.young@example.com",
    contact: "+880161718191",
    drivingLicense: "DL-161718",
    assignedCar: "Toyota Camry",
    createdAt: "2025-08-17T11:50:00",
    status: "active",
  },
  {
    key: 18,
    name: "Lisa King",
    image: "https://randomuser.me/api/portraits/women/18.jpg",
    email: "lisa.king@example.com",
    contact: "+880171819202",
    drivingLicense: "DL-171819",
    assignedCar: "Ford Focus",
    createdAt: "2025-08-18T12:40:00",
    status: "inactive",
  },
  {
    key: 19,
    name: "Kevin Scott",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    email: "kevin.scott@example.com",
    contact: "+880181920212",
    drivingLicense: "DL-181920",
    assignedCar: "Hyundai Tucson",
    createdAt: "2025-08-19T13:35:00",
    status: "active",
  },
  {
    key: 20,
    name: "Michelle Green",
    image: "https://randomuser.me/api/portraits/women/20.jpg",
    email: "michelle.green@example.com",
    contact: "+880192021222",
    drivingLicense: "DL-192021",
    assignedCar: "Kia Optima",
    createdAt: "2025-08-20T14:25:00",
    status: "inactive",
  },
];

const DriverList = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [lock, setLock] = useState("");
  const { data: driverData, isLoading } = useGetDriversQuery({
    page,
    limit,
    searchText,
  });
  const drivers = driverData?.data?.data;

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
      render: (_, record) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <img
              src={
                record?.profile && record?.profile.startsWith("http")
                  ? record?.profile
                  : record?.profile
                  ? `${imageUrl}${record?.profile}`
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
              }}
            >
              {record?.firstName} {record?.lastName}
            </p>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Contact Number",
      dataIndex: "contact",
      key: "contact",
      render: (text) => (
        <span style={{ color: "#FDFDFD" }}>
          {text ? text : "Not Added Yet"}
        </span>
      ),
    },
    {
      title: "Driving License Number",
      dataIndex: "drivingLicense",
      key: "drivingLicense",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Assigned Car",
      dataIndex: "assignedCar",
      key: "assignedCar",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Start Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>
          {moment(record?.createdAt).format("YYYY-MM-DD")}
        </span>
      ),
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
            Driver Lists
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
              dataSource={drivers}
              loading={isLoading}
              pagination={{
                total: driverData?.data?.data?.meta?.total,
                current: page,
                pageSize: limit,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>

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

export default DriverList;
