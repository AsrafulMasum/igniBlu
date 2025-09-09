import { useState } from "react";
import { ConfigProvider, Input, Modal, Table, Tooltip } from "antd";
import { FiSearch } from "react-icons/fi";
import { LiaReplySolid } from "react-icons/lia";
import { BsThreeDots } from "react-icons/bs";
import {
  useGetSupportMessagesQuery,
  useReplySupportMessagesMutation,
} from "../../redux/features/supportsApi";
import toast from "react-hot-toast";

const Support = () => {
  const limit = 12;
  const [page, setPage] = useState(1);
  const [value, setValue] = useState(null);
  const [searchText, setSearchText] = useState("");
  const { data: supportData, isLoading } = useGetSupportMessagesQuery({
    page,
    limit,
    searchText,
  });
  const support = supportData?.data;
  const [replySupportMessages, { isLoading: replyLoading }] =
    useReplySupportMessagesMutation();

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
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>
          {record?.userId?.firstName} {record?.userId?.lastName}
        </span>
      ),
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
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>
          {record?.userId?.contact ? record?.userId?.contact : "Not Added Yet"}
        </span>
      ),
    },
    {
      title: "Car Name",
      dataIndex: "carName",
      key: "carName",
      render: (_, record) => (
        <span style={{ color: "#FDFDFD" }}>{record?.serviceId?.Make}</span>
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
      title: "Issues",
      dataIndex: "message",
      key: "message",
      render: (text) => {
        const shortText =
          text && text.length > 15 ? text.substring(0, 15) + "..." : text;
        return (
          <span className="text-[#FDFDFD] w-44 flex justify-between items-center">
            {shortText}
            {text && text.length > 15 && (
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

  const handleReply = async (e) => {
    e.preventDefault();
    const replyMessage = e.target.replyMessage.value;
    const payload = {
      id: value?._id,
      replyMessage: { replyMessage },
    };

    try {
      const res = await replySupportMessages(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        e.target.reset();
        setValue(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to reply. Please try again.");
    }
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
              dataSource={support}
              loading={isLoading}
              pagination={{
                total: supportData?.meta?.total,
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
        open={value}
        onCancel={() => setValue(null)}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1 className="text-[20px] font-medium mb-3">Reply A Message</h1>
          <p className="text-lg font-medium mb-5">{value?.message}</p>
          <form onSubmit={handleReply}>
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
                name="replyMessage"
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
              value={replyLoading ? "Sending..." : "Save & change"}
              type="submit"
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Support;
