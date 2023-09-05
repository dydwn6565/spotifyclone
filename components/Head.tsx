import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { BsArrowLeftCircleFill } from "react-icons/bs";

import VerifiedLogin from "./VerifiedLogin";

type Props = {
  color: string;
};

function Head({ color }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div>
      <div className={`flex justify-between bg-${color}`}>
        <div className="flex flex-row p-5 space-x-5 ml-5 justfiy-center items-center">
          {router.asPath != "/" && (
            <BsArrowLeftCircleFill
              className="fill-white ml-5 scale-225 mdl:scale-195 sms:scale-155 cursor-pointer"
              onClick={() => router.back()}
            />
          )}
          <></>
        </div>

        <div className="flex flex-row p-5 space-x-10 text-lg ">
          {session ? (
            <div className="mr-5 mdl:mr-2">
              <VerifiedLogin />
            </div>
          ) : (
            <>
              <div className="text-white mt-1">Sign up</div>
              <div className="w-36 h-10 bg-white rounded-full">
                <div className="text-black flex justify-center items-center mt-1">
                  <Link href="/login">
                    <a>Log in</a>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Head;
