"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, Users, Clock, AlertCircle, CheckCircle, Phone, FileText } from "lucide-react"
import type { VaccinationCampaign } from "./campaign-card"

interface CampaignDetailsProps {
  campaign: VaccinationCampaign
  onClose?: () => void
}

export function CampaignDetails({ campaign, onClose }: CampaignDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const progressPercentage = Math.round((campaign.currentCoverage / campaign.estimatedCoverage) * 100)

  // Mock data for detailed locations
  const detailedLocations = [
    {
      id: "1",
      name: "UBS Vila Madalena",
      address: "Rua Harmonia, 123 - Vila Madalena, São Paulo - SP",
      phone: "(11) 3123-4567",
      hours: "Segunda a Sexta: 7h às 17h",
      availability: "Alta",
      waitTime: "15 min",
    },
    {
      id: "2",
      name: "UBS Pinheiros",
      address: "Av. Brigadeiro Faria Lima, 456 - Pinheiros, São Paulo - SP",
      phone: "(11) 3234-5678",
      hours: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 12h",
      availability: "Média",
      waitTime: "30 min",
    },
    {
      id: "3",
      name: "Centro de Imunização Central",
      address: "Rua da Consolação, 789 - Centro, São Paulo - SP",
      phone: "(11) 3345-6789",
      hours: "Segunda a Sexta: 7h às 19h | Sábado: 8h às 14h",
      availability: "Baixa",
      waitTime: "45 min",
    },
  ]

  const getAvailabilityColor = (availability: string) => {
    switch (availability.toLowerCase()) {
      case "alta":
        return "bg-green-100 text-green-800 border-green-200"
      case "média":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "baixa":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl flex items-center gap-2">
                {campaign.title}
                {campaign.completedByUser && <CheckCircle className="h-6 w-6 text-green-600" />}
              </CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Badge
                  className={campaign.status === "active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                >
                  {campaign.status === "active" ? "Campanha Ativa" : "Em Breve"}
                </Badge>
                <Badge
                  className={
                    campaign.priority === "high"
                      ? "bg-red-100 text-red-800"
                      : campaign.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                  }
                >
                  {campaign.priority === "high"
                    ? "Alta Prioridade"
                    : campaign.priority === "medium"
                      ? "Média Prioridade"
                      : "Baixa Prioridade"}
                </Badge>
                {campaign.userEligible && (
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    Você é elegível para esta campanha
                  </Badge>
                )}
              </div>
            </div>
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Fechar
              </Button>
            )}
          </div>
          <CardDescription className="text-base mt-4">{campaign.description}</CardDescription>
        </CardHeader>
      </Card>

      {/* Campaign Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Informações da Campanha
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Data de Início</span>
                <p className="font-medium">{formatDate(campaign.startDate)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Data de Término</span>
                <p className="font-medium">{formatDate(campaign.endDate)}</p>
              </div>
            </div>

            <Separator />

            <div>
              <span className="text-sm font-medium text-muted-foreground">Vacina</span>
              <p className="font-medium">{campaign.vaccine}</p>
            </div>

            <div>
              <span className="text-sm font-medium text-muted-foreground">Faixa Etária</span>
              <p className="font-medium">{campaign.ageRange}</p>
            </div>

            <div>
              <span className="text-sm font-medium text-muted-foreground">Público-alvo</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {campaign.targetAudience.map((audience, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {audience}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Progresso da Campanha
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Cobertura atual:</span>
                <span className="font-medium">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                {campaign.currentCoverage.toLocaleString()} de {campaign.estimatedCoverage.toLocaleString()} pessoas
                vacinadas
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Meta diária:</span>
                <p className="font-medium">2.500 doses</p>
              </div>
              <div>
                <span className="text-muted-foreground">Doses aplicadas hoje:</span>
                <p className="font-medium">1.847 doses</p>
              </div>
            </div>

            {campaign.userEligible && campaign.status === "active" && !campaign.completedByUser && (
              <div className="pt-4">
                <Button className="w-full" size="lg">
                  Agendar Minha Vacinação
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Locations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Locais de Vacinação
          </CardTitle>
          <CardDescription>{detailedLocations.length} postos de saúde participando desta campanha</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {detailedLocations.map((location) => (
              <div key={location.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{location.name}</h3>
                    <p className="text-sm text-muted-foreground">{location.address}</p>
                  </div>
                  <Badge className={getAvailabilityColor(location.availability)}>
                    {location.availability} disponibilidade
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{location.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{location.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <span>Tempo de espera: {location.waitTime}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Ver no Mapa
                  </Button>
                  <Button size="sm" variant="outline">
                    Como Chegar
                  </Button>
                  <Button size="sm">Agendar Aqui</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recursos Adicionais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
              <div className="text-left">
                <div className="font-medium">Cartilha da Campanha</div>
                <div className="text-sm text-muted-foreground">Informações detalhadas sobre a vacina</div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
              <div className="text-left">
                <div className="font-medium">Perguntas Frequentes</div>
                <div className="text-sm text-muted-foreground">Tire suas dúvidas sobre a vacinação</div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
              <div className="text-left">
                <div className="font-medium">Contraindicações</div>
                <div className="text-sm text-muted-foreground">Quando não tomar a vacina</div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
              <div className="text-left">
                <div className="font-medium">Certificado Digital</div>
                <div className="text-sm text-muted-foreground">Baixe seu comprovante após a vacinação</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
