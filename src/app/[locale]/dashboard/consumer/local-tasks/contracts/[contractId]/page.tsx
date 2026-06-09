import ContractDetailsPage from "@/components/Dashboard/Consumer/LocalTasks/Contracts/ContractDetails/ContractDetailsPage";

type PageProps = {
  params: Promise<{ contractId: string }>;
};
const SingleContract = async (props: PageProps) => {
  const { contractId } = await props.params;

  return (
    <div>
      <ContractDetailsPage id={contractId} />
    </div>
  );
};

export default SingleContract;
