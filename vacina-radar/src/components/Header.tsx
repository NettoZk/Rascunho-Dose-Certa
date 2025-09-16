import { Button } from "@/components/ui/button";
import { Shield, Menu, User, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-card border-b border-border/40 shadow-soft sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Dose certa
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/ubs" className="text-foreground/80 hover:text-primary transition-colors">
            UBSs
          </Link>
          <Link to="/carteira-vacinal" className="text-foreground/80 hover:text-primary transition-colors">
            Carteira
          </Link>
          <Link to="/alertas" className="text-foreground/80 hover:text-primary transition-colors">
            Alertas
          </Link>
          <Link to="/noticias" className="text-foreground/80 hover:text-primary transition-colors">
            Notícias
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/alertas">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs"></span>
            </Button>
          </Link>
          <Link to="/perfil">
            <Button variant="ghost" size="icon">
              <User className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Entrar
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;