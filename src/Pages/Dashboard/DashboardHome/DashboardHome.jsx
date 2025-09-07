import UsersAreaChart from "./UsersAreaChart";
import SellingLineChart from "./SellingLineChart";
import { useState } from "react";
import { PiCarProfile, PiUser } from "react-icons/pi";
import { GiMicrochip } from "react-icons/gi";

function DashboardHome() {
  const [userYear, setUserYear] = useState("");
  const [sellerYear, setSellerYear] = useState("");

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

  const usersData = [
    {
      month: "Jan",
      Users: 0,
      Owners: 0,
      FleetOwners: 0,
      Mechanics: 0,
      Drivers: 0,
      Dealers: 0,
    },
    {
      month: "Feb",
      Users: 0,
      Owners: 0,
      FleetOwners: 0,
      Mechanics: 0,
      Drivers: 0,
      Dealers: 0,
    },
    {
      month: "Mar",
      Users: 10,
      Owners: 5,
      FleetOwners: 2,
      Mechanics: 1,
      Drivers: 10,
      Dealers: 3,
    },
    {
      month: "Apr",
      Users: 50,
      Owners: 10,
      FleetOwners: 4,
      Mechanics: 3,
      Drivers: 20,
      Dealers: 5,
    },
    {
      month: "May",
      Users: 0,
      Owners: 0,
      FleetOwners: 0,
      Mechanics: 0,
      Drivers: 0,
      Dealers: 0,
    },
    {
      month: "Jun",
      Users: 0,
      Owners: 0,
      FleetOwners: 1,
      Mechanics: 0,
      Drivers: 5,
      Dealers: 0,
    },
    {
      month: "Jul",
      Users: 200,
      Owners: 20,
      FleetOwners: 10,
      Mechanics: 5,
      Drivers: 50,
      Dealers: 10,
    },
    {
      month: "Aug",
      Users: 800,
      Owners: 150,
      FleetOwners: 200,
      Mechanics: 100,
      Drivers: 500,
      Dealers: 40,
    },
    {
      month: "Sep",
      Users: 0,
      Owners: 0,
      FleetOwners: 0,
      Mechanics: 0,
      Drivers: 0,
      Dealers: 0,
    },
    {
      month: "Oct",
      Users: 0,
      Owners: 0,
      FleetOwners: 0,
      Mechanics: 0,
      Drivers: 0,
      Dealers: 0,
    },
    {
      month: "Nov",
      Users: 0,
      Owners: 0,
      FleetOwners: 0,
      Mechanics: 0,
      Drivers: 0,
      Dealers: 0,
    },
    {
      month: "Dec",
      Users: 0,
      Owners: 0,
      FleetOwners: 0,
      Mechanics: 0,
      Drivers: 0,
      Dealers: 0,
    },
  ];

  const statistics = [
    {
      title: "Total Devices",
      amount: "22K",
      icon: <GiMicrochip className="text-2xl text-[#EEEEEE]" />,
      color: "bg-[#0F78FF]",
    },
    {
      title: "Total Vehicles",
      amount: "5K",
      icon: <PiCarProfile className="text-2xl text-[#EEEEEE]" />,
      color: "bg-[#126E15]",
    },
    {
      title: "Total Drivers",
      amount: "5.1k",
      icon: <PiUser className="text-2xl text-[#EEEEEE]" />,
      color: "bg-[#A44D00]",
    },
    {
      title: "Total Mechanics",
      amount: "Coming Soon",
      icon: <PiUser className="text-2xl text-[#EEEEEE]" />,
      color: "bg-[#FF7700]",
    },
  ];

  return (
    <div className="flex flex-col bg-[#121212]">
      <div className="grid grid-cols-4 gap-2 max-h-[150px] mb-2">
        {statistics.map(({ title, amount, icon, color }) => (
          <div key={title} className="rounded-lg py-4 px-5 gap-4 bg-green">
            <div className="flex justify-start items-start gap-4 mb-4">
              <div className={`p-3 rounded-full ${color}`}>{icon}</div>
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
          userStats={deviceMonthlyData}
        />
      </div>

      <div className="grid grid-cols-1 gap-x-2 mt-2">
        <SellingLineChart
          setSellerYear={setSellerYear}
          sellingStats={usersData}
        />
      </div>
    </div>
  );
}

export default DashboardHome;
