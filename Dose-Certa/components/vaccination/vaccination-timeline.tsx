"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertTriangle, Calendar } from "lucide-react"
import type { VaccinationRecord } from "./vaccination-card"

interface VaccinationTimelineProps {
  records: VaccinationRecord[]
  showUpcoming?: boolean
}

export function VaccinationTimeline({ records, showUpcoming = false }: VaccinationTimelineProps) {
  const sortedRecords = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "overdue":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-white" />
      case "pending":
        return <Clock className="h-4 w-4 text-white" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-white" />
      default:
        return <Clock className="h-4 w-4 text-white" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Timeline de Vacinação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

          <div className="space-y-6">
            {sortedRecords.map((record, index) => (
              <div key={record.id} className="relative flex items-start gap-4">
                <div
                  className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${getStatusColor(record.status)}`}
                >
                  {getStatusIcon(record.status)}
                </div>

                <div className="flex-1 min-w-0 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{record.vaccine}</h3>
                      {record.doseNumber && record.totalDoses && (
                        <p className="text-sm text-muted-foreground">
                          Dose {record.doseNumber} de {record.totalDoses}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant={
                        record.status === "completed"
                          ? "outline"
                          : record.status === "overdue"
                            ? "destructive"
                            : "secondary"
                      }
                      className={
                        record.status === "completed"
                          ? "text-green-600 border-green-600"
                          : record.status === "pending"
                            ? "text-yellow-600 border-yellow-600"
                            : ""
                      }
                    >
                      {record.status === "completed"
                        ? "Completa"
                        : record.status === "pending"
                          ? "Pendente"
                          : "Atrasada"}
                    </Badge>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Data:</span>
                        <span className="ml-2 font-medium">{record.date}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Local:</span>
                        <span className="ml-2">{record.location}</span>
                      </div>
                      {record.manufacturer && (
                        <div>
                          <span className="text-muted-foreground">Fabricante:</span>
                          <span className="ml-2">{record.manufacturer}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-muted-foreground">Lote:</span>
                        <span className="ml-2 font-mono text-xs bg-background px-2 py-1 rounded">{record.batch}</span>
                      </div>
                    </div>

                    {record.healthProfessional && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Profissional:</span>
                        <span className="ml-2">{record.healthProfessional}</span>
                      </div>
                    )}

                    {record.nextDose && (
                      <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          Próxima dose: {record.nextDose}
                        </p>
                      </div>
                    )}

                    {record.notes && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <strong>Observações:</strong> {record.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
