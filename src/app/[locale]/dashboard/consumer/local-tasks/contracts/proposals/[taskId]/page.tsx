import ProposalsList from "@/components/Dashboard/Consumer/LocalTasks/Contracts/AllTasksTab/PropusalList/PropusalList";
type PageProps = {
  params: Promise<{ taskId: string }>;
};
const ProposalsPage = async (props: PageProps) => {
  const { taskId } = await props.params;
  return (
    <div>
      <ProposalsList taskId={taskId} />
    </div>
  );
};

export default ProposalsPage;
