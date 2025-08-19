import { useState } from "react";
import { ConfigProvider, Input, Modal, Table, Tooltip } from "antd";
import { FiSearch } from "react-icons/fi";
import { LiaReplySolid } from "react-icons/lia";
import { BsThreeDots } from "react-icons/bs";

const data = [
  {
    key: 1,
    userName: "John Doe",
    email: "john.doe@example.com",
    contact: "+880123456789",
    carName: "Toyota Corolla",
    vinNumber: "VIN-10001",
    issue: "The car has a flat tire and needs immediate replacement.",
  },
  {
    key: 2,
    userName: "Jane Smith",
    email: "jane.smith@example.com",
    contact: "+880987654321",
    carName: "Honda Civic",
    vinNumber: "VIN-10002",
    issue: "Battery is not holding charge; needs inspection or replacement.",
  },
  {
    key: 3,
    userName: "Mike Johnson",
    email: "mike.johnson@example.com",
    contact: "+880112233445",
    carName: "Ford Ranger",
    vinNumber: "VIN-10003",
    issue: "Engine is overheating during long drives, check cooling system.",
  },
  {
    key: 4,
    userName: "Emily Davis",
    email: "emily.davis@example.com",
    contact: "+880223344556",
    carName: "Tesla Model 3",
    vinNumber: "VIN-10004",
    issue: "Software update required for the autopilot system.",
  },
  {
    key: 5,
    userName: "Robert Brown",
    email: "robert.brown@example.com",
    contact: "+880334455667",
    carName: "BMW X5",
    vinNumber: "VIN-10005",
    issue: "Brake system malfunction; requires urgent service.",
  },
  {
    key: 6,
    userName: "Linda Wilson",
    email: "linda.wilson@example.com",
    contact: "+880445566778",
    carName: "Audi A4",
    vinNumber: "VIN-10006",
    issue: "Air conditioning is not cooling properly, needs inspection.",
  },
  {
    key: 7,
    userName: "James Taylor",
    email: "james.taylor@example.com",
    contact: "+880556677889",
    carName: "Mercedes C-Class",
    vinNumber: "VIN-10007",
    issue: "Headlight is broken; replacement required before night driving.",
  },
  {
    key: 8,
    userName: "Patricia Anderson",
    email: "patricia.anderson@example.com",
    contact: "+880667788990",
    carName: "Hyundai Elantra",
    vinNumber: "VIN-10008",
    issue: "Tire pressure is low on all tires; check for leaks.",
  },
  {
    key: 9,
    userName: "William Thomas",
    email: "william.thomas@example.com",
    contact: "+880778899001",
    carName: "Kia Sportage",
    vinNumber: "VIN-10009",
    issue: "Engine oil needs replacement and filter change.",
  },
  {
    key: 10,
    userName: "Barbara Martinez",
    email: "barbara.martinez@example.com",
    contact: "+880889900112",
    carName: "Nissan Altima",
    vinNumber: "VIN-10010",
    issue: "Transmission slipping during gear changes; check gearbox.",
  },
  {
    key: 11,
    userName: "Steven Harris",
    email: "steven.harris@example.com",
    contact: "+880990011223",
    carName: "Chevrolet Malibu",
    vinNumber: "VIN-10011",
    issue: "Driver-side window is stuck and won’t roll down.",
  },
  {
    key: 12,
    userName: "Susan Clark",
    email: "susan.clark@example.com",
    contact: "+880101112131",
    carName: "Volkswagen Golf",
    vinNumber: "VIN-10012",
    issue: "Fuel pump is malfunctioning; car stalls at idle.",
  },
  {
    key: 13,
    userName: "Daniel Lewis",
    email: "daniel.lewis@example.com",
    contact: "+880121314151",
    carName: "Mazda CX-5",
    vinNumber: "VIN-10013",
    issue: "Steering wheel vibrates at high speeds; alignment check needed.",
  },
  {
    key: 14,
    userName: "Karen Walker",
    email: "karen.walker@example.com",
    contact: "+880131415161",
    carName: "Subaru Forester",
    vinNumber: "VIN-10014",
    issue: "Head gasket leak causing coolant loss; immediate repair required.",
  },
  {
    key: 15,
    userName: "Paul Hall",
    email: "paul.hall@example.com",
    contact: "+880141516171",
    carName: "Jeep Wrangler",
    vinNumber: "VIN-10015",
    issue: "Suspension makes noise on rough roads; check shocks and springs.",
  },
  {
    key: 16,
    userName: "Nancy Allen",
    email: "nancy.allen@example.com",
    contact: "+880151617181",
    carName: "Honda Accord",
    vinNumber: "VIN-10016",
    issue: "Brake pads are worn out; replacement required soon.",
  },
  {
    key: 17,
    userName: "Mark Young",
    email: "mark.young@example.com",
    contact: "+880161718191",
    carName: "Toyota Camry",
    vinNumber: "VIN-10017",
    issue: "Clutch is slipping; check clutch plate and hydraulic system.",
  },
  {
    key: 18,
    userName: "Lisa King",
    email: "lisa.king@example.com",
    contact: "+880171819202",
    carName: "Ford Focus",
    vinNumber: "VIN-10018",
    issue: "AC compressor makes loud noise; may need replacement.",
  },
  {
    key: 19,
    userName: "Kevin Scott",
    email: "kevin.scott@example.com",
    contact: "+880181920212",
    carName: "Hyundai Tucson",
    vinNumber: "VIN-10019",
    issue: "Battery dies quickly; alternator needs testing.",
  },
  {
    key: 20,
    userName: "Michelle Green",
    email: "michelle.green@example.com",
    contact: "+880192021222",
    carName: "Kia Optima",
    vinNumber: "VIN-10020",
    issue: "Engine produces unusual knocking sound under acceleration.",
  },
];

const Support = () => {
  const [page, setPage] = useState(1);
  const [value, setValue] = useState(null);
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
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
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
      title: "Issues",
      dataIndex: "issue",
      key: "issue",
      render: (text) => {
        const shortText =
          text.length > 15 ? text.substring(0, 15) + "..." : text;
        return (
          <span className="text-[#FDFDFD] w-44 flex justify-between items-center">
            {shortText}
            {text.length > 15 && (
              <Tooltip title={text}>
                <BsThreeDots className="ml-2 bg-gray-500 h-6 w-6 rounded-sm p-1 cursor-pointer" />
              </Tooltip>
            )}
          </span>
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
          <button
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
            <LiaReplySolid size={26} className="text-secondary" />
          </button>
        </div>
      ),
    },
  ];

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleAdd = () => {
    console.log("first");
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

      <Modal
        centered
        open={value}
        onCancel={() => setValue(null)}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1 className="text-[20px] font-medium mb-3">Reply A Message</h1>
          <form onSubmit={handleAdd}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Message
              </label>
              <textarea
                placeholder="Enter message"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "152px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                  resize: "none",
                }}
                // value={form.ans}
                name="ans"
              />
            </div>
            <input
              className="cursor-pointer"
              style={{
                width: "100%",
                border: "none",
                height: "44px",
                background: "#0F78FF",
                color: "white",
                borderRadius: "8px",
                outline: "none",
                padding: "10px 20px",
              }}
              value="Save & change"
              type="submit"
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Support;
