"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Shield,
  Package,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Search,
  Plus,
  FileText,
  Target,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { StockManagement } from "@/components/health-posts/stock-management"

// Mock data - TODO: Replace with real API calls
const mockPatients = [
  {
    id: "1",
    name: "Maria Silva",
    cpf: "123.456.789-00",
    lastVaccination: "2024-03-15",
    vaccine: "COVID-19",
    nextDue: "2024-09-15",
    status: "up-to-date",
  },
  {
    id: "2",
    name: "João Santos",
    cpf: "987.654.321-00",
    lastVaccination: "2024-02-10",
    vaccine: "Influenza",
    nextDue: "2024-04-20",
    status: "overdue",
  },
  {
    id: "3",
    name: "Ana Costa",
    cpf: "456.789.123-00",
    lastVaccination: "2024-03-01",
    vaccine: "Hepatite B",
    nextDue: "2024-05-01",
    status: "upcoming",
  },
]

const mockInventory = [
  {
    id: "1",
    vaccine: "COVID-19 (Pfizer)",
    currentStock: 150,
    minStock: 50,
    maxStock: 300,
    expiryDate: "2024-08-15",
    batch: "PFZ2024A",
    status: "good",
  },
  {
    id: "2",
    vaccine: "Influenza 2024",
    currentStock: 25,
    minStock: 50,
    maxStock: 200,
    expiryDate: "2024-06-30",
    batch: "FLU2024B",
    status: "low",
  },
  {
    id: "3",
    vaccine: "Hepatite B",
    currentStock: 80,
    minStock: 30,
    maxStock: 150,
    expiryDate: "2024-12-31",
    batch: "HEP2024C",
    status: "good",
  },
  {
    id: "4",
    vaccine: "Tétano",
    currentStock: 15,
    minStock: 20,
    maxStock: 100,
    expiryDate: "2024-04-30",
    batch: "TET2024D",
    status: "critical",
  },
]

const mockCampaigns = [
  {
    id: "1",
    name: "Campanha Influenza 2024",
    startDate: "2024-03-01",
    endDate: "2024-05-31",
    target: 1000,
    completed: 650,
    status: "active",
    priority: "high",
  },
  {
    id: "2",
    name: "Vacinação COVID-19 Idosos",
    startDate: "2024-02-15",
    endDate: "2024-04-15",
    target: 500,
    completed: 420,
    status: "active",
    priority: "medium",
  },
  {
    id: "3",
    name: "Hepatite B - Profissionais de Saúde",
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    target: 200,
    completed: 180,
    status: "active",
    priority: "low",
  },
]

const mockRecentVaccinations = [
  {
    id: "1",
    patientName: "Carlos Oliveira",
    vaccine: "COVID-19",
    date: "2024-03-20",
    time: "14:30",
    professional: "Enf. Maria Santos",
  },
  {
    id: "2",
    patientName: "Lucia Ferreira",
    vaccine: "Influenza",
    date: "2024-03-20",
    time: "14:15",
    professional: "Enf. João Silva",
  },
  {
    id: "3",
    patientName: "Pedro Costa",
    vaccine: "Hepatite B",
    date: "2024-03-20",
    time: "14:00",
    professional: "Enf. Ana Lima",
  },
]

export function ProfessionalDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  if (!user || user.type !== "professional") return null

  const totalPatients = mockPatients.length
  const overduePatients = mockPatients.filter((p) => p.status === "overdue").length
  const lowStockItems = mockInventory.filter((item) => item.status === "low" || item.status === "critical").length
  const activeCampaigns = mockCampaigns.filter((c) => c.status === "active").length

  return (
    <div className="py-8 px-4">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Painel Profissional</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta, {user.name}!
            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded">Profissional de Saúde</span>
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacientes Cadastrados</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalPatients}</div>
              <p className="text-xs text-muted-foreground">+12 este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacientes em Atraso</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{overduePatients}</div>
              <p className="text-xs text-muted-foreground">Requer atenção</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
              <Package className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
              <p className="text-xs text-muted-foreground">Itens para repor</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
              <Target className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeCampaigns}</div>
              <p className="text-xs text-muted-foreground">Em andamento</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="patients">Pacientes</TabsTrigger>
            <TabsTrigger value="inventory">Estoque</TabsTrigger>
            <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Vaccinations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Vacinações Recentes
                  </CardTitle>
                  <CardDescription>Últimas aplicações registradas hoje</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockRecentVaccinations.map((vaccination) => (
                    <div key={vaccination.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{vaccination.patientName}</p>
                        <p className="text-sm text-muted-foreground">{vaccination.vaccine}</p>
                        <p className="text-xs text-muted-foreground">
                          {vaccination.date} às {vaccination.time} - {vaccination.professional}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Aplicada
                      </Badge>
                    </div>
                  ))}
                  <Button className="w-full bg-transparent" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Registrar Nova Vacinação
                  </Button>
                </CardContent>
              </Card>

              {/* Campaign Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Progresso das Campanhas
                  </CardTitle>
                  <CardDescription>Acompanhe o desempenho das campanhas ativas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockCampaigns.slice(0, 3).map((campaign) => {
                    const progress = Math.round((campaign.completed / campaign.target) * 100)
                    return (
                      <div key={campaign.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{campaign.name}</p>
                          <Badge
                            variant={
                              campaign.priority === "high"
                                ? "destructive"
                                : campaign.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {campaign.priority === "high" ? "Alta" : campaign.priority === "medium" ? "Média" : "Baixa"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>
                            {campaign.completed} / {campaign.target}
                          </span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Gerenciamento de Pacientes
                </CardTitle>
                <CardDescription>Acompanhe o histórico vacinal dos seus pacientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nome ou CPF..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Paciente
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockPatients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{patient.name}</p>
                          <Badge
                            variant={
                              patient.status === "up-to-date"
                                ? "default"
                                : patient.status === "overdue"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {patient.status === "up-to-date"
                              ? "Em dia"
                              : patient.status === "overdue"
                                ? "Atrasado"
                                : "Próximo"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">CPF: {patient.cpf}</p>
                        <p className="text-sm text-muted-foreground">
                          Última: {patient.vaccine} em {patient.lastVaccination}
                        </p>
                        <p className="text-sm text-muted-foreground">Próxima: {patient.nextDue}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Ver Histórico
                        </Button>
                        <Button size="sm">Agendar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <StockManagement postId="professional-post" postName={`Posto de ${user.name}`} />
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Campanhas de Vacinação
                </CardTitle>
                <CardDescription>Gerencie e acompanhe campanhas de vacinação</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                    <Button variant="outline">Todas</Button>
                    <Button variant="outline">Ativas</Button>
                    <Button variant="outline">Finalizadas</Button>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Campanha
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockCampaigns.map((campaign) => {
                    const progress = Math.round((campaign.completed / campaign.target) * 100)
                    return (
                      <div key={campaign.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium">{campaign.name}</p>
                              <Badge
                                variant={
                                  campaign.priority === "high"
                                    ? "destructive"
                                    : campaign.priority === "medium"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                Prioridade{" "}
                                {campaign.priority === "high"
                                  ? "Alta"
                                  : campaign.priority === "medium"
                                    ? "Média"
                                    : "Baixa"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Período: {campaign.startDate} a {campaign.endDate}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">{progress}%</p>
                            <p className="text-sm text-muted-foreground">concluída</p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Progresso</span>
                            <span>
                              {campaign.completed} / {campaign.target}
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Ver Detalhes
                          </Button>
                          <Button size="sm" variant="outline">
                            Relatório
                          </Button>
                          <Button size="sm">Gerenciar</Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Relatórios e Estatísticas
                </CardTitle>
                <CardDescription>Gere relatórios e acompanhe estatísticas de vacinação</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Vacinações Hoje</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">23</p>
                      <p className="text-xs text-muted-foreground">+15% vs ontem</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Esta Semana</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-xs text-muted-foreground">+8% vs semana anterior</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Este Mês</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">642</p>
                      <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Relatório de Vacinações
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Package className="h-4 w-4 mr-2" />
                      Relatório de Estoque
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Target className="h-4 w-4 mr-2" />
                      Relatório de Campanhas
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Users className="h-4 w-4 mr-2" />
                      Relatório de Pacientes
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg bg-muted/20">
                    <h4 className="font-medium mb-2">Filtros de Relatório</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-date">Data Inicial</Label>
                        <Input id="start-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-date">Data Final</Label>
                        <Input id="end-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vaccine-type">Tipo de Vacina</Label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Todas</option>
                          <option>COVID-19</option>
                          <option>Influenza</option>
                          <option>Hepatite B</option>
                        </select>
                      </div>
                    </div>
                    <Button className="mt-4">Gerar Relatório Personalizado</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
