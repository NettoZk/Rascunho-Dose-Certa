import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, FileText, Bell, PlayCircle, Newspaper, Users } from "lucide-react";
import ubsIcon from "@/assets/ubs-icon.jpg";
import vaccineRecord from "@/assets/vaccine-record.jpg";
import healthAlerts from "@/assets/health-alerts.jpg";

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: "Localização de UBSs",
      description: "Encontre as Unidades Básicas de Saúde mais próximas com informações sobre vacinas disponíveis e horários de funcionamento.",
      image: ubsIcon,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: FileText,
      title: "Histórico Vacinal",
      description: "Mantenha seu cartão de vacinação digital sempre atualizado e acessível, com lembretes de doses de reforço.",
      image: vaccineRecord,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Bell,
      title: "Alertas de Saúde",
      description: "Receba notificações importantes sobre campanhas de vacinação, surtos e orientações de saúde pública.",
      image: healthAlerts,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: PlayCircle,
      title: "Vídeos Educativos",
      description: "Acesse conteúdo educativo sobre vacinas, prevenção e cuidados de saúde criado por profissionais qualificados.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Newspaper,
      title: "Central de Notícias",
      description: "Fique informado com as últimas notícias e atualizações do Ministério da Saúde e órgãos oficiais.",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Users,
      title: "Painel Gestor",
      description: "Para profissionais de saúde: gerencie campanhas, monitore indicadores e acompanhe a cobertura vacinal.",
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ];

  return (
    <section id="funcionalidades" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Funcionalidades do <span className="bg-gradient-hero bg-clip-text text-transparent">Dose certa</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Uma plataforma completa para gerenciar sua saúde e manter-se informado sobre vacinação
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border-0 shadow-soft">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  {feature.image && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
                <Button variant="ghost" className={`w-full justify-start ${feature.color} hover:${feature.bgColor}`}>
                  Saiba mais
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="medical" size="xl">
            Explorar todas as funcionalidades
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;