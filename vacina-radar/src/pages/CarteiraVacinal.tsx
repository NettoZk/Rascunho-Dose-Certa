import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Shield, 
  Calendar, 
  MapPin, 
  Download, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  XCircle
} from "lucide-react";

const CarteiraVacinal = () => {
  const [selectedGroup, setSelectedGroup] = useState("adulto");

  const vaccineGroups = {
    adulto: {
      title: "Vacinas do Adulto",
      vaccines: [
        {
          name: "COVID-19",
          status: "complete",
          doses: [
            { date: "2023-05-15", location: "UBS Central", lot: "ABC123", manufacturer: "Pfizer" },
            { date: "2023-08-20", location: "UBS Vila Nova", lot: "DEF456", manufacturer: "Pfizer" },
            { date: "2024-01-10", location: "UBS Centro", lot: "GHI789", manufacturer: "Pfizer" }
          ],
          nextDue: null
        },
        {
          name: "Influenza (Gripe)",
          status: "due",
          doses: [
            { date: "2023-04-20", location: "UBS Central", lot: "FLU123", manufacturer: "Butantan" }
          ],
          nextDue: "2024-04-01"
        },
        {
          name: "Hepatite B",
          status: "pending",
          doses: [
            { date: "2022-01-15", location: "UBS Vila Nova", lot: "HEP456", manufacturer: "GSK" },
            { date: "2022-02-15", location: "UBS Vila Nova", lot: "HEP457", manufacturer: "GSK" }
          ],
          nextDue: "2024-02-15"
        },
        {
          name: "Tétano/Difteria",
          status: "overdue",
          doses: [
            { date: "2019-03-10", location: "UBS Central", lot: "TET789", manufacturer: "Sanofi" }
          ],
          nextDue: "2024-03-10"
        }
      ]
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete": return "bg-health-green text-white";
      case "due": return "bg-amber-500 text-white";
      case "pending": return "bg-medical-blue text-white";
      case "overdue": return "bg-destructive text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete": return <CheckCircle className="h-4 w-4" />;
      case "due": return <Clock className="h-4 w-4" />;
      case "pending": return <AlertCircle className="h-4 w-4" />;
      case "overdue": return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "complete": return "Completa";
      case "due": return "Próxima dose";
      case "pending": return "Pendente";
      case "overdue": return "Atrasada";
      default: return "";
    }
  };

  const calculateProgress = () => {
    const vaccines = vaccineGroups[selectedGroup as keyof typeof vaccineGroups].vaccines;
    const complete = vaccines.filter(v => v.status === "complete").length;
    return (complete / vaccines.length) * 100;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-medical-blue mb-2">
              Carteira de Vacinação Digital
            </h1>
            <p className="text-muted-foreground mb-6">
              Acompanhe seu histórico vacinal e mantenha-se em dia com sua imunização
            </p>

            {/* Progresso Geral */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-health-green" />
                    <span className="font-semibold">Proteção Vacinal</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {Math.round(calculateProgress())}% completo
                    </span>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Exportar PDF
                    </Button>
                  </div>
                </div>
                <Progress value={calculateProgress()} className="h-2" />
              </CardContent>
            </Card>
          </div>

          <Tabs value={selectedGroup} onValueChange={setSelectedGroup}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="infantil">Infantil</TabsTrigger>
              <TabsTrigger value="adolescente">Adolescente</TabsTrigger>
              <TabsTrigger value="adulto">Adulto</TabsTrigger>
              <TabsTrigger value="idoso">Idoso</TabsTrigger>
            </TabsList>

            <TabsContent value="adulto" className="mt-6">
              <div className="space-y-6">
                {vaccineGroups.adulto.vaccines.map((vaccine, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{vaccine.name}</CardTitle>
                        <Badge className={getStatusColor(vaccine.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(vaccine.status)}
                            {getStatusText(vaccine.status)}
                          </div>
                        </Badge>
                      </div>
                      {vaccine.nextDue && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Próxima dose: {new Date(vaccine.nextDue).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-medical-blue">Histórico de Doses</h4>
                        <div className="space-y-3">
                          {vaccine.doses.map((dose, doseIndex) => (
                            <div key={doseIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-health-green rounded-full flex items-center justify-center text-white text-sm font-bold">
                                  {doseIndex + 1}
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {new Date(dose.date).toLocaleDateString('pt-BR')}
                                  </p>
                                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {dose.location}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right text-sm">
                                <p className="font-medium">{dose.manufacturer}</p>
                                <p className="text-muted-foreground">Lote: {dose.lot}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="infantil" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Vacinas Infantis</h3>
                    <p className="text-muted-foreground">
                      Funcionalidade em desenvolvimento
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="adolescente" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Vacinas do Adolescente</h3>
                    <p className="text-muted-foreground">
                      Funcionalidade em desenvolvimento
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="idoso" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Vacinas do Idoso</h3>
                    <p className="text-muted-foreground">
                      Funcionalidade em desenvolvimento
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarteiraVacinal;