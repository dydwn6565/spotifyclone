import { GetServerSideProps } from "next";
import { getProviders, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";

interface Provider {
  name: string;

  id: string;
}

export default function Login({ providers }) {
  const { data: session, status } = useSession();
  useEffect(() => {
    
    if (session) {
      window.location.href = "/";
    }
  }, [session]);
  return (
    <>
      <div className="flex justify-center items-center mt-72">
        
        <div>
          <Image
            src= "/logo512.png"
            alt="logo"
            width={200}
            height={200}
          />
          <div className="flex flex-col justify-center items-center my-10">
            <>
              {Object.values(providers).map((provider: Provider) => (
                <>
                  <div className="text-4xl mb-10 ">Music Land</div>
                  <div key={provider.name}>
                    <button className="ml-10 mb-5"
                      onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                    >
                      Login with {provider.name}
                    </button>
                    
                    <h5>Id : dydwn6565@naver.com</h5>
                    <h5>password: guest123</h5>
                  </div>
                </>
              ))}
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
