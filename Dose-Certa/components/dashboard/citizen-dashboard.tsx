"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Calendar, Download, AlertTriangle, Clock, FileText, Megaphone } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { VaccinationCard, type VaccinationRecord } from "@/components/vaccination/vaccination-card"
import { VaccinationTimeline } from "@/components/vaccination/vaccination-timeline"
import { VaccinationAlerts } from "@/components/vaccination/vaccination-alerts"
import { VaccinationCardPDF } from "@/components/vaccination/vaccination-card-pdf"
import { ExamList } from "@/components/exams/exam-list"
import type { ExamRecord } from "@/components/exams/exam-card"
import { HealthPostsList } from "@/components/health-posts/health-posts-list"
import { CampaignCard, type VaccinationCampaign } from "@/components/campaigns/campaign-card"
import { CampaignCalendar } from "@/components/campaigns/campaign-calendar"
import { CampaignDetails } from "@/components/campaigns/campaign-details"
import { NewsFeed } from "@/components/news/news-feed"
import { NewsDetails } from "@/components/news/news-details"
import type { NewsArticle } from "@/components/news/news-card"

const mockVaccinationHistory: VaccinationRecord[] = [
  {
    id: "1",
    vaccine: "COVID-19 (Pfizer-BioNTech)",
    date: "2024-03-15",
    location: "UBS Vila Madalena",
    batch: "ABC123XY",
    status: "completed",
    nextDose: null,
    doseNumber: 3,
    totalDoses: 3,
    manufacturer: "Pfizer-BioNTech",
    healthProfessional: "Dr. Maria Silva (CRM 12345)",
    notes: "Dose de reforço anual aplicada sem intercorrências.",
  },
  {
    id: "2",
    vaccine: "Influenza 2024 (Trivalente)",
    date: "2024-02-10",
    location: "UBS Pinheiros",
    batch: "FLU456AB",
    status: "completed",
    nextDose: "2025-02-10",
    doseNumber: 1,
    totalDoses: 1,
    manufacturer: "Instituto Butantan",
    healthProfessional: "Enf. João Santos (COREN 54321)",
    notes: "Vacina sazonal contra gripe. Próxima dose em 2025.",
  },
  {
    id: "3",
    vaccine: "Hepatite B (Recombinante)",
    date: "2024-01-20",
    location: "UBS Vila Madalena",
    batch: "HEP789CD",
    status: "completed",
    nextDose: "2024-04-20",
    doseNumber: 1,
    totalDoses: 3,
    manufacturer: "Instituto Butantan",
    healthProfessional: "Dr. Ana Costa (CRM 67890)",
    notes: "Primeira dose da série. Importante manter intervalo de 3 meses.",
  },
  {
    id: "4",
    vaccine: "Hepatite B (Recombinante)",
    date: "2024-04-20",
    location: "UBS Vila Madalena",
    batch: "HEP789EF",
    status: "overdue",
    nextDose: "2024-10-20",
    doseNumber: 2,
    totalDoses: 3,
    manufacturer: "Instituto Butantan",
    healthProfessional: "",
    notes: "Segunda dose em atraso. Procurar posto de saúde.",
  },
  {
    id: "5",
    vaccine: "Tétano e Difteria (dT)",
    date: "2023-05-15",
    location: "Hospital das Clínicas",
    batch: "TET123GH",
    status: "completed",
    nextDose: "2033-05-15",
    doseNumber: 1,
    totalDoses: 1,
    manufacturer: "Instituto Butantan",
    healthProfessional: "Dr. Carlos Mendes (CRM 11111)",
    notes: "Reforço decenal. Próxima dose em 10 anos.",
  },
  {
    id: "6",
    vaccine: "Febre Amarela",
    date: "2023-01-10",
    location: "Centro de Imunização",
    batch: "FA456IJ",
    status: "completed",
    nextDose: null,
    doseNumber: 1,
    totalDoses: 1,
    manufacturer: "Bio-Manguinhos/Fiocruz",
    healthProfessional: "Enf. Paula Lima (COREN 22222)",
    notes: "Dose única. Imunização permanente.",
  },
]

const mockCustomAlerts = [
  {
    id: "campaign-1",
    type: "campaign",
    title: "Nova Campanha de Vacinação",
    message: "Campanha nacional contra Influenza 2024 começou. Grupos prioritários podem se vacinar gratuitamente.",
    priority: "medium",
    actionLabel: "Saiba Mais",
    dismissible: true,
  },
  {
    id: "reminder-1",
    type: "reminder",
    title: "Lembrete de Consulta",
    message: "Você tem uma consulta agendada para avaliação do seu cartão de vacinação em 15/04/2024.",
    priority: "low",
    actionLabel: "Ver Agenda",
    dismissible: true,
  },
]

const mockExamHistory: ExamRecord[] = [
  {
    id: "exam-1",
    title: "Hemograma Completo",
    category: "sangue",
    date: "2024-03-10",
    doctor: "Dr. Maria Santos (CRM 12345)",
    notes: "Exame de rotina para check-up anual. Todos os valores dentro da normalidade.",
    files: [
      {
        id: "file-1",
        name: "hemograma-completo-2024-03-10.pdf",
        size: 245760,
        type: "application/pdf",
        url: "/medical-report-pdf.png",
      },
    ],
    uploadDate: "2024-03-10T14:30:00Z",
  },
  {
    id: "exam-2",
    title: "Radiografia de Tórax",
    category: "imagem",
    date: "2024-02-15",
    doctor: "Dr. João Silva (CRM 67890)",
    notes: "Exame solicitado devido a tosse persistente. Resultado normal, sem alterações.",
    files: [
      {
        id: "file-2",
        name: "raio-x-torax-2024-02-15.jpg",
        size: 1024000,
        type: "image/jpeg",
        url: "/chest-xray.png",
      },
      {
        id: "file-3",
        name: "laudo-radiografia.pdf",
        size: 156000,
        type: "application/pdf",
        url: "/medical-report-pdf.png",
      },
    ],
    uploadDate: "2024-02-15T16:45:00Z",
  },
  {
    id: "exam-3",
    title: "Exame de Urina Tipo I",
    category: "urina",
    date: "2024-01-20",
    doctor: "Dra. Ana Costa (CRM 11111)",
    notes: "Exame de rotina. Presença de traços de proteína, recomendado acompanhamento.",
    files: [
      {
        id: "file-4",
        name: "urina-tipo1-2024-01-20.pdf",
        size: 189000,
        type: "application/pdf",
        url: "/urine-test-medical-report.png",
      },
    ],
    uploadDate: "2024-01-20T10:15:00Z",
  },
  {
    id: "exam-4",
    title: "Eletrocardiograma (ECG)",
    category: "cardiologico",
    date: "2023-12-05",
    doctor: "Dr. Carlos Mendes (CRM 22222)",
    notes: "ECG de repouso para avaliação cardiológica preventiva. Ritmo sinusal normal.",
    files: [
      {
        id: "file-5",
        name: "ecg-2023-12-05.pdf",
        size: 312000,
        type: "application/pdf",
        url: "/ecg-electrocardiogram-medical.png",
      },
    ],
    uploadDate: "2023-12-05T09:30:00Z",
  },
]

const mockCampaigns: VaccinationCampaign[] = [
  {
    id: "campaign-1",
    title: "Campanha Nacional de Vacinação contra Influenza 2024",
    description:
      "Campanha anual de vacinação contra a gripe para grupos prioritários. Proteja-se e proteja sua família contra os vírus da influenza.",
    vaccine: "Influenza 2024 (Trivalente)",
    startDate: "2024-04-01",
    endDate: "2024-07-31",
    targetAudience: [
      "Idosos 60+",
      "Crianças 6 meses a 5 anos",
      "Gestantes",
      "Profissionais de saúde",
      "Pessoas com comorbidades",
    ],
    ageRange: "6 meses+",
    priority: "high",
    status: "active",
    locations: ["UBS Vila Madalena", "UBS Pinheiros", "Centro de Imunização"],
    eligibilityCheck: true,
    userEligible: true,
    completedByUser: false,
    estimatedCoverage: 150000,
    currentCoverage: 89500,
  },
  {
    id: "campaign-2",
    title: "Campanha de Atualização COVID-19 - Dose de Reforço",
    description:
      "Dose de reforço anual da vacina COVID-19 com as cepas mais recentes. Mantenha sua proteção atualizada.",
    vaccine: "COVID-19 (Bivalente)",
    startDate: "2024-03-15",
    endDate: "2024-12-31",
    targetAudience: ["Adultos 18+", "Idosos 60+", "Imunossuprimidos", "Profissionais de saúde"],
    ageRange: "18+",
    priority: "medium",
    status: "active",
    locations: ["UBS Vila Madalena", "UBS Pinheiros", "Centro de Imunização", "Hospital das Clínicas"],
    eligibilityCheck: true,
    userEligible: true,
    completedByUser: true,
    estimatedCoverage: 200000,
    currentCoverage: 145000,
  },
  {
    id: "campaign-3",
    title: "Campanha HPV - Adolescentes",
    description:
      "Vacinação contra HPV para adolescentes de 9 a 14 anos. Prevenção contra o câncer de colo do útero e outros cânceres.",
    vaccine: "HPV Quadrivalente",
    startDate: "2024-02-01",
    endDate: "2024-11-30",
    targetAudience: ["Meninas 9-14 anos", "Meninos 9-14 anos"],
    ageRange: "9-14 anos",
    priority: "medium",
    status: "active",
    locations: ["Escolas públicas", "UBS Vila Madalena", "UBS Pinheiros"],
    eligibilityCheck: true,
    userEligible: false,
    completedByUser: false,
    estimatedCoverage: 50000,
    currentCoverage: 28000,
  },
  {
    id: "campaign-4",
    title: "Campanha Hepatite B - Adultos",
    description: "Vacinação contra Hepatite B para adultos não vacinados. Três doses para proteção completa.",
    vaccine: "Hepatite B (Recombinante)",
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    targetAudience: ["Adultos não vacinados", "Profissionais de saúde", "Pessoas com múltiplos parceiros"],
    ageRange: "18+",
    priority: "low",
    status: "active",
    locations: ["UBS Vila Madalena", "UBS Pinheiros", "Centro de Imunização"],
    eligibilityCheck: true,
    userEligible: true,
    completedByUser: false,
    estimatedCoverage: 75000,
    currentCoverage: 32000,
  },
  {
    id: "campaign-5",
    title: "Campanha Meningite ACWY - Adolescentes",
    description: "Vacinação contra meningite meningocócica para adolescentes. Proteção contra as cepas mais comuns.",
    vaccine: "Meningocócica ACWY",
    startDate: "2024-05-01",
    endDate: "2024-08-31",
    targetAudience: ["Adolescentes 11-14 anos"],
    ageRange: "11-14 anos",
    priority: "medium",
    status: "upcoming",
    locations: ["Escolas públicas", "UBS Vila Madalena", "UBS Pinheiros"],
    eligibilityCheck: true,
    userEligible: false,
    completedByUser: false,
    estimatedCoverage: 30000,
    currentCoverage: 0,
  },
]

const mockNewsArticles: NewsArticle[] = [
  {
    id: "news-1",
    title: "Novas Diretrizes de Vacinação",
    content: "O governo lançou novas diretrizes para vacinação contra doenças infecciosas. Confira as recomendações!",
    date: "2024-03-01",
  },
  {
    id: "news-2",
    title: "Postos de Saúde Abertos para Campanha de Vacinação",
    content: "Postos de saúde em todo o país estão abertos para a campanha de vacinação contra gripe. Agende sua dose!",
    date: "2024-03-10",
  },
]

export function CitizenDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [examHistory, setExamHistory] = useState<ExamRecord[]>(mockExamHistory)
  const [selectedCampaign, setSelectedCampaign] = useState<VaccinationCampaign | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)

  if (!user || user.type !== "citizen") return null

  const overdueDoses = mockVaccinationHistory.filter((v) => v.status === "overdue").length
  const upcomingDoses = mockVaccinationHistory.filter((v) => v.nextDose && v.status === "completed").length
  const completedVaccines = mockVaccinationHistory.filter((v) => v.status === "completed").length
  const vaccinationProgress = Math.round((completedVaccines / mockVaccinationHistory.length) * 100)

  const eligibleCampaigns = mockCampaigns.filter(
    (c) => c.userEligible && c.status === "active" && !c.completedByUser,
  ).length
  const activeCampaigns = mockCampaigns.filter((c) => c.status === "active").length

  const userProfile = {
    name: user.name,
    cpf: "123.456.789-00",
    birthDate: "15/03/1990",
    email: user.email,
  }

  const handleExamAdded = (newExam: ExamRecord) => {
    setExamHistory((prev) => [newExam, ...prev])
  }

  const handleViewCampaignDetails = (campaign: VaccinationCampaign) => {
    setSelectedCampaign(campaign)
    setActiveTab("campaign-details")
  }

  const handleViewArticleDetails = (article: NewsArticle) => {
    setSelectedArticle(article)
    setActiveTab("news-details")
  }

  if (selectedCampaign) {
    return (
      <div className="py-8 px-4">
        <div className="container">
          <CampaignDetails
            campaign={selectedCampaign}
            onClose={() => {
              setSelectedCampaign(null)
              setActiveTab("campaigns")
            }}
          />
        </div>
      </div>
    )
  }

  if (selectedArticle) {
    return (
      <div className="py-8 px-4">
        <div className="container">
          <NewsDetails
            article={selectedArticle}
            onBack={() => {
              setSelectedArticle(null)
              setActiveTab("news")
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 px-4">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Meu Painel de Vacinação</h1>
          <p className="text-muted-foreground">Bem-vindo de volta, {user.name}! Mantenha sua saúde em dia.</p>
        </div>

        <div className="mb-8">
          <VaccinationAlerts records={mockVaccinationHistory} customAlerts={mockCustomAlerts} />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vacinas Completas</CardTitle>
              <Shield className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedVaccines}</div>
              <p className="text-xs text-muted-foreground">Histórico atualizado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Doses Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{upcomingDoses}</div>
              <p className="text-xs text-muted-foreground">Próximos reforços</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Doses Atrasadas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{overdueDoses}</div>
              <p className="text-xs text-muted-foreground">Requer atenção</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resultados de Exames</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{examHistory.length}</div>
              <p className="text-xs text-muted-foreground">Arquivos salvos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
              <Megaphone className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{eligibleCampaigns}</div>
              <p className="text-xs text-muted-foreground">Você é elegível</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="card">Cartão Digital</TabsTrigger>
            <TabsTrigger value="exams">Exames</TabsTrigger>
            <TabsTrigger value="locations">Postos</TabsTrigger>
            <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
            <TabsTrigger value="news">Notícias</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Próximas Vacinações
                  </CardTitle>
                  <CardDescription>Vacinas agendadas e recomendadas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockVaccinationHistory
                    .filter((record) => record.nextDose && record.status === "completed")
                    .slice(0, 3)
                    .map((record) => (
                      <VaccinationCard key={record.id} record={record} compact={true} showActions={false} />
                    ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Cartão de Vacinação Digital
                  </CardTitle>
                  <CardDescription>Seu histórico vacinal sempre à mão</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">CPF: ***.***.***-**</p>
                      </div>
                      <Shield className="h-12 w-12 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Vacinas completas:</span>
                        <span className="font-medium">{completedVaccines}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Última atualização:</span>
                        <span className="font-medium">15/03/2024</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-transparent" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar PDF
                    </Button>
                    <Button className="flex-1">Compartilhar</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Histórico Completo de Vacinação</CardTitle>
                <CardDescription>Todas as suas vacinas registradas no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {mockVaccinationHistory.map((record) => (
                    <VaccinationCard key={record.id} record={record} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <VaccinationTimeline records={mockVaccinationHistory} />
          </TabsContent>

          <TabsContent value="card" className="space-y-6">
            <VaccinationCardPDF userProfile={userProfile} vaccinations={mockVaccinationHistory} />
          </TabsContent>

          <TabsContent value="exams" className="space-y-6">
            <ExamList exams={examHistory} onExamAdded={handleExamAdded} />
          </TabsContent>

          <TabsContent value="locations" className="space-y-6">
            <HealthPostsList />
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Megaphone className="h-5 w-5" />
                      Campanhas de Vacinação Ativas
                    </CardTitle>
                    <CardDescription>
                      {activeCampaigns} campanhas ativas • {eligibleCampaigns} relevantes para você
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockCampaigns
                        .filter((campaign) => campaign.status === "active")
                        .map((campaign) => (
                          <CampaignCard
                            key={campaign.id}
                            campaign={campaign}
                            onViewDetails={handleViewCampaignDetails}
                            compact={true}
                          />
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Próximas Campanhas</CardTitle>
                    <CardDescription>Campanhas que começarão em breve</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockCampaigns
                        .filter((campaign) => campaign.status === "upcoming")
                        .map((campaign) => (
                          <CampaignCard
                            key={campaign.id}
                            campaign={campaign}
                            onViewDetails={handleViewCampaignDetails}
                            compact={true}
                          />
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notificações Personalizadas</CardTitle>
                    <CardDescription>Baseadas no seu perfil e histórico</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Megaphone className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900">Campanha Influenza</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Você é elegível para a campanha de vacinação contra gripe. Agende sua dose!
                          </p>
                          <Button size="sm" className="mt-2">
                            Agendar Agora
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-900">Hepatite B Pendente</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            Sua segunda dose de Hepatite B está atrasada. Procure um posto de saúde.
                          </p>
                          <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                            Ver Postos
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Calendário Oficial</CardTitle>
                    <CardDescription>Compare com seu histórico</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => setActiveTab("calendar")}
                    >
                      Ver Calendário Completo
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <CampaignCalendar userHistory={mockVaccinationHistory} activeCampaigns={mockCampaigns} />
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <NewsFeed onArticleSelect={handleViewArticleDetails} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
