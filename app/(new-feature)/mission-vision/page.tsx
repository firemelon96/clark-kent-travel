const MisionPage = () => {
  return (
    <div className="mx-auto my-10 flex max-w-4xl flex-col gap-4 rounded-md bg-white p-4 shadow-sm">
      <div className="mx-auto flex max-w-3xl flex-col">
        <h2 className="heading-rose">VISION</h2>
        <p className="">
          To be recognized for the excellence of our services and to serve as
          the compass guiding travelers toward the heart of their aspirations.
        </p>
      </div>
      <div className="mx-auto flex max-w-3xl flex-col">
        <h2 className="heading-rose">MISION</h2>
        <p>
          Our mission is to transform wanderlust into lifelong memories by
          providing complete customer satisfaction through world-class tourism
          services, while being still deeply committed to the social, cultural,
          and environmental values of our country.
        </p>
      </div>
      <div className="mx-auto flex max-w-3xl flex-col text-start">
        <h2 className="heading-rose">OUR CORE VALUES</h2>

        <ul className="list-inside list-disc pl-4">
          <li>Services Quality</li>
          <li>Open to feedback</li>
          <li>
            Integrity: Upholding honesty and transparency in all dealings.
          </li>
          <li>
            Customer-Centric: Prioritizing exceptional service and customer
            satisfaction.
          </li>
          <li>
            Reliability: Ensuring consistent and dependable travel experiences.
          </li>
          <li>
            Passion for Exploration: Inspiring and enabling a love for travel
            and discovery
          </li>
          <li>
            Community and Environment: Promoting responsible and sustainable
            travel practices.
          </li>
          <li>
            Honesty- It is critical for us as a company that the information we
            provide to our customers is honest and correct.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MisionPage;
