import Image from "next/image";
import React from "react";

function Legalities() {
  return (
    <div className="mx-auto my-10 max-w-4xl rounded-md bg-white p-4 shadow-sm">
      <h1 className="heading-rose">Legal Documents</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <Image src={} width={300} height={300} alt="philgeps" />
      </div>
    </div>
  );
}

export default Legalities;
