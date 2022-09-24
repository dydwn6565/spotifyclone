import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Login from "./login";
import Sidebar from "../components/Sidebar";

export default function Home() {
  // const [code, setCode] = useState("");

  // const clickDashboard = useRef<HTMLAnchorElement>(null);
  // const clickLogin = useRef<HTMLAnchorElement>(null);
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const codeFromURL = new URLSearchParams(window.location.search).get(
  //       "code"
  //     );
  //     setCode(codeFromURL);

  //   }
  //   console.log("hit")
  //     if (code) {

  //       console.log("dashboard");
  //       if (clickDashboard.current) {
  //         clickDashboard.current.click();
  //       }
  //     } else {
  //       if (clickLogin) {

  //         clickLogin.current.click();
  //       }
  //     }
  // }, [code]);

  return (
    <>
      {/* <div>
        {code !== null && (
          <Link href={{ pathname: "/dashboard", query: { code } }} hidden>
            <a ref={clickDashboard}>dashboard</a>
          </Link>
        )} */}
      <div>
        <>
          <Sidebar />
          
          {/* {console.log("his")} */}
        </>
        {/* <Login /> */}
      </div>
      {/* <Link href={{ pathname: "/login" }} hidden>
          <a ref={clickLogin}>login</a>
        </Link>
      </div> */}
    </>
  );
}
