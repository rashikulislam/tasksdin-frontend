import AgentLayout from "@/components/Pages/YouthAmbassador/Dashboard/AgentLayout";

function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AgentLayout>{children}</AgentLayout>
    </div>
  );
}

export default Dashboard;
