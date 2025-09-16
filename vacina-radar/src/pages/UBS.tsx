import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Search, 
  Navigation, 
  Shield,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

const UBS = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const ubsList = [
    {
      id: 1,
      name: "UBS Central",
      address: "Rua das Flores, 123 - Centro",
      phone: "(11) 3333-1111",
      hours: "07:00 - 17:00",
      distance: "0.8 km",
      capacity: "normal",
      vaccines: [
        { name: "COVID-19", available: true, stock: "alta" },
        { name: "Influenza", available: true, stock: "média" },
        { name: "Hepatite B", available: false, stock: "baixa" },
        { name: "Tétano", available: true, stock: "alta" }
      ]
    },
    {
      id: 2,
      name: "UBS Vila Nova",
      address: "Av. Santos Dumont, 456 - Vila Nova",
      phone: "(11) 3333-2222",
      hours: "07:00 - 19:00",
      distance: "1.2 km",
      capacity: "lotada",
      vaccines: [
        { name: "COVID-19", available: true, stock: "média" },
        { name: "Influenza", available: true, stock: "alta" },
        { name: "Hepatite B", available: true, stock: "média" },
        { name: "Tétano", available: true, stock: "baixa" }
      ]
    },
    {
      id: 3,
      name: "UBS São José",
      address: "Rua São José, 789 - São José",
      phone: "(11) 3333-3333",
      hours: "08:00 - 16:00",
      distance: "2.1 km",
      capacity: "tranquila",
      vaccines: [
        { name: "COVID-19", available: true, stock: "alta" },
        { name: "Influenza", available: false, stock: "baixa" },
        { name: "Hepatite B", available: true, stock: "alta" },
        { name: "Tétano", available: true, stock: "média" }
      ]
    }
  ];

  const getCapacityColor = (capacity: string) => {
    switch (capacity) {
      case "tranquila": return "text-health-green";
      case "normal": return "text-amber-600";
      case "lotada": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getCapacityIcon = (capacity: string) => {
    switch (capacity) {
      case "tranquila": return <CheckCircle className="h-4 w-4" />;
      case "normal": return <AlertCircle className="h-4 w-4" />;
      case "lotada": return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStockColor = (stock: string) => {
    switch (stock) {
      case "alta": return "bg-health-green";
      case "média": return "bg-amber-500";
      case "baixa": return "bg-destructive";
      default: return "bg-gray-500";
    }
  };

  const filteredUbs = ubsList.filter(ubs =>
    ubs.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ubs.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-medical-blue mb-2">
              Localizador de UBS
            </h1>
            <p className="text-muted-foreground mb-6">
              Encontre unidades básicas de saúde próximas e verifique a disponibilidade de vacinas
            </p>

            {/* Barra de Pesquisa */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou endereço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Mapa Placeholder */}
          <Card className="mb-8">
            <CardContent className="p-0">
              <div className="h-64 bg-gradient-to-br from-medical-blue/10 to-health-green/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-medical-blue mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Mapa Interativo</h3>
                  <p className="text-muted-foreground">
                    Visualização das UBS será implementada com React Leaflet
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de UBS */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-medical-blue">
              UBS Próximas ({filteredUbs.length})
            </h2>

            {filteredUbs.map((ubs) => (
              <Card key={ubs.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{ubs.name}</CardTitle>
                      <div className="space-y-1 mt-2">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {ubs.address} • {ubs.distance}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {ubs.phone}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {ubs.hours}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className={`flex items-center gap-1 ${getCapacityColor(ubs.capacity)}`}>
                        <Users className="h-4 w-4" />
                        {getCapacityIcon(ubs.capacity)}
                        <span className="text-sm font-medium capitalize">{ubs.capacity}</span>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Navigation className="h-4 w-4" />
                        Rotas
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-medical-blue flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Vacinas Disponíveis
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ubs.vaccines.map((vaccine, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${vaccine.available ? 'bg-health-green' : 'bg-destructive'}`} />
                            <span className="font-medium">{vaccine.name}</span>
                          </div>
                          {vaccine.available ? (
                            <Badge className={`${getStockColor(vaccine.stock)} text-white`}>
                              {vaccine.stock}
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Indisponível</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUbs.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma UBS encontrada</h3>
                  <p className="text-muted-foreground">
                    Tente ajustar os termos de busca
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UBS;