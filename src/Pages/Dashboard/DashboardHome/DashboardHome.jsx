import UsersAreaChart from "./UsersAreaChart";
import SellingLineChart from "./SellingLineChart";
import StudentsBarChart from "./StudentsBarChart";
import { useStatisticsQuery } from "../../../redux/features/statisticsApi";
import { useState } from "react";
import { PiCarProfile, PiUser } from "react-icons/pi";
import { GiMicrochip } from "react-icons/gi";

function DashboardHome() {
  const [userYear, setUserYear] = useState("");
  const [sellerYear, setSellerYear] = useState("");
  const [studentYear, setStudentYear] = useState("");

  const { data } = useStatisticsQuery({ userYear, sellerYear, studentYear });
  const overView = data?.data?.overView;

  const statistics = [
    {
      title: "Total Devices",
      amount: overView?.totalOrder,
      icon: <GiMicrochip className="text-2xl text-[#EEEEEE]" />,
    },
    {
      title: "Total Drivers",
      amount: overView?.totalUsers,
      icon: <PiUser className="text-2xl text-[#EEEEEE]" />,
    },
    {
      title: "Total Vehicles",
      amount: `${overView?.totalSold?.toLocaleString()}`,
      icon: <PiCarProfile className="text-2xl text-[#EEEEEE]" />,
    },
  ];

  return (
    <div className="flex flex-col bg-[#121212]">
      <div className="grid grid-cols-3 gap-2 max-h-[150px] mb-2">
        {statistics.map(({ title, amount, icon }) => (
          <div key={title} className="rounded-lg py-4 px-5 gap-4 bg-green">
            <div className="flex justify-start items-start gap-4 mb-4">
              <div className="bg-action p-3 rounded-full">{icon}</div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg text-[#EEEEEE] font-medium">{title}</h2>
                <p className="text-[#EEEEEE]">Total : {amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#242424] rounded-lg p-4">
        <UsersAreaChart
          setUserYear={setUserYear}
          userStats={data?.data?.userListByMonthsData}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-2 mt-2">
        <SellingLineChart
          setSellerYear={setSellerYear}
          sellingStats={data?.data?.orderListByMonthsData}
        />
        <StudentsBarChart
          setStudentYear={setStudentYear}
          studentStats={data?.data?.studentListByMonthsData}
        />
      </div>
    </div>
  );
}

export default DashboardHome;
