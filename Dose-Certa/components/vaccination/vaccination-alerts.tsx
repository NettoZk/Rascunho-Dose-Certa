"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Calendar, Bell, X } from "lucide-react"
import type { VaccinationRecord } from "./vaccination-card"

interface VaccinationAlert {
  id: string
  type: "overdue" | "upcoming" | "reminder" | "campaign"
  title: string
  message: string
  vaccine?: string
  dueDate?: string
  priority: "high" | "medium" | "low"
  actionLabel?: string
  dismissible?: boolean
}

interface VaccinationAlertsProps {
  records: VaccinationRecord[]
  customAlerts?: VaccinationAlert[]
}

export function VaccinationAlerts({ records, customAlerts = [] }: VaccinationAlertsProps) {
  const generateAlertsFromRecords = (): VaccinationAlert[] => {
    const alerts: VaccinationAlert[] = []

    // Check for overdue vaccines
    const overdueRecords = records.filter((record) => record.status === "overdue")
    overdueRecords.forEach((record) => {
      alerts.push({
        id: `overdue-${record.id}`,
        type: "overdue",
        title: "Vacina Atrasada",
        message: `Sua dose de ${record.vaccine} está atrasada desde ${record.nextDose || record.date}`,
        vaccine: record.vaccine,
        dueDate: record.nextDose,
        priority: "high",
        actionLabel: "Agendar Agora",
        dismissible: false,
      })
    })

    // Check for upcoming vaccines (next 30 days)
    const upcomingRecords = records.filter((record) => {
      if (!record.nextDose) return false
      const nextDoseDate = new Date(record.nextDose)
      const today = new Date()
      const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
      return nextDoseDate >= today && nextDoseDate <= thirtyDaysFromNow
    })

    upcomingRecords.forEach((record) => {
      alerts.push({
        id: `upcoming-${record.id}`,
        type: "upcoming",
        title: "Vacina Próxima",
        message: `Sua próxima dose de ${record.vaccine} está agendada para ${record.nextDose}`,
        vaccine: record.vaccine,
        dueDate: record.nextDose,
        priority: "medium",
        actionLabel: "Ver Detalhes",
        dismissible: true,
      })
    })

    return alerts
  }

  const allAlerts = [...generateAlertsFromRecords(), ...customAlerts]

  const sortedAlerts = allAlerts.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "overdue":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "upcoming":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "reminder":
        return <Bell className="h-5 w-5 text-blue-600" />
      case "campaign":
        return <Calendar className="h-5 w-5 text-green-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getAlertVariant = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  if (sortedAlerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Alertas de Vacinação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum alerta no momento</p>
            <p className="text-sm text-muted-foreground">Suas vacinas estão em dia!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Alertas de Vacinação
          <Badge variant="secondary" className="ml-2">
            {sortedAlerts.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border ${
              alert.priority === "high"
                ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"
                : alert.priority === "medium"
                  ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20"
                  : "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{alert.title}</h3>
                    <Badge variant={getAlertVariant(alert.priority)} className="text-xs">
                      {alert.priority === "high" ? "Urgente" : alert.priority === "medium" ? "Importante" : "Info"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                  {alert.dueDate && (
                    <p className="text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      Data: {alert.dueDate}
                    </p>
                  )}
                  <div className="flex gap-2">
                    {alert.actionLabel && (
                      <Button size="sm" variant={alert.priority === "high" ? "default" : "outline"}>
                        {alert.actionLabel}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              {alert.dismissible && (
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
