"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/chat");
  }, [router]);

  return (
    <div className="app-container" style={{ height: "100vh" }}>
      <div className="content-container" style={{ marginTop: "60px" }}>
        {/* Redirecting to /chat... */}
      </div>
    </div>
  );
}
