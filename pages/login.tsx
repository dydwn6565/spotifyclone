import React from 'react'

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=481fa5ea109645d9b9e6dc0e596d50d6&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  return (
    <div>
        <button>

        <a href={AUTH_URL}>login</a>
        </button>
    </div>
  )
}

