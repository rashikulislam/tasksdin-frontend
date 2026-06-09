import DashboardMessagePage from "@/components/Pages/DashboardPages/Message/DashboardMessagePage";

export default function ConversationPage({
  params,
}: {
  params: { conversationId: string };
}) {
  return (
    <div className="pb-[65px]">
      <DashboardMessagePage conversationId={params.conversationId} />
    </div>
  );
}
