import { GoogleMap } from "@/components/google-map";
import React from "react";

function Contact() {
  return (
    <div className="mx-auto my-10 flex max-w-5xl flex-col gap-4 p-2 md:flex-row">
      <GoogleMap />
      <div className="w-full space-y-5 rounded-md bg-white p-4">
        <div>
          <h1 className="heading-rose">Office Address</h1>
          <p>
            GSFM BLDG., Manalo Extension, Barangay Milagrosa, Puerto Princesa
            City, Palawan 5300, Philippines.
          </p>
        </div>

        <div>
          <h2 className="heading-rose">Contact us</h2>
          <ul className="">
            <li>
              <strong>Email :</strong> clarkkent_ts@yahoo.com |
              info.clarkkenttravelandtours@yahoo.com | b2bclarkkent@yahoo.com
            </li>
            <li>
              <strong>Whatsapp :</strong> +639552946691
            </li>
            <li>
              <strong>Viber :</strong> +639552946691
            </li>
            <li>
              <strong>Facebook :</strong> Clark Kent Travel and Tours &
              Ticketing Services
            </li>
            <li>
              <strong>Instagram :</strong> @clarkkenttravelandtours
            </li>
            <li>
              <strong>Contact numbers :</strong> <br />
              +639612948850 <br />
              +639173028053 <br />
              +639552946691 <br />
              +639610087749
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;
