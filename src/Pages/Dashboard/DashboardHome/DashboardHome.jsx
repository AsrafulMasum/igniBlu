import UsersAreaChart from "./UsersAreaChart";
import SellingLineChart from "./SellingLineChart";
import { useState } from "react";
import { PiCarProfile, PiUser } from "react-icons/pi";
import { GiMicrochip } from "react-icons/gi";
import {
  useStatisticsQuery,
  useUserStatisticsQuery,
} from "../../../redux/features/statisticsApi";
import { RxActivityLog } from "react-icons/rx";

function DashboardHome() {
  const [userYear, setUserYear] = useState("");
  const [sellerYear, setSellerYear] = useState("");
  const { data: statisticsData } = useStatisticsQuery();
  const { data: userStatisticsData } = useUserStatisticsQuery(userYear);
  const usersData = userStatisticsData?.data;

  const deviceMonthlyData = [
    { month: "Jan", totalDevice: 50, activeDevice: 40, inactiveDevice: 10 },
    { month: "Feb", totalDevice: 60, activeDevice: 55, inactiveDevice: 5 },
    { month: "Mar", totalDevice: 45, activeDevice: 35, inactiveDevice: 10 },
    { month: "Apr", totalDevice: 70, activeDevice: 65, inactiveDevice: 5 },
    { month: "May", totalDevice: 55, activeDevice: 50, inactiveDevice: 5 },
    { month: "Jun", totalDevice: 80, activeDevice: 70, inactiveDevice: 10 },
    { month: "Jul", totalDevice: 200, activeDevice: 180, inactiveDevice: 20 },
    {
      month: "Aug",
      totalDevice: 2200,
      activeDevice: 1500,
      inactiveDevice: 700,
    },
    { month: "Sep", totalDevice: 75, activeDevice: 65, inactiveDevice: 10 },
    { month: "Oct", totalDevice: 60, activeDevice: 50, inactiveDevice: 10 },
    { month: "Nov", totalDevice: 50, activeDevice: 45, inactiveDevice: 5 },
    { month: "Dec", totalDevice: 65, activeDevice: 60, inactiveDevice: 5 },
  ];

  const statistics = [
    {
      title: "Total Devices",
      amount: statisticsData?.data?.totalDevices,
      icon: <GiMicrochip className="text-2xl text-[#EEEEEE]" />,
      color: "bg-[#0F78FF]",
    },
    {
      title: "Total Vehicles",
      amount: statisticsData?.data?.vehicale,
      icon: <PiCarProfile className="text-2xl text-[#EEEEEE]" />,
      color: "bg-[#126E15]",
    },
    {
      title: "Total Drivers",
      amount: statisticsData?.data?.totalDrivers,
      icon: <PiUser className="text-2xl text-[#EEEEEE]" />,
      color: "bg-[#A44D00]",
    },
    {
      title: "Daily Activities",
      amount: statisticsData?.data?.IN_GARAGE,
      secondAmount: statisticsData?.data?.IN_SERVICE,
      icon: <RxActivityLog className="text-2xl text-[#EEEEEE]" />,
      color: "bg-[#FF7700]",
    },
  ];

  return (
    <div className="flex flex-col bg-[#121212]">
      <div className="grid grid-cols-4 gap-2 max-h-[150px] mb-2">
        {statistics.map(({ title, amount, icon, color, secondAmount }) => (
          <div key={title} className="rounded-lg py-4 px-5 gap-4 bg-green">
            <div className="flex justify-start items-start gap-4 mb-4">
              <div className={`p-3 rounded-full ${color}`}>{icon}</div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg text-[#EEEEEE] font-medium">{title}</h2>
                <div>
                  <div>
                    {typeof secondAmount !== "undefined" ? (
                      <div className="flex justify-between items-center gap-4">
                        <p className="text-action">
                          In Service: {secondAmount}
                        </p>
                        <p className="text-[#FF4D4F]">In Garage: {amount}</p>
                      </div>
                    ) : (
                      <p className="text-[#EEEEEE]">Total: {amount}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#242424] rounded-lg p-4">
        <UsersAreaChart
          setUserYear={setUserYear}
          userStats={deviceMonthlyData}
        />
      </div>

      <div className="grid grid-cols-1 gap-x-2 mt-2">
        <SellingLineChart
          setUserYear={setUserYear}
          sellingStats={usersData}
        />
      </div>
    </div>
  );
}

export default DashboardHome;
