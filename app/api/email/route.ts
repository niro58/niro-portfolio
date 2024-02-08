import { contactFormSchema } from "@/components/contact-form";
import { EmailTemplate } from "@/data/email-template";
import { NextRequest } from "next/server";
import { ReactElement } from "react";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, description } = await request.json();
  console.log(name, email, description);

  const { data, error } = await resend.emails.send({
    from: "Form <onboarding@resend.dev>",
    to: ["niro.dev.01@gmail.com"],
    subject: "Form submission",
    react: EmailTemplate({
      name: name,
      email: email,
      description: description
    }) as ReactElement
  });

  if (error) {
    return Response.json({ message: "error" });
  }
  return Response.json(data);
}
