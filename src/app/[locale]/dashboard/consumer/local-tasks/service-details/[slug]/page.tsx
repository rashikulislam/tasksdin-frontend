import ServiceDetailsNonSkill from "@/components/Dashboard/Consumer/LocalTasks/LocalTaskContent/ServiceDetailsNonSkill";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const ServiceDetails = async (props: PageProps) => {
  const { slug } = await props.params;
  return (
    <div className="pt-5">
      <ServiceDetailsNonSkill slug={slug} />
    </div>
  );
};

export default ServiceDetails;
