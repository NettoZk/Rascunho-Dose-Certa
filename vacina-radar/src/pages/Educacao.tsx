import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Search, 
  Play, 
  BookOpen, 
  Users, 
  Baby, 
  Heart,
  GraduationCap,
  Clock,
  Eye
} from "lucide-react";

const Educacao = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const educationalContent = [
    {
      id: 1,
      title: "Como as Vacinas Funcionam no Nosso Corpo",
      description: "Entenda o processo de imunização e como as vacinas protegem nossa saúde",
      type: "video",
      duration: "5:30",
      views: 15420,
      category: "basico",
      tags: ["imunidade", "sistema imunológico", "proteção"],
      thumbnail: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Vacinação Infantil: Calendário e Importância",
      description: "Guia completo sobre as vacinas essenciais para crianças de 0 a 12 anos",
      type: "video",
      duration: "8:15",
      views: 23150,
      category: "infantil",
      tags: ["criança", "calendário", "desenvolvimento"],
      thumbnail: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Mitos e Verdades sobre Vacinas",
      description: "Combate à desinformação com base em evidências científicas",
      type: "artigo",
      duration: "10 min leitura",
      views: 8930,
      category: "mitos",
      tags: ["fake news", "ciência", "evidências"],
      thumbnail: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Vacinação na Gravidez: Segurança e Benefícios",
      description: "Informações essenciais para gestantes sobre imunização segura",
      type: "video",
      duration: "6:45",
      views: 12480,
      category: "gestantes",
      tags: ["gravidez", "segurança", "bebê"],
      thumbnail: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Reações Adversas: O que é Normal Esperar",
      description: "Orientações sobre efeitos colaterais comuns e quando buscar ajuda",
      type: "video",
      duration: "4:20",
      views: 18750,
      category: "reacoes",
      tags: ["efeitos colaterais", "orientação", "cuidados"],
      thumbnail: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Vacinas para Idosos: Cuidados Especiais",
      description: "Imunização na terceira idade e proteção contra doenças específicas",
      type: "artigo",
      duration: "12 min leitura",
      views: 7230,
      category: "idosos",
      tags: ["terceira idade", "proteção", "cuidados"],
      thumbnail: "/placeholder.svg"
    }
  ];

  const categories = [
    { id: "todos", label: "Todos", icon: BookOpen },
    { id: "basico", label: "Básico", icon: GraduationCap },
    { id: "infantil", label: "Infantil", icon: Baby },
    { id: "gestantes", label: "Gestantes", icon: Heart },
    { id: "idosos", label: "Idosos", icon: Users },
    { id: "mitos", label: "Mitos", icon: Search }
  ];

  const [selectedCategory, setSelectedCategory] = useState("todos");

  const filteredContent = educationalContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "todos" || content.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    return type === "video" ? <Play className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />;
  };

  const getTypeColor = (type: string) => {
    return type === "video" ? "bg-red-500" : "bg-medical-blue";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-medical-blue mb-2">
              Educação em Saúde
            </h1>
            <p className="text-muted-foreground mb-6">
              Conteúdo confiável para esclarecer dúvidas e combater a desinformação sobre vacinas
            </p>

            {/* Barra de Pesquisa */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conteúdo educativo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Destaque */}
          <Card className="mb-8 bg-gradient-to-r from-medical-blue/10 to-health-green/10">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-medical-blue mb-4">
                    Combate à Desinformação
                  </h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Nossa missão é fornecer informações baseadas em evidências científicas 
                    para que você tome decisões conscientes sobre sua saúde vacinal.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      Conteúdo verificado
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      Linguagem acessível
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-health-green/20 rounded-full">
                    <BookOpen className="h-16 w-16 text-health-green" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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

          {/* Grid de Conteúdo */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((content) => (
              <Card key={content.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative">
                  <img
                    src={content.thumbnail}
                    alt={content.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={`${getTypeColor(content.type)} text-white`}>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(content.type)}
                        {content.type === "video" ? "Vídeo" : "Artigo"}
                      </div>
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      {content.duration}
                    </Badge>
                  </div>
                  {content.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-medical-blue ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-medical-blue transition-colors">
                    {content.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {content.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      {content.views.toLocaleString('pt-BR')} visualizações
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {content.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full group-hover:bg-medical-blue group-hover:text-white transition-colors">
                    {content.type === "video" ? "Assistir" : "Ler"} Conteúdo
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum conteúdo encontrado</h3>
                  <p className="text-muted-foreground">
                    Tente ajustar os termos de busca ou categoria
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Seção de Recursos Adicionais */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-medical-blue">Recursos Adicionais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-health-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-health-green" />
                  </div>
                  <h4 className="font-semibold mb-2">Cartilhas Educativas</h4>
                  <p className="text-sm text-muted-foreground">
                    Material didático para download gratuito
                  </p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-medical-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-medical-blue" />
                  </div>
                  <h4 className="font-semibold mb-2">Webinars</h4>
                  <p className="text-sm text-muted-foreground">
                    Palestras online com especialistas
                  </p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-8 w-8 text-amber-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Cursos Online</h4>
                  <p className="text-sm text-muted-foreground">
                    Capacitação para profissionais de saúde
                  </p>
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

export default Educacao;