import { GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

// const AUTH_URL =
//   "https://accounts.spotify.com/authorize?client_id=481fa5ea109645d9b9e6dc0e596d50d6&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

interface Provider {
  name: string;

  id: string;
}

export default function Login({ providers }) {
  return (
    <div>
      {/* <button> */}
      <Image
        src="data:image/png;base64,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"
        alt="spotify"
        width={100}
        height={100}
      />
      <div>
        <>
          {Object.values(providers).map((provider: Provider) => (
            <>
              <div>{provider.id}</div>
              <div key={provider.name}>
                <button
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  Login with {provider.name}
                </button>
              </div>
            </>
          ))}
        </>
      </div>
      {/* <a href={AUTH_URL}>login</a> */}
      {/* </button> */}
    </div>
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
