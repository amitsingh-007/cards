"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "./contexts/user-context";
import DashboardHistory from "./dashboard-history";
import DahsboardTable from "./dashboard-table";
import { trpc } from "@/trpc-client/api";

export default function Home() {
  const { user } = useUser();

  const { data: hello } = trpc.extension.hello.useQuery();

  if (!user) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Dashboard
      </h2>
      <Tabs
        defaultValue="dashboard-table"
        className="flex flex-col items-center mt-4 mx-auto"
      >
        <TabsList className="mx-auto">
          <TabsTrigger value="dashboard-table">Dashboard</TabsTrigger>
          <TabsTrigger value="dashboard-history">Historical View</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard-table" className="w-full">
          <DahsboardTable />
        </TabsContent>
        <TabsContent value="dashboard-history" className="w-full">
          <DashboardHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
