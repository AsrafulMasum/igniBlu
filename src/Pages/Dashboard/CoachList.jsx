import { Button, ConfigProvider, Input, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { CiLock, CiUnlock } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";
import {
  useGetCoachQuery,
  useLockUserMutation,
} from "../../redux/features/usersApi";
import { imageUrl } from "../../redux/api/baseApi";
import { useSearchParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import AddCoachModal from "../../Components/Dashboard/AddCoachModal";
import toast from "react-hot-toast";

const CoachLists = () => {
  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";
  const [openAddModel, setOpenAddModel] = useState(false);

  const [showActive, setShowActive] = useState(false);
  const [selectCoach, setSelectCoach] = useState("");

  const {
    data: coachData,
    isLoading,
    refetch,
  } = useGetCoachQuery({ searchTerm, page });
  const [lockUser, { isLoading: updating }] = useLockUserMutation();

  // ----------------- Action --------------------

  useEffect(() => {
    refetch();
  }, [searchParams]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const newValue = e.target.value;

    const newParams = new URLSearchParams(searchParams);
    if (newValue) {
      newParams.set("searchTerm", newValue);
    } else {
      newParams.delete("searchTerm");
    }
    setSearchParams(newParams);
  };

  const handleLockCoach = async () => {
    try {
      const res = await lockUser({ id: selectCoach });

      if (res?.data) {
        toast.success(res?.data?.message);
        refetch();
        setShowActive(false);
      }
    } catch (error) {
      setShowActive(false);
    }
  };

  // -------------- Table Column ---------------

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
      title: "Coach Name",
      key: "name",
      render: (record) => {
        return (
          <div className="flex items-center gap-3">
            <div style={{ height: 48, width: 48 }}>
              <img
                src={
                  record?.image && record?.image?.startsWith("http" || "https")
                    ? record?.image
                    : record?.image
                    ? `${imageUrl}${record?.image}`
                    : "/default-avatar.jpg"
                }
                alt=""
                className="h-12 w-12 object-cover rounded-full"
              />
            </div>
            <span style={{ color: "#FDFDFD" }}>{record?.name}</span>
          </div>
        );
      },
    },
    {
      title: "Coach Id",
      dataIndex: "employeeId",
      key: "employeeId",
      render: (text) => <span className="text-[#FDFDFD]">{text ?? "N/A"}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <span style={{ color: "#FDFDFD" }}>{text ?? "N/A"}</span>
      ),
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",

            paddingRight: 10,
          }}
        >
          <div>
            {record?.text === "active" ? (
              <button
                className="flex justify-center items-center rounded-md"
                onClick={() => setOpen(true)}
                style={{
                  cursor: "pointer",
                  border: "none",
                  outline: "none",
                  backgroundColor: "#121212",
                  width: "40px",
                  height: "32px",
                }}
              >
                <CiUnlock size={26} className="text-secondary" />
              </button>
            ) : (
              <button
                className="flex justify-center items-center rounded-md"
                onClick={() => {
                  setSelectCoach(record?._id);
                  setShowActive(true);
                }}
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
            )}
          </div>
        </div>
      ),
    },
  ];

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
            Coach Lists
          </h3>

          <div className="flex items-center gap-3">
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
            <Button
              onClick={() => setOpenAddModel(true)}
              style={{
                width: "151px",
                height: "40px",
                boxShadow: "0px 2px 4px 0px #0000001A",
                backgroundColor: "#0F78FF",
                border: "none",
                transition: "none",
                color: "#FDFDFD",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <PlusOutlined />
              <span style={{ margin: 0 }}>Add Coach</span>
            </Button>
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
              dataSource={coachData?.data}
              loading={isLoading || updating}
              pagination={{
                total: coachData?.pagination?.total,
                current: page,
                pageSize: coachData?.pagination?.limit,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#242424",
          },
        }}
      >
        <AddCoachModal
          openAddModel={openAddModel}
          setOpenAddModel={setOpenAddModel}
          refetch={refetch}
        />
      </ConfigProvider>

      <Modal
        centered
        open={showActive}
        onCancel={() => setShowActive(false)}
        width={400}
        footer={false}
      >
        <div className="p-6 text-center">
          <p className="text-[#D93D04] text-center font-semibold">
            Are you sure !
          </p>
          <p className="pt-4 pb-12 text-center">
            Do you want to delete this content ?
          </p>
          <button
            onClick={handleLockCoach}
            className="bg-action py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CoachLists;
