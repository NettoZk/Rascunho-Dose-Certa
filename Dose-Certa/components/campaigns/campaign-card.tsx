"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, CheckCircle } from "lucide-react"

export interface VaccinationCampaign {
  id: string
  title: string
  description: string
  vaccine: string
  startDate: string
  endDate: string
  targetAudience: string[]
  ageRange: string
  priority: "high" | "medium" | "low"
  status: "active" | "upcoming" | "ended"
  locations: string[]
  eligibilityCheck: boolean
  userEligible?: boolean
  completedByUser?: boolean
  estimatedCoverage: number
  currentCoverage: number
}

interface CampaignCardProps {
  campaign: VaccinationCampaign
  onViewDetails?: (campaign: VaccinationCampaign) => void
  compact?: boolean
}

export function CampaignCard({ campaign, onViewDetails, compact = false }: CampaignCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "ended":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const progressPercentage = Math.round((campaign.currentCoverage / campaign.estimatedCoverage) * 100)

  return (
    <Card className={`${compact ? "p-4" : ""} ${campaign.userEligible ? "ring-2 ring-primary/20" : ""}`}>
      <CardHeader className={compact ? "pb-2" : ""}>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className={`${compact ? "text-lg" : "text-xl"} flex items-center gap-2`}>
              {campaign.title}
              {campaign.completedByUser && <CheckCircle className="h-5 w-5 text-green-600" />}
            </CardTitle>
            <div className="flex gap-2 flex-wrap">
              <Badge className={getStatusColor(campaign.status)}>
                {campaign.status === "active" ? "Ativa" : campaign.status === "upcoming" ? "Em breve" : "Encerrada"}
              </Badge>
              <Badge className={getPriorityColor(campaign.priority)}>
                {campaign.priority === "high"
                  ? "Alta prioridade"
                  : campaign.priority === "medium"
                    ? "Média prioridade"
                    : "Baixa prioridade"}
              </Badge>
              {campaign.userEligible && (
                <Badge className="bg-primary/10 text-primary border-primary/20">Você é elegível</Badge>
              )}
            </div>
          </div>
        </div>
        {!compact && <CardDescription className="text-base">{campaign.description}</CardDescription>}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{campaign.ageRange}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{campaign.locations.length} locais disponíveis</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{campaign.vaccine}</span>
          </div>
        </div>

        {!compact && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Cobertura da campanha:</span>
                <span className="font-medium">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                {campaign.currentCoverage.toLocaleString()} de {campaign.estimatedCoverage.toLocaleString()} pessoas
                vacinadas
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Público-alvo:</h4>
              <div className="flex flex-wrap gap-1">
                {campaign.targetAudience.map((audience, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {audience}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => onViewDetails?.(campaign)}
            className="flex-1"
            variant={campaign.userEligible ? "default" : "outline"}
          >
            Ver Detalhes
          </Button>
          {campaign.userEligible && campaign.status === "active" && !campaign.completedByUser && (
            <Button className="flex-1">Agendar Vacinação</Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
