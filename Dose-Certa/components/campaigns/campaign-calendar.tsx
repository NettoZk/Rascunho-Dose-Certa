"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, AlertTriangle, Clock, Info } from "lucide-react"
import type { VaccinationRecord } from "@/components/vaccination/vaccination-card"
import type { VaccinationCampaign } from "./campaign-card"

interface OfficialVaccineSchedule {
  id: string
  vaccine: string
  ageGroup: string
  recommendedAge: string
  doses: number
  interval?: string
  notes: string
  userStatus: "completed" | "pending" | "overdue" | "not_applicable"
  userLastDose?: string
  userNextDue?: string
}

interface CampaignCalendarProps {
  userHistory: VaccinationRecord[]
  activeCampaigns: VaccinationCampaign[]
}

const officialSchedule: OfficialVaccineSchedule[] = [
  {
    id: "bcg",
    vaccine: "BCG",
    ageGroup: "Recém-nascidos",
    recommendedAge: "Ao nascer",
    doses: 1,
    notes: "Proteção contra tuberculose",
    userStatus: "completed",
    userLastDose: "1990-03-15",
  },
  {
    id: "hepatite-b",
    vaccine: "Hepatite B",
    ageGroup: "Todas as idades",
    recommendedAge: "Ao nascer, 2 e 6 meses",
    doses: 3,
    interval: "0, 1-2, 6 meses",
    notes: "Proteção contra hepatite B",
    userStatus: "pending",
    userLastDose: "2024-04-20",
    userNextDue: "2024-10-20",
  },
  {
    id: "covid-19",
    vaccine: "COVID-19",
    ageGroup: "6 meses+",
    recommendedAge: "Conforme disponibilidade",
    doses: 3,
    interval: "Conforme orientação",
    notes: "Proteção contra COVID-19",
    userStatus: "completed",
    userLastDose: "2024-03-15",
  },
  {
    id: "influenza",
    vaccine: "Influenza (Gripe)",
    ageGroup: "6 meses+",
    recommendedAge: "Anual",
    doses: 1,
    interval: "Anual",
    notes: "Proteção sazonal contra gripe",
    userStatus: "completed",
    userLastDose: "2024-02-10",
    userNextDue: "2025-02-10",
  },
  {
    id: "tetano-difteria",
    vaccine: "Tétano e Difteria (dT)",
    ageGroup: "Adolescentes e adultos",
    recommendedAge: "A cada 10 anos",
    doses: 1,
    interval: "10 anos",
    notes: "Reforço decenal",
    userStatus: "completed",
    userLastDose: "2023-05-15",
    userNextDue: "2033-05-15",
  },
  {
    id: "febre-amarela",
    vaccine: "Febre Amarela",
    ageGroup: "9 meses+",
    recommendedAge: "Dose única",
    doses: 1,
    notes: "Proteção permanente",
    userStatus: "completed",
    userLastDose: "2023-01-10",
  },
  {
    id: "hpv",
    vaccine: "HPV",
    ageGroup: "9-14 anos",
    recommendedAge: "9-14 anos (2 doses)",
    doses: 2,
    interval: "6 meses",
    notes: "Proteção contra HPV",
    userStatus: "not_applicable",
  },
  {
    id: "pneumococica",
    vaccine: "Pneumocócica 23-valente",
    ageGroup: "60+ anos",
    recommendedAge: "Dose única aos 60 anos",
    doses: 1,
    notes: "Proteção contra pneumonia",
    userStatus: "pending",
    userNextDue: "2030-03-15",
  },
]

export function CampaignCalendar({ userHistory, activeCampaigns }: CampaignCalendarProps) {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "pending" | "completed" | "overdue">("all")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Info className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "not_applicable":
        return "bg-gray-100 text-gray-600 border-gray-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completa"
      case "overdue":
        return "Em atraso"
      case "pending":
        return "Pendente"
      case "not_applicable":
        return "Não se aplica"
      default:
        return "Desconhecido"
    }
  }

  const filteredSchedule = officialSchedule.filter((item) => {
    if (selectedFilter === "all") return true
    return item.userStatus === selectedFilter
  })

  const relatedCampaigns = activeCampaigns.filter((campaign) =>
    officialSchedule.some(
      (schedule) =>
        campaign.vaccine.toLowerCase().includes(schedule.vaccine.toLowerCase()) ||
        schedule.vaccine.toLowerCase().includes(campaign.vaccine.toLowerCase()),
    ),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendário Oficial de Vacinação
          </CardTitle>
          <CardDescription>Compare seu histórico com o calendário nacional de imunizações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6 flex-wrap">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("all")}
            >
              Todas
            </Button>
            <Button
              variant={selectedFilter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("pending")}
            >
              Pendentes
            </Button>
            <Button
              variant={selectedFilter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("completed")}
            >
              Completas
            </Button>
            <Button
              variant={selectedFilter === "overdue" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("overdue")}
            >
              Em Atraso
            </Button>
          </div>

          <div className="space-y-4">
            {filteredSchedule.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold flex items-center gap-2">
                      {getStatusIcon(item.userStatus)}
                      {item.vaccine}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.notes}</p>
                  </div>
                  <Badge className={getStatusColor(item.userStatus)}>{getStatusText(item.userStatus)}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Faixa etária:</span>
                    <p className="text-muted-foreground">{item.ageGroup}</p>
                  </div>
                  <div>
                    <span className="font-medium">Idade recomendada:</span>
                    <p className="text-muted-foreground">{item.recommendedAge}</p>
                  </div>
                  <div>
                    <span className="font-medium">Doses:</span>
                    <p className="text-muted-foreground">
                      {item.doses} {item.interval && `(${item.interval})`}
                    </p>
                  </div>
                </div>

                {(item.userLastDose || item.userNextDue) && (
                  <div className="bg-muted/50 rounded p-3 space-y-2">
                    {item.userLastDose && (
                      <div className="text-sm">
                        <span className="font-medium">Última dose:</span>
                        <span className="ml-2">{new Date(item.userLastDose).toLocaleDateString("pt-BR")}</span>
                      </div>
                    )}
                    {item.userNextDue && (
                      <div className="text-sm">
                        <span className="font-medium">Próxima dose:</span>
                        <span className="ml-2">{new Date(item.userNextDue).toLocaleDateString("pt-BR")}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {relatedCampaigns.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Campanhas Relacionadas</CardTitle>
            <CardDescription>Campanhas ativas que podem ser relevantes para seu perfil</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {relatedCampaigns.map((campaign) => (
                <div key={campaign.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{campaign.title}</h3>
                    <Badge
                      className={campaign.userEligible ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-600"}
                    >
                      {campaign.userEligible ? "Elegível" : "Não elegível"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{campaign.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Ver Detalhes
                    </Button>
                    {campaign.userEligible && <Button size="sm">Agendar</Button>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
