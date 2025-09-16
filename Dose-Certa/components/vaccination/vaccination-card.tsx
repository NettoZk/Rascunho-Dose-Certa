"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Calendar, MapPin, AlertTriangle, CheckCircle, Clock, Download, Share } from "lucide-react"

export interface VaccinationRecord {
  id: string
  vaccine: string
  date: string
  location: string
  batch: string
  status: "completed" | "pending" | "overdue"
  nextDose?: string
  doseNumber?: number
  totalDoses?: number
  manufacturer?: string
  healthProfessional?: string
  notes?: string
}

interface VaccinationCardProps {
  record: VaccinationRecord
  showActions?: boolean
  compact?: boolean
}

export function VaccinationCard({ record, showActions = true, compact = false }: VaccinationCardProps) {
  const getStatusIcon = () => {
    switch (record.status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = () => {
    switch (record.status) {
      case "completed":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completa
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        )
      case "overdue":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Atrasada
          </Badge>
        )
      default:
        return null
    }
  }

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <p className="font-medium text-sm">{record.vaccine}</p>
            <p className="text-xs text-muted-foreground">{record.date}</p>
          </div>
        </div>
        {getStatusBadge()}
      </div>
    )
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <CardTitle className="text-lg">{record.vaccine}</CardTitle>
          </div>
          {getStatusBadge()}
        </div>
        {record.doseNumber && record.totalDoses && (
          <p className="text-sm text-muted-foreground">
            Dose {record.doseNumber} de {record.totalDoses}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Data: {record.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{record.location}</span>
          </div>
          {record.manufacturer && (
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span>Fabricante: {record.manufacturer}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Lote:</span>
            <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{record.batch}</span>
          </div>
        </div>

        {record.healthProfessional && (
          <div className="text-sm">
            <span className="text-muted-foreground">Profissional: </span>
            <span>{record.healthProfessional}</span>
          </div>
        )}

        {record.nextDose && (
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <Calendar className="h-4 w-4 inline mr-1" />
              Próxima dose recomendada: {record.nextDose}
            </p>
          </div>
        )}

        {record.notes && (
          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <strong>Observações:</strong> {record.notes}
          </div>
        )}

        {showActions && (
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Certificado
            </Button>
            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
              <Share className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
