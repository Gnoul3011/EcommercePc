import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Legend, RadialBar, RadialBarChart, Tooltip } from "recharts";
import { AdminOrder } from "../../PagesAdmin/OrderAdmin";
const initPieChart = [
  {
    name: "Đã giao",
    now: 0,
    total: 0,
    fill: "rgb(10, 207, 151)",
  },
  {
    name: "Đang xử lý",
    now: 0,
    total: 0,
    fill: "rgba(255, 195, 66, 1)",
  },
  {
    name: "Đã xác nhận",
    now: 0,
    total: 0,
    fill: "rgb(18,225,123)",
  },
  {
    name: "Đang giao",
    now: 0,
    total: 0,
    fill: "#727cf5",
  },
  {
    name: "Đã hủy",
    now: 0,
    total: 0,
    fill: "rgba(255, 66, 66, 1)",
  },
];

const Cell = (props: { date: Date | null }) => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [pieChartData, setPieChartData] = useState(initPieChart);

  const fetchOrders = useCallback(async () => {
    const response = await axios.get("http://127.0.0.1:8080/order/getAllOrder");
    setOrders(response.data);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    setPieChartData([
      {
        name: "Đang xử lý",
        now: orders.filter(
          (item: AdminOrder) =>
            item.status === "PENDING" &&
            new Date(item.createdAt).toLocaleDateString() ===
              (props.date
                ? new Date(props.date).toLocaleDateString()
                : new Date().toLocaleDateString())
        ).length,
        total: orders.length,
        fill: "rgba(255, 195, 66, 1)",
      },
      {
        name: "Đã xác nhận",
        now: orders.filter(
          (item: AdminOrder) =>
            item.status === "CONFIRMED" &&
            new Date(item.createdAt).toLocaleDateString() ===
              (props.date
                ? new Date(props.date).toLocaleDateString()
                : new Date().toLocaleDateString())
        ).length,
        total: orders.length,
        fill: "rgb(18,225,123)",
      },
      {
        name: "Đang giao",
        now: orders.filter(
          (item: AdminOrder) =>
            item.status === "DELIVERING" &&
            new Date(item.createdAt).toLocaleDateString() ===
              (props.date
                ? new Date(props.date).toLocaleDateString()
                : new Date().toLocaleDateString())
        ).length,
        total: orders.length,
        fill: "#727cf5",
      },
      {
        name: "Đã giao",
        now: orders.filter(
          (item: AdminOrder) =>
            item.status === "SUCCESS" &&
            new Date(item.createdAt).toLocaleDateString() ===
              (props.date
                ? new Date(props.date).toLocaleDateString()
                : new Date().toLocaleDateString())
        ).length,
        total: orders.length,
        fill: "rgb(10, 207, 151)",
      },
      {
        name: "Đã hủy",
        now: orders.filter(
          (item: AdminOrder) =>
            item.status === "CANCELED" &&
            new Date(item.createdAt).toLocaleDateString() ===
              (props.date
                ? new Date(props.date).toLocaleDateString()
                : new Date().toLocaleDateString())
        ).length,
        total: orders.length,
        fill: "rgba(255, 66, 66, 1)",
      },
    ]);
  }, [orders, props.date]);
  
  return (
    <RadialBarChart
      width={400}
      height={300}
      innerRadius="10%"
      outerRadius="80%"
      data={pieChartData}
      startAngle={0}
      endAngle={360}
    >
      <RadialBar
        label={{ fill: "", position: "insideStart" }}
        background
        dataKey="now"
      />
      <Legend
        iconSize={12}
        width={120}
        height={260}
        layout="vertical"
        verticalAlign="middle"
        align="right"
      />
      <Tooltip />
    </RadialBarChart>
  );
};

export default Cell;
