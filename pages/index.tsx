import Image from "next/image";
import styles from "../styles/Home.module.css";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Login from "./login";
import Sidebar from "../components/Sidebar";
import Head from "../components/Head";
import Main from "../components/Main";

export default function Home() {
  return (
    <>
      <div>
        <>
          <div className="flex ">

            <div >
              <Sidebar />
            </div>
            

            <div >
              <Main />
            </div>

          </div>
          
        </>
      </div>
    </>
  );
}
