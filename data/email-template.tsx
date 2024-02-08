import * as React from "react";

interface EmailTemplateProps {
  name: string | undefined;
  email: string;
  description: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  description
}) => (
  <div>
    <h1>Username : {name}</h1>
    <p>Email : {email}</p>
    <p>{description}</p>
  </div>
);
