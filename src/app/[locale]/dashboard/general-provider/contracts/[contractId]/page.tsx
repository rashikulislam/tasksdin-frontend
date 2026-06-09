import SingleContractDetails from "@/components/Dashboard/UnskilledProvider/DashboardContent/SingleContractDetails";

type PageProps = {
  params: Promise<{ contractId: string }>;
};
const SingleContract = async (props: PageProps) => {
  const { contractId } = await props.params;

  return (
    <div>
      <SingleContractDetails id={contractId} />
    </div>
  );
};

export default SingleContract;
