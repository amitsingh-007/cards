"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <>
      <div>DASHBOARD</div>
      <Button onClick={() => router.push("/add-card")}>Add new card</Button>
    </>
  );
}
