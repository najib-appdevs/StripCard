"use client";

import { useDashboard } from "../../context/DashboardContext";
import CardyFie from "../Virtual-Card-CardyFie/CardyFie";
import Stripe from "../Virtual-Card-Stripe/Stripe";
import Sudo from "../Virtual-Card-Sudo/Sudo";
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

  if (activeVirtualSystem === "sudo") {
    // render Sudo component
    return <Sudo />;
  }

  if (activeVirtualSystem === "cardyfie") {
    // render CardyFie component
    return <CardyFie />;
  }
  if (activeVirtualSystem === "stripe") {
    // render Stripe component
    return <Stripe />;
  }

  return <div>Unsupported system: {activeVirtualSystem}</div>;
}
