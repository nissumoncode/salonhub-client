import OverviewStats from "../components/OverviewStats";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen space-y-8 bg-[#F8F1E8] p-8">
      <div>
        <h1 className="text-3xl font-bold text-[#4A382E]">Overview</h1>

        <p className="mt-2 text-[#6B5B50]">Welcome to SalonHub Admin Panel.</p>
      </div>

      <OverviewStats />
    </div>
  );
}
