import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Search, 
  Calendar, 
  ExternalLink, 
  TrendingUp,
  AlertTriangle,
  Globe,
  BookOpen
} from "lucide-react";

const Noticias = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");

  const newsData = [
    {
      id: 1,
      title: "Nova Campanha de Vacinação contra Influenza inicia em março",
      summary: "Ministério da Saúde anuncia início da campanha nacional de vacinação contra a gripe para 2024, priorizando grupos de risco.",
      source: "Ministério da Saúde",
      date: "2024-02-15",
      category: "campanhas",
      tags: ["influenza", "campanha", "2024"],
      image: "/placeholder.svg",
      url: "https://gov.br/saude"
    },
    {
      id: 2,
      title: "Estudo confirma eficácia da vacina COVID-19 em variantes recentes",
      summary: "Pesquisa da Fiocruz demonstra que as vacinas atuais mantêm proteção significativa contra hospitalizações.",
      source: "Fiocruz",
      date: "2024-02-12",
      category: "pesquisa",
      tags: ["covid-19", "eficácia", "variantes"],
      image: "/placeholder.svg",
      url: "https://fiocruz.br"
    },
    {
      id: 3,
      title: "Surto de sarampo em região metropolitana exige atenção",
      summary: "Secretaria de Saúde registra 12 casos confirmados e reforça importância da vacinação tríplice viral.",
      source: "Secretaria Estadual de Saúde",
      date: "2024-02-10",
      category: "alertas",
      tags: ["sarampo", "surto", "tríplice viral"],
      image: "/placeholder.svg",
      url: "https://saude.sp.gov.br"
    },
    {
      id: 4,
      title: "OMS atualiza recomendações para vacinação de gestantes",
      summary: "Organização Mundial da Saúde publica novas diretrizes para imunização durante a gravidez.",
      source: "OMS",
      date: "2024-02-08",
      category: "internacional",
      tags: ["gestantes", "OMS", "recomendações"],
      image: "/placeholder.svg",
      url: "https://who.int"
    },
    {
      id: 5,
      title: "Tecnologia brasileira desenvolve nova vacina contra dengue",
      summary: "Instituto Butantan anuncia resultados promissores em testes clínicos de vacina nacional contra dengue.",
      source: "Instituto Butantan",
      date: "2024-02-05",
      category: "inovacao",
      tags: ["dengue", "butantan", "inovação"],
      image: "/placeholder.svg",
      url: "https://butantan.gov.br"
    }
  ];

  const categories = [
    { id: "todas", label: "Todas", icon: Globe },
    { id: "campanhas", label: "Campanhas", icon: TrendingUp },
    { id: "alertas", label: "Alertas", icon: AlertTriangle },
    { id: "pesquisa", label: "Pesquisas", icon: BookOpen },
    { id: "internacional", label: "Internacional", icon: Globe },
    { id: "inovacao", label: "Inovação", icon: TrendingUp }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "campanhas": return "bg-health-green";
      case "alertas": return "bg-destructive";
      case "pesquisa": return "bg-medical-blue";
      case "internacional": return "bg-purple-500";
      case "inovacao": return "bg-amber-500";
      default: return "bg-gray-500";
    }
  };

  const filteredNews = newsData.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "todas" || news.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-medical-blue mb-2">
              Central de Notícias
            </h1>
            <p className="text-muted-foreground mb-6">
              Fique por dentro das últimas informações sobre vacinação e saúde pública
            </p>

            {/* Barra de Pesquisa */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar notícias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filtros por Categoria */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
            <TabsList className="grid w-full grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
                  <category.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Lista de Notícias */}
          <div className="space-y-6">
            {filteredNews.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge className={`${getCategoryColor(news.category)} text-white`}>
                              {categories.find(c => c.id === news.category)?.label}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {new Date(news.date).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold text-medical-blue leading-tight">
                            {news.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            Fonte: {news.source}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-4">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {news.summary}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {news.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          Ler mais
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma notícia encontrada</h3>
                  <p className="text-muted-foreground">
                    Tente ajustar os termos de busca ou categoria
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fontes de Informação */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-medical-blue">Fontes Confiáveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <Globe className="h-8 w-8 text-medical-blue mx-auto mb-2" />
                  <p className="text-sm font-medium">Ministério da Saúde</p>
                </div>
                <div className="text-center p-4">
                  <Globe className="h-8 w-8 text-health-green mx-auto mb-2" />
                  <p className="text-sm font-medium">Fiocruz</p>
                </div>
                <div className="text-center p-4">
                  <Globe className="h-8 w-8 text-medical-blue mx-auto mb-2" />
                  <p className="text-sm font-medium">OMS</p>
                </div>
                <div className="text-center p-4">
                  <Globe className="h-8 w-8 text-health-green mx-auto mb-2" />
                  <p className="text-sm font-medium">Instituto Butantan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Noticias;