"use client";
import { useState } from "react";
import EmailVerification from "../../GeneralProvider/GeneralProviderReg/EmailVerification";
import AddressForm from "../../Common/AddressForm";
import AgentPartnerRegForm from "./AgentPartnerRegForm";

const AgentPartnerRegistrationPage = () => {
  const [pages, setPages] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const steps = 3;

  let content;
  switch (pages) {
    case 1:
      content = (
        <AgentPartnerRegForm
          setPages={setPages}
          pages={pages}
          steps={steps}
          setEmail={setEmail}
        />
      );
      break;
    case 2:
      content = (
        <EmailVerification
          setPages={setPages}
          pages={pages}
          steps={steps}
          email={email}
        />
      );
      break;
    case 3:
      content = (
        <AddressForm
          setPages={setPages}
          pages={pages}
          steps={steps}
          dashboardPath="/dashboard/agent"
        />
      );
      break;
    default:
      break;
  }

  return <div>{content}</div>;
};

export default AgentPartnerRegistrationPage;
