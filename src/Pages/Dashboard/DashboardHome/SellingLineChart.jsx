import { ConfigProvider, DatePicker } from "antd";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FaChevronDown } from "react-icons/fa";

const CustomLegend = () => {
  return (
    <div className="flex gap-2 2xl:gap-4 text-sm text-[#EEEEEE]">
      <div className="flex items-center gap-1 whitespace-nowrap">
        <div className="w-3 h-3 bg-[#1E90FF] rounded-sm " />
        Users
      </div>
      <div className="flex items-center gap-1 whitespace-nowrap">
        <div className="w-3 h-3 bg-[#126E15] rounded-sm " />
        Owners
      </div>
      {/* <div className="flex items-center gap-1 whitespace-nowrap">
        <div className="w-3 h-3 bg-[#00B94C] rounded-sm " />
        Fleet Owners
      </div>
      <div className="flex items-center gap-1 whitespace-nowrap">
        <div className="w-3 h-3 bg-[#00FF08] rounded-sm " />
        Dealers
      </div>
      <div className="flex items-center gap-1 whitespace-nowrap">
        <div className="w-3 h-3 bg-[#A44D00] rounded-sm " />
        Driver
      </div> */}
      <div className="flex items-center gap-1 whitespace-nowrap">
        <div className="w-3 h-3 bg-[#FF7700] rounded-sm " />
        Mechanic
      </div>
    </div>
  );
};

const SellingLineChart = ({ setUserYear, sellingStats }) => {
  return (
    <div className="bg-[#242424] py-6 rounded-xl w-full">
      <div className="flex items-center justify-between px-10 mb-4">
        <h1 className="text-xl font-medium text-[#EEEEEE]">Users Statistics</h1>
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
                setUserYear(dateString);
              }}
            />
          </ConfigProvider>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={sellingStats}
          margin={{ top: 5, right: 30, left: 10, bottom: 0 }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="user"
            name="Users"
            stroke="#0F78FF"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="owner"
            name="Owners"
            stroke="#126E15"
            activeDot={{ r: 8 }}
          />
          {/* <Line
            type="monotone"
            dataKey="FleetOwners"
            name="Fleet Owners"
            stroke="#00B94C"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Dealers"
            name="Dealers"
            stroke="#00FF08"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Mechanics"
            name="Mechanics"
            stroke="#FF7700"
            activeDot={{ r: 8 }}
          /> */}
          <Line
            type="monotone"
            dataKey="driver"
            name="Drivers"
            stroke="#A44D00"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SellingLineChart;
