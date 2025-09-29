import { useState } from "react";
import { ConfigProvider, Input, Modal, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import moment from "moment";
import {
  useGetGarageHistoryQuery,
  useUpdateDistanceMutation,
} from "../../redux/features/trackingApi";
import { GoPlus } from "react-icons/go";
import toast from "react-hot-toast";

const GarageHistory = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [vehicle, setVehicle] = useState(null);

  const { data: garageHistoryData, isLoading } = useGetGarageHistoryQuery({
    page,
    limit,
    searchText,
  });
  const garageHistory = garageHistoryData?.data;

  const [updateDistance, { isLoading: updateDistanceLoading }] =
    useUpdateDistanceMutation();

  const statusColorMap = {
    IN_SERVICE: { color: "#52C41A", bg: "#D9F2CD" },
    IN_GARAGE: { color: "#F4891C", bg: "#FFE8CC" },
  };

  const handleAddDistance = async (e) => {
    e.preventDefault();
    const miles = e.target.distance.value;
    const payload = {
      id: vehicle?._id,
      body: { miles },
    };

    try {
      const res = await updateDistance(payload).unwrap();
      if (res?.data) {
        toast.success("Distance Updated Successfully.");
        e.target.reset();
        setVehicle(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to reply. Please try again.");
    }
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
      render: (_, record) => {
        const currentStyle = statusColorMap[record?.serviceId?.status] || {
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
            {record?.serviceId?.status}
          </p>
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
          <div>
            <button
              className="flex justify-center items-center rounded-md"
              onClick={() => setVehicle(record?.serviceId)}
              style={{
                cursor: "pointer",
                border: "none",
                outline: "none",
                backgroundColor: "#121212",
                width: "40px",
                height: "32px",
              }}
            >
              <GoPlus size={26} className="text-secondary" />
            </button>
          </div>
        </div>
      ),
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
                total: garageHistory?.pagination?.total,
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
        open={vehicle}
        onCancel={() => setVehicle(null)}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1 className="text-[20px] font-medium mb-3">Add Distance</h1>
          <p className="text-lg font-medium mb-5">
            {vehicle?.Make} {vehicle?.Model}
          </p>
          <form onSubmit={handleAddDistance}>
            <div style={{ marginBottom: "16px" }}>
              <input
                type="number"
                placeholder="Enter distance in miles"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "60px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                  resize: "none",
                }}
                name="distance"
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
              value={updateDistanceLoading ? "Sending..." : "Save & change"}
              type="submit"
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default GarageHistory;
