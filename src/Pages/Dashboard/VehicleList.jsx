import { useState } from "react";
import { ConfigProvider, Input, Modal, Select, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import { CiLock, CiUnlock } from "react-icons/ci";
import { imageUrl } from "../../redux/api/baseApi";
import moment from "moment";

const vehicleData = [
  {
    key: 1,
    vehicleName: "Toyota Corolla",
    vehicleModel: "Corolla Altis",
    modelYear: "2020",
    vinNo: "VIN-10001",
    tagNo: "TAG-2001",
    assignDriver: "Rahim Uddin",
    status: "active",
  },
  {
    key: 2,
    vehicleName: "Honda Civic",
    vehicleModel: "Civic Turbo",
    modelYear: "2021",
    vinNo: "VIN-10002",
    tagNo: "TAG-2002",
    assignDriver: "Karim Hossain",
    status: "inactive",
  },
  {
    key: 3,
    vehicleName: "Nissan X-Trail",
    vehicleModel: "X-Trail 2.5",
    modelYear: "2019",
    vinNo: "VIN-10003",
    tagNo: "TAG-2003",
    assignDriver: "Selim Mia",
    status: "active",
  },
  {
    key: 4,
    vehicleName: "Mitsubishi Pajero",
    vehicleModel: "Pajero Sport",
    modelYear: "2018",
    vinNo: "VIN-10004",
    tagNo: "TAG-2004",
    assignDriver: "Bashir Ahmed",
    status: "inactive",
  },
  {
    key: 5,
    vehicleName: "Hyundai Tucson",
    vehicleModel: "Tucson GLS",
    modelYear: "2022",
    vinNo: "VIN-10005",
    tagNo: "TAG-2005",
    assignDriver: "Firoz Alam",
    status: "active",
  },
  {
    key: 6,
    vehicleName: "Ford Ranger",
    vehicleModel: "Ranger XLT",
    modelYear: "2021",
    vinNo: "VIN-10006",
    tagNo: "TAG-2006",
    assignDriver: "Jamal Uddin",
    status: "inactive",
  },
  {
    key: 7,
    vehicleName: "Mazda CX-5",
    vehicleModel: "CX-5 Touring",
    modelYear: "2020",
    vinNo: "VIN-10007",
    tagNo: "TAG-2007",
    assignDriver: "Ashikur Rahman",
    status: "active",
  },
  {
    key: 8,
    vehicleName: "Kia Sportage",
    vehicleModel: "Sportage EX",
    modelYear: "2019",
    vinNo: "VIN-10008",
    tagNo: "TAG-2008",
    assignDriver: "Nazmul Hasan",
    status: "inactive",
  },
  {
    key: 9,
    vehicleName: "Chevrolet Tahoe",
    vehicleModel: "Tahoe LT",
    modelYear: "2022",
    vinNo: "VIN-10009",
    tagNo: "TAG-2009",
    assignDriver: "Rasel Karim",
    status: "active",
  },
  {
    key: 10,
    vehicleName: "BMW X5",
    vehicleModel: "X5 xDrive40i",
    modelYear: "2021",
    vinNo: "VIN-10010",
    tagNo: "TAG-2010",
    assignDriver: "Sabbir Khan",
    status: "inactive",
  },
  {
    key: 11,
    vehicleName: "Mercedes GLC",
    vehicleModel: "GLC 300",
    modelYear: "2020",
    vinNo: "VIN-10011",
    tagNo: "TAG-2011",
    assignDriver: "Ruhul Amin",
    status: "active",
  },
  {
    key: 12,
    vehicleName: "Audi Q7",
    vehicleModel: "Q7 Premium",
    modelYear: "2022",
    vinNo: "VIN-10012",
    tagNo: "TAG-2012",
    assignDriver: "Imran Hossain",
    status: "inactive",
  },
  {
    key: 13,
    vehicleName: "Toyota Hilux",
    vehicleModel: "Hilux Revo",
    modelYear: "2019",
    vinNo: "VIN-10013",
    tagNo: "TAG-2013",
    assignDriver: "Mehedi Hasan",
    status: "active",
  },
  {
    key: 14,
    vehicleName: "Isuzu D-Max",
    vehicleModel: "D-Max V-Cross",
    modelYear: "2018",
    vinNo: "VIN-10014",
    tagNo: "TAG-2014",
    assignDriver: "Jubayer Khan",
    status: "inactive",
  },
  {
    key: 15,
    vehicleName: "Tesla Model X",
    vehicleModel: "Model X Long Range",
    modelYear: "2022",
    vinNo: "VIN-10015",
    tagNo: "TAG-2015",
    assignDriver: "Samiul Alam",
    status: "active",
  },
  {
    key: 16,
    vehicleName: "Land Rover",
    vehicleModel: "Range Rover Evoque",
    modelYear: "2021",
    vinNo: "VIN-10016",
    tagNo: "TAG-2016",
    assignDriver: "Tanvir Islam",
    status: "inactive",
  },
  {
    key: 17,
    vehicleName: "Jeep Wrangler",
    vehicleModel: "Wrangler Rubicon",
    modelYear: "2020",
    vinNo: "VIN-10017",
    tagNo: "TAG-2017",
    assignDriver: "Omar Faruk",
    status: "active",
  },
  {
    key: 18,
    vehicleName: "Suzuki Vitara",
    vehicleModel: "Vitara Brezza",
    modelYear: "2019",
    vinNo: "VIN-10018",
    tagNo: "TAG-2018",
    assignDriver: "Raihan Chowdhury",
    status: "inactive",
  },
  {
    key: 19,
    vehicleName: "Peugeot 3008",
    vehicleModel: "3008 GT Line",
    modelYear: "2021",
    vinNo: "VIN-10019",
    tagNo: "TAG-2019",
    assignDriver: "Arif Mahmud",
    status: "active",
  },
  {
    key: 20,
    vehicleName: "Volvo XC60",
    vehicleModel: "XC60 T5",
    modelYear: "2020",
    vinNo: "VIN-10020",
    tagNo: "TAG-2020",
    assignDriver: "Monirul Islam",
    status: "inactive",
  },
];


const VehicleList = () => {
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
      title: "Vehicle Name",
      dataIndex: "vehicleName",
      key: "vehicleName",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Vehicle Model",
      dataIndex: "vehicleModel",
      key: "vehicleModel",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Model Year",
      dataIndex: "modelYear",
      key: "modelYear",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "VIN No.",
      dataIndex: "vinNo",
      key: "vinNo",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Tag No.",
      dataIndex: "tagNo",
      key: "tagNo",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Assign Driver",
      dataIndex: "assignDriver",
      key: "assignDriver",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
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
              dataSource={vehicleData}
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

export default VehicleList;
