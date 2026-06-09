import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./notfound.css";

const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <Image
          src="/funny-404.png"
          alt="Not Found"
          width={350}
          height={350}
          className="notfound-image"
        />
        <h1 className="notfound-title">Oops! Page Not Found 😅</h1>
        <p className="notfound-text">
          Looks like this page took a break! Let’s get you back home.
        </p>

        <Link href="/" passHref>
          <Button className="notfound-button">🏠 Go Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
