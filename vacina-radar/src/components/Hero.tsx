import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ShieldCheck, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Sua saúde em{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  primeira linha
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Encontre UBSs próximas, acompanhe seu histórico vacinal e receba alertas 
                importantes sobre sua saúde. Tudo em um só lugar, de forma simples e segura.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-soft">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Encontre UBSs</p>
                  <p className="text-xs text-muted-foreground">Próximas a você</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-soft">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Histórico Vacinal</p>
                  <p className="text-xs text-muted-foreground">Sempre atualizado</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-soft">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Alertas de Saúde</p>
                  <p className="text-xs text-muted-foreground">Em tempo real</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="flex-1">
                Começar agora
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="xl" className="flex-1">
                Saiba mais
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <img 
                src={heroImage} 
                alt="Profissionais de saúde e famílias"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating stats */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-strong border">
              <div className="text-2xl font-bold text-primary">50k+</div>
              <div className="text-sm text-muted-foreground">Usuários ativos</div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-card p-6 rounded-xl shadow-strong border">
              <div className="text-2xl font-bold text-secondary">200+</div>
              <div className="text-sm text-muted-foreground">UBSs cadastradas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;