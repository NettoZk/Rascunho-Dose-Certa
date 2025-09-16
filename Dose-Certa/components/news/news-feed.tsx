"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertTriangle, Bell, Newspaper, Search, Zap } from "lucide-react"
import { NewsCard, type NewsArticle } from "./news-card"

const mockNewsArticles: NewsArticle[] = [
  {
    id: "news-1",
    title: "Alerta: Surto de Dengue em São Paulo - Medidas Preventivas Urgentes",
    summary:
      "Secretaria de Saúde confirma aumento de 300% nos casos de dengue na capital paulista. Autoridades recomendam eliminação de focos do mosquito Aedes aegypti.",
    content:
      "A Secretaria Municipal de Saúde de São Paulo confirmou um surto de dengue na cidade, com mais de 15.000 casos registrados apenas no primeiro trimestre de 2024...",
    source: "Ministério da Saúde",
    author: "Dr. Carlos Santos",
    publishedAt: "2024-03-20T08:30:00Z",
    category: "epidemic",
    priority: "urgent",
    tags: ["dengue", "surto", "são paulo", "prevenção", "aedes aegypti"],
    imageUrl: "/dengue-mosquito-prevention.png",
    readTime: 5,
    views: 12500,
  },
  {
    id: "news-2",
    title: "Nova Vacina contra Chikungunya Aprovada pela ANVISA",
    summary:
      "Primeira vacina contra chikungunya recebe aprovação no Brasil. Imunizante estará disponível na rede privada a partir de abril de 2024.",
    content:
      "A Agência Nacional de Vigilância Sanitária (ANVISA) aprovou a primeira vacina contra chikungunya no Brasil...",
    source: "ANVISA",
    author: "Dra. Maria Oliveira",
    publishedAt: "2024-03-18T14:15:00Z",
    category: "vaccination",
    priority: "high",
    tags: ["chikungunya", "vacina", "anvisa", "aprovação"],
    imageUrl: "/vaccine-approval-medical.png",
    readTime: 4,
    views: 8900,
  },
  {
    id: "news-3",
    title: "Campanha de Vacinação contra Influenza Atinge 70% da Meta",
    summary:
      "Ministério da Saúde anuncia que campanha nacional já vacinou mais de 35 milhões de pessoas. Meta é imunizar 50 milhões até julho.",
    content:
      "A campanha nacional de vacinação contra influenza de 2024 já atingiu 70% da meta estabelecida pelo Ministério da Saúde...",
    source: "Ministério da Saúde",
    author: "Assessoria de Imprensa",
    publishedAt: "2024-03-17T10:45:00Z",
    category: "vaccination",
    priority: "medium",
    tags: ["influenza", "campanha", "vacinação", "meta"],
    imageUrl: "/vaccination-campaign-flu-shot.png",
    readTime: 3,
    views: 6200,
  },
  {
    id: "news-4",
    title: "Estudo Revela Eficácia de 95% da Vacina COVID-19 Bivalente",
    summary:
      "Pesquisa do Instituto Butantan confirma alta eficácia da vacina bivalente contra variantes circulantes do SARS-CoV-2.",
    content:
      "Um estudo conduzido pelo Instituto Butantan em parceria com universidades brasileiras demonstrou que a vacina COVID-19 bivalente...",
    source: "Instituto Butantan",
    author: "Dr. João Silva",
    publishedAt: "2024-03-15T16:20:00Z",
    category: "health",
    priority: "medium",
    tags: ["covid-19", "vacina bivalente", "eficácia", "estudo"],
    imageUrl: "/covid-vaccine-research-study.png",
    readTime: 6,
    views: 9800,
  },
  {
    id: "news-5",
    title: "Alerta: Casos de Sarampo Aumentam 150% no Interior de SP",
    summary:
      "Vigilância Epidemiológica registra surto de sarampo em 12 municípios. Campanha de vacinação emergencial será iniciada.",
    content:
      "A Vigilância Epidemiológica do Estado de São Paulo confirmou um aumento significativo nos casos de sarampo...",
    source: "Secretaria Estadual de Saúde SP",
    author: "Dra. Ana Costa",
    publishedAt: "2024-03-14T09:10:00Z",
    category: "epidemic",
    priority: "high",
    tags: ["sarampo", "surto", "interior sp", "vacinação emergencial"],
    imageUrl: "/measles-outbreak-vaccination.png",
    readTime: 4,
    views: 7300,
  },
  {
    id: "news-6",
    title: "Ministério da Saúde Lança Aplicativo para Monitoramento de Vacinas",
    summary:
      "Nova ferramenta digital permite acompanhamento em tempo real do calendário vacinal e recebimento de lembretes personalizados.",
    content: "O Ministério da Saúde lançou oficialmente um novo aplicativo móvel para facilitar o acompanhamento...",
    source: "Ministério da Saúde",
    author: "Equipe de Comunicação",
    publishedAt: "2024-03-12T11:30:00Z",
    category: "health",
    priority: "low",
    tags: ["aplicativo", "tecnologia", "calendário vacinal", "digital"],
    imageUrl: "/health-app-mobile-vaccination.png",
    readTime: 3,
    views: 4500,
  },
]

interface NewsFeedProps {
  onArticleSelect?: (article: NewsArticle) => void
}

export function NewsFeed({ onArticleSelect }: NewsFeedProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedPriority, setSelectedPriority] = useState<string>("all")

  const filteredArticles = mockNewsArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    const matchesPriority = selectedPriority === "all" || article.priority === selectedPriority

    return matchesSearch && matchesCategory && matchesPriority
  })

  const urgentAlerts = mockNewsArticles.filter((article) => article.priority === "urgent")
  const epidemicNews = mockNewsArticles.filter((article) => article.category === "epidemic")
  const vaccinationNews = mockNewsArticles.filter((article) => article.category === "vaccination")

  return (
    <div className="space-y-6">
      {/* Urgent Alerts Banner */}
      {urgentAlerts.length > 0 && (
        <Card className="border-red-500 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              Alertas Urgentes de Saúde Pública
            </CardTitle>
            <CardDescription className="text-red-700">
              Informações críticas que requerem atenção imediata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {urgentAlerts.map((article) => (
                <NewsCard key={article.id} article={article} onReadMore={onArticleSelect} compact={true} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Central de Notícias e Alertas
          </CardTitle>
          <CardDescription>Informações oficiais sobre vacinação, epidemias e saúde pública</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar notícias, alertas ou temas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className={selectedCategory !== "all" ? "bg-transparent" : ""}
              >
                Todas
              </Button>
              <Button
                variant={selectedCategory === "epidemic" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("epidemic")}
                className={selectedCategory !== "epidemic" ? "bg-transparent" : ""}
              >
                <AlertTriangle className="h-4 w-4 mr-1" />
                Epidemias
              </Button>
              <Button
                variant={selectedCategory === "vaccination" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("vaccination")}
                className={selectedCategory !== "vaccination" ? "bg-transparent" : ""}
              >
                <Zap className="h-4 w-4 mr-1" />
                Vacinação
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <div className="font-semibold text-red-800">{urgentAlerts.length}</div>
                  <div className="text-sm text-red-600">Alertas Urgentes</div>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="font-semibold text-orange-800">{epidemicNews.length}</div>
                  <div className="text-sm text-orange-600">Surtos/Epidemias</div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-semibold text-blue-800">{vaccinationNews.length}</div>
                  <div className="text-sm text-blue-600">Vacinação</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* News Articles */}
      <div className="space-y-4">
        {filteredArticles.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">Nenhuma notícia encontrada com os filtros selecionados.</p>
            </CardContent>
          </Card>
        ) : (
          filteredArticles.map((article) => (
            <NewsCard key={article.id} article={article} onReadMore={onArticleSelect} />
          ))
        )}
      </div>

      {/* Load More */}
      {filteredArticles.length > 0 && (
        <div className="text-center">
          <Button variant="outline" className="bg-transparent">
            Carregar Mais Notícias
          </Button>
        </div>
      )}
    </div>
  )
}
