"use client";
import { useState } from "react";
import GeneralProviderRegForm from "./GeneralProviderRegForm";
import EmailVerification from "./EmailVerification";
import AddressForm from "../../Common/AddressForm";

const GeneralProviderRegistrationPage = () => {
  const [pages, setPages] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const steps = 3;

  let content;
  switch (pages) {
    case 1:
      content = (
        <GeneralProviderRegForm
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
          dashboardPath="/dashboard/general-provider"
        />
      );
      break;
    default:
      break;
  }

  return <div>{content}</div>;
};

export default GeneralProviderRegistrationPage;
