import AnalyticsSection from "./AnalyticsSection";
import Options from "./Options";
import RecentTasks from "./RecentTasks";

const GeneralProviderDashboard = () => {
  return (
    <div>
      <Options />
      <RecentTasks />
      <AnalyticsSection />
    </div>
  );
};

export default GeneralProviderDashboard;
