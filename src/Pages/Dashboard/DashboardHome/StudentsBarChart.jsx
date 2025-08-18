import { ConfigProvider, DatePicker, Dropdown } from "antd";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FaChevronDown } from "react-icons/fa";

const StudentsBarChart = ({setStudentYear, studentStats}) => {
  
  const CustomLegend = () => {
    return (
      <div className="flex gap-2 2xl:gap-4 text-sm text-[#EEEEEE]">
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="w-3 h-3 bg-[#0F78FF] rounded-sm " />
          Vehicles
        </div>
      </div>
    );
  };

  return (
    <div className=" py-6 rounded-xl w-full  bg-[#242424]">
      <div className="flex items-center justify-between px-10 mb-4">
        <h1 className="text-xl font-medium text-[#EEEEEE]">
          Vehicles Statistics
        </h1>
        <div className="flex items-center gap-2 2xl:gap-6">
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
                setStudentYear(dateString);
              }}
            />
          </ConfigProvider>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={studentStats}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          {/* <Bar barSize={10} radius={50} dataKey="saleTotal" fill="#EAF2F3" /> */}
          <Bar barSize={10} radius={50} dataKey="count" name="Students" fill="#0F78FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentsBarChart;
