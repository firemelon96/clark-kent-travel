import axios from "axios";

const authToken = Buffer.from(
  "xnd_development_semDoEUETRrKm4nV79YNB24wvTO7UjB7NecsTdqVJrk1Tr83YyaTdg9YelMv1",
).toString("base64");

type Customer = {
  given_names: string;
  email: string;
  mobile_number: string;
};

type NotificationPreferences = {
  invoice_paid: string[];
};

type Items = {
  name: string;
  quantity: number;
  category: string;
  price: number;
};

export type Payload = {
  external_id: string;
  amount: number;
  currency: "PHP" | "USD";
  success_redirect_url: string;
  failure_redirect_url: string;
  customer: Customer;
  customer_notification_preference: NotificationPreferences;
  items: Items[];
};

export async function createXenditPayment(payload: Payload) {
  const response = await axios.post(
    "https://api.xendit.co/v2/invoices",
    { ...payload },
    {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    },
  );

  console.log(response.data);

  // redirect(response.data.invoice_url);

  return response;
}
