"use client";

import { useDashboard } from "../../context/DashboardContext";
import Strowallet from "./Strowallet";

export default function VirtualCard() {
  const { activeVirtualSystem, moduleAccess } = useDashboard();

  if (!moduleAccess?.virtual_card) {
    return <div>Virtual cards not available.</div>;
  }

  if (activeVirtualSystem === "strowallet") {
    // render Strowallet component
    return (
      <>
        <Strowallet />
      </>
    );
  }

  if (activeVirtualSystem === "cardyfie") {
    // render Cardyfie component
    return <div>Cardyfie Virtual Card UI</div>;
  }

  return <div>Unsupported system: {activeVirtualSystem}</div>;
}
