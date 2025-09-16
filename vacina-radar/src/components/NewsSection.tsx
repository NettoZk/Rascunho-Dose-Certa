import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Thermometer, Activity, Heart } from "lucide-react";

const NewsSection = () => {
  const news = [
    {
      category: "Vacinação",
      title: "Nova campanha de vacinação contra a gripe começou em todo o país",
      description: "Ministério da Saúde inicia distribuição de 80 milhões de doses da vacina influenza para grupos prioritários.",
      date: "2024-03-15",
      urgent: true,
      icon: Thermometer
    },
    {
      category: "Prevenção",
      title: "Orientações para prevenção de doenças respiratórias no outono",
      description: "Especialistas recomendam medidas preventivas para reduzir casos de gripe e resfriados.",
      date: "2024-03-12",
      urgent: false,
      icon: Activity
    },
    {
      category: "Saúde Pública",
      title: "Programa Nacional de Imunizações completa 50 anos",
      description: "PNI celebra cinco décadas de contribuições para a saúde pública brasileira com redução significativa de doenças.",
      date: "2024-03-10",
      urgent: false,
      icon: Heart
    }
  ];

  return (
    <section id="noticias" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Central de <span className="bg-gradient-hero bg-clip-text text-transparent">Notícias</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mantenha-se informado com as últimas atualizações de saúde pública do Brasil
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 border-0 shadow-soft">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge 
                      variant={item.urgent ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {item.category}
                    </Badge>
                  </div>
                  {item.urgent && (
                    <Badge variant="destructive" className="animate-pulse">
                      URGENTE
                    </Badge>
                  )}
                </div>
                
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {item.description}
                </CardDescription>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(item.date).toLocaleDateString('pt-BR')}
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow">
                    Ler mais
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver todas as notícias
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;