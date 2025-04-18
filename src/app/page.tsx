'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 루트 페이지에서 /FAQ로 리다이렉션
    router.push("/FAQ");
  }, [router]);

  // 리다이렉션 중에 잠깐 레이아웃
  return (
    <div className="container">
      <section className="visual" style={{ height: '100vh' }} />
    </div>
  );
}
