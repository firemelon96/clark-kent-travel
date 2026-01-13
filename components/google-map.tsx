"use client";

// import { Map } from 'pigeon-maps';

export const GoogleMap = () => {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3435.2068912933487!2d118.74592930172149!3d9.735217254228603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33b56785755e0f45%3A0x777937a5083dd0c0!2sCLARK%20KENT%20Travel%20and%20Tours%20%26%20Ticketing%20Services!5e0!3m2!1sen!2sph!4v1766747150968!5m2!1sen!2sph"
        width="600"
        height="450"
        loading="lazy"
      ></iframe>
    </div>
  );
};
