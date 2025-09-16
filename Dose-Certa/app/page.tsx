import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Shield, Users, Bell, MapPin, Newspaper, Heart } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Shield,
      title: "Histórico Vacinal Digital",
      description: "Mantenha seu cartão de vacinação sempre seguro e acessível digitalmente.",
    },
    {
      icon: Bell,
      title: "Alertas Personalizados",
      description: "Receba notificações sobre vacinas pendentes, campanhas e reforços necessários.",
    },
    {
      icon: Users,
      title: "Para Profissionais",
      description: "Gerencie estoque, cadastre campanhas e mantenha informações atualizadas.",
    },
    {
      icon: MapPin,
      title: "Localização de Postos",
      description: "Encontre postos de vacinação próximos com vacinas disponíveis em tempo real.",
    },
    {
      icon: Newspaper,
      title: "Informações Confiáveis",
      description: "Feed de notícias verificadas e alertas sobre epidemias para combater desinformação.",
    },
    {
      icon: Heart,
      title: "Cuidado Preventivo",
      description: "Mantenha sua saúde em dia com lembretes e orientações personalizadas.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 lg:py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20">
          <div className="container max-w-4xl">
            <div className="flex justify-center mb-6">
              <Shield className="h-12 w-12 lg:h-16 lg:w-16 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">Dose Certa</h1>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 lg:mb-8 text-balance">
              Seu sistema de gestão vacinal pessoal
            </p>
            <p className="text-base lg:text-lg text-muted-foreground mb-8 lg:mb-12 max-w-2xl mx-auto text-pretty">
              Gerencie seu histórico vacinal digitalmente, receba alertas personalizados e encontre postos de vacinação
              próximos. Para cidadãos e profissionais de saúde.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center max-w-md mx-auto sm:max-w-none">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/login">Começar Agora</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
                <Link href="#features">Saiba Mais</Link>
              </Button>
            </div>

            <div className="mt-8 p-4 bg-muted/50 rounded-lg max-w-md mx-auto">
              <p className="text-sm font-medium mb-2">🚀 Acesso Rápido - Usuários Demo:</p>
              <div className="text-xs space-y-1">
                <p>
                  <strong>Cidadão:</strong> cidadao@teste.com
                </p>
                <p>
                  <strong>Profissional:</strong> profissional@teste.com
                </p>
                <p className="text-muted-foreground">Qualquer senha funciona</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 lg:py-20 px-4">
          <div className="container">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-balance">
                Funcionalidades Principais
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Tudo que você precisa para manter sua saúde vacinal em dia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center h-full">
                  <CardHeader className="pb-4">
                    <div className="flex justify-center mb-4">
                      <feature.icon className="h-10 w-10 lg:h-12 lg:w-12 text-primary" />
                    </div>
                    <CardTitle className="text-lg lg:text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm lg:text-base text-pretty">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 px-4 bg-muted/20">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-balance">Pronto para começar?</h2>
            <p className="text-base lg:text-lg text-muted-foreground mb-6 lg:mb-8 max-w-2xl mx-auto text-pretty">
              Junte-se a milhares de pessoas que já confiam no Dose Certa para gerenciar sua saúde vacinal.
            </p>
            <Button size="lg" asChild>
              <Link href="/login">Criar Conta Gratuita</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
