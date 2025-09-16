import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <DashboardContent />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
