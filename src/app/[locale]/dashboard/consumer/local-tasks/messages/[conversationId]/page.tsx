import DashboardMessagePage from "@/components/Pages/DashboardPages/Message/DashboardMessagePage";

export default function ConversationPage({ params }: { params: { conversationId: string } }) {
  return (
    <div className="">
      <DashboardMessagePage conversationId={params.conversationId} />
    </div>
  );
}
