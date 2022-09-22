import React, { useEffect, useState } from 'react'
import useAuth from './useAuth';
import { useRouter } from "next/router";

export default function Dashboard() {
   const router = useRouter();
    const { code } = router.query;
  
    const accessToken = useAuth(code)
    
    
  return (
    <div>
      <button>
        code
      </button>
    </div>
  );
}

 

