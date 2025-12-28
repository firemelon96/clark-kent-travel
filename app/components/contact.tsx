"use client";
import { BsMessenger, BsWhatsapp } from "react-icons/bs";
import { GoogleMap } from "./google-map";

const fbPageId = "276166685864117";

const Contact = () => {
  return (
    <section className="bg-rose-50 py-10" id="contact">
      <div className="container mx-auto md:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full p-4 md:w-1/2">
            <GoogleMap />
          </div>
          <div className="w-full p-4 md:w-1/2">
            <div className="flex w-full flex-col items-start gap-4">
              <div className="mb-20 w-full text-center text-4xl font-semibold text-slate-800 md:text-start">
                <span>Got any Inquiries?</span>
                <p className="text-rose-500">Message us</p>
              </div>
              <a
                target="_blank"
                href={`https://wa.me/639552946691?text=I'm%20interested%20in%20your%20tour%20booking`}
                className="flex w-full items-center justify-center gap-3 border p-4 text-3xl text-emerald-500"
              >
                <BsWhatsapp /> Chat on Whatsapp
              </a>
              <a
                target="_blank"
                href={`https://m.me/${fbPageId}?text=I'm%20interested%20in%20your%20tour%20booking`}
                className="flex w-full items-center justify-center gap-3 border p-4 text-3xl text-sky-500"
              >
                <BsMessenger /> Messenger
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
