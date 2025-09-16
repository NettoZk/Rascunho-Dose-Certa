"use client"

import { useAuth } from "@/lib/auth-context"
import { CitizenDashboard } from "./citizen-dashboard"
import { ProfessionalDashboard } from "./professional-dashboard"

export function DashboardContent() {
  const { user } = useAuth()

  if (!user) return null

  if (user.type === "citizen") {
    return <CitizenDashboard />
  }

  if (user.type === "professional") {
    return <ProfessionalDashboard />
  }

  return null
}
