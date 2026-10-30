"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { etb } from "@/lib/format";

export default function RevenueChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="city" stroke="#c9a0a0" />
        <YAxis stroke="#c9a0a0" tickFormatter={(val) => etb.format(val)} width={80} />
        <Tooltip 
          contentStyle={{ backgroundColor: "#2a0000", borderColor: "#cc0000" }}
          formatter={(val) => [etb.format(val), "Revenue"]} 
        />
        <Bar dataKey="revenue" fill="#cc0000" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}