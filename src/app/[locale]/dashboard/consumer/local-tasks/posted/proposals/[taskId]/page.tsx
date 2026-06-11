import ProposalsList from "@/components/Dashboard/Consumer/LocalTasks/Contracts/AllTasksTab/PropusalList/PropusalList";

type PageProps = {
  params: Promise<{ taskId: string }>;
};

const PostedProposalsPage = async (props: PageProps) => {
  const { taskId } = await props.params;
  return (
    <div className="pt-5 pb-10">
      <ProposalsList taskId={taskId} />
    </div>
  );
};

export default PostedProposalsPage;
