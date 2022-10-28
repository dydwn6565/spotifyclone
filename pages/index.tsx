import Image from "next/image";
import styles from "../styles/Home.module.css";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Login from "./login";
import Sidebar from "../components/Sidebar";
import Head from "../components/Head";
import Main from "../components/Main";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(useSession());
  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/login";
    }
  });

  return (
    <>
      {session && (
        <div>
          <>
            <div className="flex ">
              <div>
                <Sidebar />
              </div>

              <div>
                <Main />
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
}
