import OverviewStats from "./components/OverviewStats";
import BackToHome from "@/components/BackToHome";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen space-y-8 bg-background p-8">
      <BackToHome />

      <div>
        <h1 className="text-3xl font-bold text-foreground">Overview</h1>

        <p className="mt-2 text-[#6B5B50]">Welcome to SalonHub Admin Panel.</p>
      </div>

      <OverviewStats />
    </div>
  );
}
