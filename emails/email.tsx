import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import { format } from "date-fns";
import { z } from "zod";
import * as React from "react";
import { FormSchema } from "@/app/tours/components/form-with-zod";

type Props = z.infer<typeof FormSchema> & {
  name: string;
  age: number;
  nationality: string;
  gender: "male" | "female";
  title: string;
  address: string;
  email: string;
  contact: string;
  total: number;
};

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "http://localhost:3001";

export const Email = ({
  count,
  date = new Date(Date.now()),
  notes,
  travellerType,
  age,
  gender,
  name,
  nationality,
  title,
  address,
  email,
  contact,
  total,
}: Props) => {
  const previewText = `Your Booking for ${title} Awaits`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-5 max-w-[500px]">
            <Section className="min-w-full">
              <Row className="mt-10">
                <Column>
                  <Img
                    src="https://res.cloudinary.com/dnvcioept/image/upload/v1728403417/wr416vjx538zksetseph.png"
                    width="500"
                    height="120"
                    alt="Vercel"
                    className="mx-auto my-0 object-cover"
                  />
                </Column>
              </Row>
            </Section>
            <Section className="border border-solid border-[#eaeaea] p-[20px]">
              <Heading className="mx-0 my-[20px] p-0 text-center text-[24px] font-bold text-black">
                Hi, {name} 👋🏻
              </Heading>
              <Heading className="mx-0 my-[20px] p-0 text-center text-[24px] font-bold text-black">
                Thank you for reaching out to Clark Kent Travel and Tours.
                We&apos;re thrilled to receive your inquiry about our {title}.
              </Heading>
              <Row>
                <Column>
                  <Text className="text-base leading-[24px] tracking-wider text-black">
                    Details Below
                  </Text>
                </Column>
                <Column>
                  <Text className="text-end text-base leading-[24px] tracking-wider text-black">
                    {address}, PH
                  </Text>
                </Column>
              </Row>
              <Hr />
              <Text className="text-[14px] leading-4 tracking-widest text-black">
                <strong>Traveller Name:</strong> {name} - {nationality} |{" "}
                {gender} {age} years old
              </Text>
              <Text className="text-[14px]leading-4 tracking-widest text-black">
                <strong>Tour:</strong>
                {travellerType} | {title}
              </Text>
              <Text className="text-[14px]leading-4 tracking-widest text-black">
                <strong>Date:</strong>
                {format(new Date(date), "MMM dd EEEE")}
              </Text>
              <Text className="text-[14px] leading-4 tracking-widest text-black">
                <strong>Number of Participants:</strong> {count}
              </Text>
              <Text className="text-[14px] leading-4 tracking-widest text-black">
                <strong>Email:</strong> {email}
              </Text>
              <Text className="text-[14px] leading-4 tracking-widest text-black">
                <strong>Contact Number:</strong> {contact}
              </Text>
              <Text className="text-[14px] leading-4 tracking-widest text-black">
                <strong>Total Price:</strong> {total}
              </Text>
              <Text className="text-[14px] leading-4 tracking-widest text-black">
                <strong>Additional Message:</strong> {notes}
              </Text>
              <Hr />
              <Section className="text-slate-600">
                <Text className="leading-5">
                  We are excited to help you plan your travels and ensure you
                  have an unforgettable experience. One of our representatives
                  will review your Inquiry/Booking and get back to you within 24
                  hours with further details and next steps.
                </Text>
                <Text className="text-xs leading-5">
                  Should you have any immediate questions or require further
                  assistance, please feel free to contact us at{" "}
                  <Link href="mailto:support@icapturetravelservices.com">
                    sales@clarkkenttravelandtours.com
                  </Link>
                </Text>
                <Hr />
                <Text className="text-xs leading-5">
                  Thank you for choosing Clark Kent Travel and Tours. We look
                  forward to helping you create wonderful memories in {address}!
                </Text>
              </Section>
            </Section>
            <Text className="mt-5 text-center text-xs text-slate-500">
              &copy; 2024 | <strong>Clark Kent Travel and Tours</strong>, Lagan
              St., Puerto Princesa City Palawan 5300, PH |{" "}
              <Link href="icapturetravelservices.com">
                www.clarkkenttravelandtours.com
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Email;
