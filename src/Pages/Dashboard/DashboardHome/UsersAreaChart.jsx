import { ConfigProvider, DatePicker } from "antd";
import { FaChevronDown } from "react-icons/fa";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const CustomLegend = () => {
  return (
    <div className="flex gap-2 2xl:gap-4 text-sm text-[#EEEEEE]">
      <div className="flex items-center gap-1 whitespace-nowrap">
        <div className="w-3 h-3 bg-[#0F78FF] rounded-sm " />
        Devices
      </div>
      {/* <div className="flex items-center gap-1 whitespace-nowrap">
        <div className="w-3 h-3 bg-[#52C41A] rounded-sm " />
        Active Devices
      </div>
      <div className="flex items-center gap-1 whitespace-nowrap">
        <div className="w-3 h-3 bg-[#FF4D4F] rounded-sm " />
        Inactive Devices
      </div> */}
    </div>
  );
};

const UsersAreaChart = ({ setDeviceYear, deviceStats }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "25px",
        }}
      >
        <h3 className="text-xl font-medium text-[#EEEEEE]">
          Devices Statistics
        </h3>
        <div className="flex items-center gap-6">
          <CustomLegend />
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#0F78FF",
              },
            }}
          >
            <DatePicker
              className="!cursor-pointer"
              picker="year"
              suffixIcon={<FaChevronDown className="text-gray-500 text-sm" />}
              onChange={(_, dateString) => {
                setDeviceYear(dateString);
              }}
            />
          </ConfigProvider>
        </div>
      </div>

      <ResponsiveContainer width={"100%"} height={285}>
        <AreaChart data={deviceStats} barGap={100}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F78FF" stopOpacity={1} />
              <stop offset="100%" stopColor="#0F78FF" stopOpacity={0} />
            </linearGradient>
            {/* <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#52C41A" stopOpacity={1} />
              <stop offset="100%" stopColor="#52C41A" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorInactive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF4D4F" stopOpacity={1} />
              <stop offset="100%" stopColor="#FF4D4F" stopOpacity={0} />
            </linearGradient> */}
          </defs>
          <CartesianGrid horizontal vertical={false} />
          <XAxis
            dataKey="month"
            padding="gap"
            minTickGap={2}
            fontSize="12px"
            fontWeight="400"
            strokeOpacity={0}
          />
          <YAxis
            tickCount={11}
            width={40}
            fontSize="12px"
            fontWeight="400"
            strokeOpacity={0}
          />
          <Tooltip />
          <Area
            connectNulls
            type="monotone"
            dataKey="device"
            stroke="#0F78FF"
            fill="url(#colorUv)"
            name="Total Device"
          />
          {/* <Area
            connectNulls
            type="monotone"
            dataKey="activeDevice"
            stroke="#52C41A"
            fill="url(#colorActive)"
            name="Active Devices"
          />
          <Area
            connectNulls
            type="monotone"
            dataKey="inactiveDevice"
            stroke="#FF4D4F"
            fill="url(#colorInactive)"
            name="Inactive Devices"
          /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersAreaChart;
