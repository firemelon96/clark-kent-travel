import { format } from "date-fns";

function PrivacyPolicy() {
  return (
    <div className="mx-auto my-10 max-w-4xl space-y-5 rounded-md bg-white p-4 shadow-sm">
      <h1 className="heading-rose">Privacy Policy</h1>
      <div>
        <p className="text-sm">
          <strong>Effective Date:</strong> Jan - Dec 2026
          <br />
          <strong>Last Updated:</strong> {format(Date.now(), "LLL dd, yyyy")}
        </p>
      </div>
      <h2>1. Introduction</h2>

      <div className="space-y-2 pl-2">
        <p>
          Clark kent travel and tours respects your privacy and is committed to
          protecting your personal information. This Privacy Policy explains how
          we collect, use, and protect information when you visit our website or
          communicate with us.
        </p>
        <p>
          By using our website, you agree to the practices described in this
          Privacy Policy.
        </p>
      </div>

      <h3>2. Information We Collect</h3>
      <p>
        We do not require users to create accounts or log in. However, we may
        collect limited information as described below.
      </p>
      <p>a. Information You Voluntarily Provide</p>

      <div>
        <p>You may voluntarily provide personal information when you:</p>
        <ul className="list-inside list-disc">
          <li>Contact us via forms, email, or phone</li>
          <li>Submit inquiries or feedback</li>
        </ul>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
