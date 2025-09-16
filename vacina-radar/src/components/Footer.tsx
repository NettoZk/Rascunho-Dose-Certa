import { Shield, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/40 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Dose certa
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Plataforma oficial para acompanhamento vacinal e localização de serviços de saúde no Brasil.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-primary">
                <ExternalLink className="w-4 h-4" />
                Gov.br
              </Button>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Funcionalidades</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#ubs" className="text-muted-foreground hover:text-primary transition-colors">Localizar UBSs</a></li>
              <li><a href="#historico" className="text-muted-foreground hover:text-primary transition-colors">Histórico Vacinal</a></li>
              <li><a href="#alertas" className="text-muted-foreground hover:text-primary transition-colors">Alertas de Saúde</a></li>
              <li><a href="#noticias" className="text-muted-foreground hover:text-primary transition-colors">Central de Notícias</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Como usar</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Fale conosco</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contato</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>136 (Disque Saúde)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>suporte@dosecerta.gov.br</span>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Ministério da Saúde<br />Brasília - DF</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Dose certa - Ministério da Saúde. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacidade
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Acessibilidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;