import { useState } from "react";
import { ConfigProvider, Input, Modal, Select, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import { CiLock, CiUnlock } from "react-icons/ci";
import { imageUrl } from "../../redux/api/baseApi";
import moment from "moment";

const driverData = [
  {
    key: 1,
    driverName: "Rahim Uddin",
    email: "rahim.uddin@example.com",
    contact: "+8801711001101",
    drivingLicense: "DLN-202301",
    assignedCar: "Toyota Corolla",
    createdAt: "2024-01-05",
    status: "active",
  },
  {
    key: 2,
    driverName: "Karim Hossain",
    email: "karim.hossain@example.com",
    contact: "+8801711001102",
    drivingLicense: "DLN-202302",
    assignedCar: "Honda Civic",
    createdAt: "2024-01-10",
    status: "inactive",
  },
  {
    key: 3,
    driverName: "Selim Mia",
    email: "selim.mia@example.com",
    contact: "+8801711001103",
    drivingLicense: "DLN-202303",
    assignedCar: "Nissan X-Trail",
    createdAt: "2024-02-15",
    status: "active",
  },
  {
    key: 4,
    driverName: "Bashir Ahmed",
    email: "bashir.ahmed@example.com",
    contact: "+8801711001104",
    drivingLicense: "DLN-202304",
    assignedCar: "Mitsubishi Pajero",
    createdAt: "2024-02-20",
    status: "inactive",
  },
  {
    key: 5,
    driverName: "Firoz Alam",
    email: "firoz.alam@example.com",
    contact: "+8801711001105",
    drivingLicense: "DLN-202305",
    assignedCar: "Hyundai Tucson",
    createdAt: "2024-03-05",
    status: "active",
  },
  {
    key: 6,
    driverName: "Jamal Uddin",
    email: "jamal.uddin@example.com",
    contact: "+8801711001106",
    drivingLicense: "DLN-202306",
    assignedCar: "Ford Ranger",
    createdAt: "2024-03-12",
    status: "inactive",
  },
  {
    key: 7,
    driverName: "Ashikur Rahman",
    email: "ashikur.rahman@example.com",
    contact: "+8801711001107",
    drivingLicense: "DLN-202307",
    assignedCar: "Mazda CX-5",
    createdAt: "2024-04-01",
    status: "active",
  },
  {
    key: 8,
    driverName: "Nazmul Hasan",
    email: "nazmul.hasan@example.com",
    contact: "+8801711001108",
    drivingLicense: "DLN-202308",
    assignedCar: "Kia Sportage",
    createdAt: "2024-04-10",
    status: "inactive",
  },
  {
    key: 9,
    driverName: "Rasel Karim",
    email: "rasel.karim@example.com",
    contact: "+8801711001109",
    drivingLicense: "DLN-202309",
    assignedCar: "Chevrolet Tahoe",
    createdAt: "2024-04-25",
    status: "active",
  },
  {
    key: 10,
    driverName: "Sabbir Khan",
    email: "sabbir.khan@example.com",
    contact: "+8801711001110",
    drivingLicense: "DLN-202310",
    assignedCar: "BMW X5",
    createdAt: "2024-05-02",
    status: "inactive",
  },
  {
    key: 11,
    driverName: "Ruhul Amin",
    email: "ruhul.amin@example.com",
    contact: "+8801711001111",
    drivingLicense: "DLN-202311",
    assignedCar: "Mercedes GLC",
    createdAt: "2024-05-10",
    status: "active",
  },
  {
    key: 12,
    driverName: "Imran Hossain",
    email: "imran.hossain@example.com",
    contact: "+8801711001112",
    drivingLicense: "DLN-202312",
    assignedCar: "Audi Q7",
    createdAt: "2024-05-18",
    status: "inactive",
  },
  {
    key: 13,
    driverName: "Mehedi Hasan",
    email: "mehedi.hasan@example.com",
    contact: "+8801711001113",
    drivingLicense: "DLN-202313",
    assignedCar: "Toyota Hilux",
    createdAt: "2024-06-01",
    status: "active",
  },
  {
    key: 14,
    driverName: "Jubayer Khan",
    email: "jubayer.khan@example.com",
    contact: "+8801711001114",
    drivingLicense: "DLN-202314",
    assignedCar: "Isuzu D-Max",
    createdAt: "2024-06-08",
    status: "inactive",
  },
  {
    key: 15,
    driverName: "Samiul Alam",
    email: "samiul.alam@example.com",
    contact: "+8801711001115",
    drivingLicense: "DLN-202315",
    assignedCar: "Tesla Model X",
    createdAt: "2024-06-20",
    status: "active",
  },
  {
    key: 16,
    driverName: "Tanvir Islam",
    email: "tanvir.islam@example.com",
    contact: "+8801711001116",
    drivingLicense: "DLN-202316",
    assignedCar: "Land Rover Evoque",
    createdAt: "2024-07-02",
    status: "inactive",
  },
  {
    key: 17,
    driverName: "Omar Faruk",
    email: "omar.faruk@example.com",
    contact: "+8801711001117",
    drivingLicense: "DLN-202317",
    assignedCar: "Jeep Wrangler",
    createdAt: "2024-07-10",
    status: "active",
  },
  {
    key: 18,
    driverName: "Raihan Chowdhury",
    email: "raihan.chowdhury@example.com",
    contact: "+8801711001118",
    drivingLicense: "DLN-202318",
    assignedCar: "Suzuki Vitara",
    createdAt: "2024-07-15",
    status: "inactive",
  },
  {
    key: 19,
    driverName: "Arif Mahmud",
    email: "arif.mahmud@example.com",
    contact: "+8801711001119",
    drivingLicense: "DLN-202319",
    assignedCar: "Peugeot 3008",
    createdAt: "2024-07-28",
    status: "active",
  },
  {
    key: 20,
    driverName: "Monirul Islam",
    email: "monirul.islam@example.com",
    contact: "+8801711001120",
    drivingLicense: "DLN-202320",
    assignedCar: "Volvo XC60",
    createdAt: "2024-08-05",
    status: "inactive",
  },
];


const DriverList = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [lock, setLock] = useState("");

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
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Contact Number",
      dataIndex: "contact",
      key: "contact",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
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
              dataSource={driverData}
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
