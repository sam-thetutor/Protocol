import React from "react";
import { Bar } from "react-chartjs-2";

const BoneAnalytics = ({ analytics }) => {
  console.log("Bob analytics", analytics);

  if (!analytics) return;
  const creationData = {
    labels: ["Miners Created"],
    datasets: [
      {
        label: "Miners Created",
        data: [Number(analytics.minersCreated)],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const upgradeData = {
    labels: ["Miners Upgraded"],
    datasets: [
      {
        label: "Miners Upgraded",
        data: [Number(analytics.minersUpgrades)],
        backgroundColor: "rgba(123, 132, 55, 0.6)",
      },
    ],
  };

  const icpSpent = {
    labels: ["Miners Upgraded"],
    datasets: [
      {
        label: "ICP spent",
        data: [Number(analytics)],
        backgroundColor: "rgba(103, 50, 100, 0.6)",
      },
    ],
  };

  const totalHrsInPool = {
    labels: ["Miners Upgraded"],
    datasets: [
      {
        label: "Hours in Pool",
        data: [Number(analytics.totalHrsInPool)],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="flex flex-col">

      <div className="flex flex-row flex-wrap gap-1  w-full h-full">
        <div style={{ width: "250px", }} className=" border rounded-md p-1">
          <Bar
            data={creationData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom" },
                title: { display: true },
              },
            }}
          />
        </div>

        <div style={{ width: "250px", }} className=" border rounded-md p-1">
          <Bar
            data={upgradeData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom" },
                title: { display: true },
              },
            }}
          />
        </div>

        <div style={{ width: "250px", }} className=" border rounded-md p-1">
          <Bar
            data={icpSpent}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom" },
                title: { display: true },
              },
            }}
          />
        </div>
        <div style={{ width: "250px", }} className=" border rounded-md p-1">
          <Bar
            data={totalHrsInPool}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom" },
                title: { display: true },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BoneAnalytics;
