import { ImageBanner } from "@/components/image-banner";
import Image from "next/image";
import React from "react";

const legalDocs = [
  "https://cdn.palawanwebsolutions.com/clarkkent/legal/DOT.png",
  "https://cdn.palawanwebsolutions.com/clarkkent/legal/cr.png",
  "https://cdn.palawanwebsolutions.com/clarkkent/legal/Dti.png",
  "https://cdn.palawanwebsolutions.com/clarkkent/legal/mayors-permit.png",
  "https://cdn.palawanwebsolutions.com/clarkkent/legal/philgeps.png",
];

function Legalities() {
  return (
    <div className="mx-auto my-10 max-w-4xl space-y-5 rounded-md bg-white p-4 shadow-sm">
      <h1 className="heading-rose">Legal Documents</h1>

      <p>
        Below are the official legal and regulatory documents of the company,
        including registrations and permits issued by the appropriate government
        authorities. These documents demonstrate the company’s legal standing,
        compliance, and authorization to operate.
      </p>

      <ImageBanner images={legalDocs} />
    </div>
  );
}

export default Legalities;
