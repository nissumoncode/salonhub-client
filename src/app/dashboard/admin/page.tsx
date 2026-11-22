import OverviewStats from "./components/OverviewStats";
import BackToHome from "@/components/BackToHome";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen min-w-0 space-y-6 bg-background p-3 sm:space-y-8 sm:p-5 md:p-8">
      <BackToHome />

      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Overview</h1>

        <p className="mt-2 text-muted-foreground">Welcome to SalonHub Admin Panel.</p>
      </div>

      <OverviewStats />
    </div>
  );
}

