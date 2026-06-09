import UnskilledLeaderboard from "@/components/Dashboard/UnskilledProvider/DashboardContent/Leaderboard";
import { mockStats } from "@/components/Dashboard/UnskilledProvider/Data/mockData";

const LeaderBoard = () => {
  return (
    <div className="pb-[65px]">
      <UnskilledLeaderboard stats={mockStats} />
    </div>
  );
};

export default LeaderBoard;
