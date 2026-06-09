import UnskilledTaskDetails from "@/components/Dashboard/UnskilledProvider/DashboardContent/TaskDetails";

type PageProps = {
  params: Promise<{ taskId: string }>;
};

const TaskDetails = async (props: PageProps) => {
  const { taskId } = await props.params;
  return (
    <div>
      <UnskilledTaskDetails taskId={taskId} />
    </div>
  );
};

export default TaskDetails;
