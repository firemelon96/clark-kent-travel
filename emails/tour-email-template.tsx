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
import { TourFormSchema } from "@/types/tour";
import { formatPeso } from "@/app/lib/helpers";

type Props = z.input<typeof TourFormSchema>;

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "http://localhost:3001";

export const TourEmailTemplate = ({
  count,
  date,
  notes,
  travellerType,
  age,
  gender,
  name,
  nationality,
  email,
  contact,
  total,
  title,
}: Props) => {
  const previewText = `Your Booking for ${title} Awaits`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-2 max-w-[500px]">
            <Section className="min-w-full">
              <Row className="mt-5">
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
              <Heading className="mx-0 my-[10px] p-0 text-center text-[24px] font-bold text-black">
                Thank you for reaching out to Clark Kent Travel and Tours.
                We&apos;re thrilled to receive your inquiry about our {title}.
              </Heading>
              <Row>
                <Column>
                  <Text className="text-base leading-[24px] tracking-wider text-black">
                    Details Below
                  </Text>
                </Column>
              </Row>
              <Hr />
              <Text className="text-[14px]leading-4 tracking-widest text-black">
                <strong>Travel Date:</strong>
                {format(new Date(date), "MMM dd EEEE")}
              </Text>
              <Text className="text-[14px] leading-4 tracking-widest text-black">
                <strong>Traveller Name:</strong> {name}
              </Text>
              <Text className="text-[14px] leading-4 tracking-widest text-black">
                <strong>Nationality:</strong> {nationality}
              </Text>
              <Text className="text-[14px] leading-4 tracking-widest text-black">
                <strong>Age & Gender: </strong> {age} years old, {gender}
              </Text>
              <Text className="text-[14px]leading-4 tracking-widest text-black">
                <strong>Tour:</strong>
                {travellerType} | {title}
              </Text>
              <Text className="text-[14px] leading-4 tracking-widest text-black">
                <strong>Number of Participants:</strong> {count} pax
              </Text>
              <Text className="text-[14px] leading-4 tracking-widest text-black">
                <strong>Email:</strong> {email}
              </Text>
              <Text className="text-[14px] leading-4 tracking-widest text-black">
                <strong>Contact Number:</strong> {contact}
              </Text>
              <Text className="text-[14px] leading-4 tracking-widest text-black">
                <strong>Total Price:</strong> {formatPeso(total || 0)}
              </Text>
              <Text className="text-[14px] leading-4 tracking-widest text-black">
                <strong>Additional Message:</strong> {notes}
              </Text>
              <Hr />
              <Section className="text-slate-600">
                <Text className="text-xs leading-5">
                  We are excited to help you plan your travels and ensure you
                  have an unforgettable experience. One of our representatives
                  will review your Inquiry/Booking and get back to you within 24
                  hours with further details and next steps.
                </Text>
                <Text className="text-xs leading-5">
                  Should you have any immediate questions or require further
                  assistance, please feel free to contact us at Whatsapp{" "}
                  <Link href="wa.me/639552946691">+639173028053</Link>
                </Text>
                <Hr />
                <Text className="text-xs leading-5">
                  Thank you for choosing Clark Kent Travel and Tours. We look
                  forward to helping you create wonderful memories !
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

export default TourEmailTemplate;
