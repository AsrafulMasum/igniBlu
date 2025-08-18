import { useState } from "react";
import { ConfigProvider, Input, Modal, Select, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import { CiLock, CiUnlock } from "react-icons/ci";
import { imageUrl } from "../../redux/api/baseApi";
import moment from "moment";

const users = [
  {
    key: "1",
    name: "Masum Kabir",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "masum.kabir@example.com",
    type: "Owner",
    createdAt: "2024-01-12",
    status: "active",
    _id: "u001",
  },
  {
    key: "2",
    name: "Ayesha Rahman",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    email: "ayesha.rahman@example.com",
    type: "Driver",
    createdAt: "2024-01-20",
    status: "inactive",
    _id: "u002",
  },
  {
    key: "3",
    name: "Shahriar Hossain",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    email: "shahriar.hossain@example.com",
    type: "Mechanic",
    createdAt: "2024-02-02",
    status: "active",
    _id: "u003",
  },
  {
    key: "4",
    name: "Nusrat Jahan",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    email: "nusrat.jahan@example.com",
    type: "Dealer",
    createdAt: "2024-02-10",
    status: "inactive",
    _id: "u004",
  },
  {
    key: "5",
    name: "Rakibul Islam",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    email: "rakibul.islam@example.com",
    type: "Driver",
    createdAt: "2024-02-18",
    status: "active",
    _id: "u005",
  },
  {
    key: "6",
    name: "Sumaiya Akter",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    email: "sumaiya.akter@example.com",
    type: "Owner",
    createdAt: "2024-03-05",
    status: "active",
    _id: "u006",
  },
  {
    key: "7",
    name: "Mehedi Hasan",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    email: "mehedi.hasan@example.com",
    type: "Mechanic",
    createdAt: "2024-03-12",
    status: "inactive",
    _id: "u007",
  },
  {
    key: "8",
    name: "Taslima Begum",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    email: "taslima.begum@example.com",
    type: "Dealer",
    createdAt: "2024-03-25",
    status: "active",
    _id: "u008",
  },
  {
    key: "9",
    name: "Sajid Ahmed",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    email: "sajid.ahmed@example.com",
    type: "Driver",
    createdAt: "2024-04-01",
    status: "inactive",
    _id: "u009",
  },
  {
    key: "10",
    name: "Farzana Sultana",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    email: "farzana.sultana@example.com",
    type: "Owner",
    createdAt: "2024-04-09",
    status: "active",
    _id: "u010",
  },
  {
    key: "11",
    name: "Imran Khan",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    email: "imran.khan@example.com",
    type: "Dealer",
    createdAt: "2024-04-17",
    status: "inactive",
    _id: "u011",
  },
  {
    key: "12",
    name: "Mithila Akter",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    email: "mithila.akter@example.com",
    type: "Mechanic",
    createdAt: "2024-05-02",
    status: "active",
    _id: "u012",
  },
  {
    key: "13",
    name: "Hasan Mahmud",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    email: "hasan.mahmud@example.com",
    type: "Driver",
    createdAt: "2024-05-16",
    status: "active",
    _id: "u013",
  },
  {
    key: "14",
    name: "Rafiq Chowdhury",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    email: "rafiq.chowdhury@example.com",
    type: "Owner",
    createdAt: "2024-05-28",
    status: "inactive",
    _id: "u014",
  },
  {
    key: "15",
    name: "Shila Parvin",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
    email: "shila.parvin@example.com",
    type: "Dealer",
    createdAt: "2024-06-05",
    status: "active",
    _id: "u015",
  },
  {
    key: "16",
    name: "Nayeem Alvi",
    image: "https://randomuser.me/api/portraits/men/16.jpg",
    email: "nayeem.alvi@example.com",
    type: "Mechanic",
    createdAt: "2024-06-14",
    status: "inactive",
    _id: "u016",
  },
  {
    key: "17",
    name: "Sadia Hossain",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    email: "sadia.hossain@example.com",
    type: "Driver",
    createdAt: "2024-06-25",
    status: "active",
    _id: "u017",
  },
  {
    key: "18",
    name: "Tanvir Rahman",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    email: "tanvir.rahman@example.com",
    type: "Owner",
    createdAt: "2024-07-03",
    status: "inactive",
    _id: "u018",
  },
  {
    key: "19",
    name: "Moumita Akter",
    image: "https://randomuser.me/api/portraits/women/19.jpg",
    email: "moumita.akter@example.com",
    type: "Dealer",
    createdAt: "2024-07-15",
    status: "active",
    _id: "u019",
  },
  {
    key: "20",
    name: "Arif Chowdhury",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    email: "arif.chowdhury@example.com",
    type: "Mechanic",
    createdAt: "2024-07-28",
    status: "inactive",
    _id: "u020",
  },
];

const UserLists = () => {
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
      title: "User Name",
      dataIndex: "user",
      key: "user",
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
              }}
            >
              {record?.name}
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
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>{record?.type}</span>
      ),
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
            User Lists
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
              dataSource={users}
              // loading={isLoading}
              pagination={{
                total: 20,
                current: page,
                pageSize: 10,
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

export default UserLists;
