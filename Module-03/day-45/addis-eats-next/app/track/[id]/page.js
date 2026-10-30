"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { when } from "@/lib/format";

const MapPanel = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "300px",
        background: "#2a0000",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#c9a0a0",
      }}
    >
      Loading map...
    </div>
  ),
});

export default function TrackPage({ params }) {
  const [status, setStatus] = useState("Preparing");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus((prev) =>
        prev === "Preparing"
          ? "On the way"
          : prev === "On the way"
          ? "Delivered"
          : "Preparing"
      );
      setLastUpdate(new Date());
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="form-page" style={{ maxWidth: "600px" }}>
      <h1 className="form-title">Track Order {params.id}</h1>

      <div
        style={{
          marginBottom: "24px",
          padding: "16px",
          background: "#2a0000",
          border: "1px solid #cc0000",
          borderRadius: "8px",
        }}
      >
        <p style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "8px" }}>
          Status: <strong style={{ color: "#ffd700" }}>{status}</strong>
        </p>
        <p style={{ color: "#c9a0a0", fontSize: "0.9rem" }}>
          Last updated: {when.format(lastUpdate)}
        </p>
      </div>

      <MapPanel />

      <p style={{ marginTop: "16px", color: "#c9a0a0", fontSize: "0.9rem" }}>
        <strong>Delivery Address:</strong> Bole, Addis Ababa.
        <br />
        (Text description provided for screen readers.)
      </p>
    </main>
  );
}