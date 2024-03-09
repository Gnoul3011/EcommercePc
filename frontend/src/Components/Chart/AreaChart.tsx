import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MonthlyRevenue } from "../../PagesAdmin/Dashboard";

const initData = [
  {
    name: "Jan",
    pv: 0,
    amt: 0,
  },
  {
    name: "Feb",
    pv: 0,
    amt: 0,
  },
  {
    name: "Mar",
    pv: 0,
    amt: 0,
  },
  {
    name: "Apr",
    pv: 0,
    amt: 0,
  },
  {
    name: "May",
    pv: 0,
    amt: 0,
  },
  {
    name: "Jun",
    pv: 0,
    amt: 0,
  },
  {
    name: "Jul",
    pv: 0,
    amt: 0,
  },
  {
    name: "Aug",
    pv: 0,
    amt: 0,
  },
  {
    name: "Sep",
    pv: 0,
    amt: 0,
  },
  {
    name: "Oct",
    pv: 0,
    amt: 0,
  },
  {
    name: "Nov",
    pv: 0,
    amt: 0,
  },
  {
    name: "Dec",
    pv: 0,
    amt: 0,
  },
];

const AreaCharts = (props: { revenues: MonthlyRevenue[] }) => {
  const [data, setData] = useState(initData);
  const { revenues } = props;

  useEffect(() => {
    setData((prevState) => {
      if (prevState) {
        let newState = [...prevState];
        revenues.map(revenue => {
          console.log(newState[revenue.month - 1])
          return newState[revenue.month - 1].pv = revenue.total;
        })
        return newState
      }
      return prevState;
    })
  }, [revenues])

  return (
    <AreaChart
      style={{ width: "100%" }}
      width={1100}
      height={250}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="10%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />

      <Area
        type="monotone"
        dataKey="pv"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#colorPv)"
      />
    </AreaChart>
  );
};

export default AreaCharts;
