import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Bell, 
  Clock, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Settings,
  Calendar,
  MapPin,
  Info
} from "lucide-react";

const Alertas = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    vaccineReminders: true,
    campaignAlerts: true,
    allergyWarnings: true,
    locationAlerts: false
  });

  const alerts = [
    {
      id: 1,
      type: "reminder",
      title: "Vacina da Gripe em Atraso",
      message: "Sua vacina contra influenza está vencida desde 01/04/2024. Agende sua dose na UBS mais próxima.",
      priority: "high",
      date: "2024-02-15T10:30:00",
      action: "Agendar",
      read: false
    },
    {
      id: 2,
      type: "campaign",
      title: "Nova Campanha: COVID-19 Bivalente",
      message: "Campanha de reforço para adultos acima de 60 anos iniciou. Vacinas disponíveis em todas as UBS.",
      priority: "medium",
      date: "2024-02-14T14:20:00",
      action: "Ver UBS",
      read: false
    },
    {
      id: 3,
      type: "allergy",
      title: "Atenção: Alergia Registrada",
      message: "Você possui alergia à penicilina. Informe seu médico antes de qualquer procedimento.",
      priority: "high",
      date: "2024-02-13T09:15:00",
      action: "Ver perfil",
      read: true
    },
    {
      id: 4,
      type: "location",
      title: "UBS Central com Estoque Baixo",
      message: "A UBS Central está com baixo estoque de vacina Hepatite B. Considere outras unidades próximas.",
      priority: "low",
      date: "2024-02-12T16:45:00",
      action: "Ver outras UBS",
      read: true
    },
    {
      id: 5,
      type: "info",
      title: "Carteira Vacinal Atualizada",
      message: "Sua dose de COVID-19 foi registrada com sucesso em sua carteira digital.",
      priority: "low",
      date: "2024-02-10T11:00:00",
      action: "Ver carteira",
      read: true
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive";
      case "medium": return "bg-amber-500";
      case "low": return "bg-medical-blue";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "reminder": return <Clock className="h-5 w-5" />;
      case "campaign": return <Bell className="h-5 w-5" />;
      case "allergy": return <AlertTriangle className="h-5 w-5" />;
      case "location": return <MapPin className="h-5 w-5" />;
      case "info": return <Info className="h-5 w-5" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "reminder": return "text-amber-600";
      case "campaign": return "text-health-green";
      case "allergy": return "text-destructive";
      case "location": return "text-medical-blue";
      case "info": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Configuração atualizada",
      description: "Suas preferências de notificação foram salvas.",
    });
  };

  const unreadCount = alerts.filter(alert => !alert.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-medical-blue mb-2">
                  Central de Alertas
                </h1>
                <p className="text-muted-foreground">
                  Acompanhe lembretes importantes sobre sua saúde vacinal
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-medical-blue" />
                <Badge variant="secondary">
                  {unreadCount} novos
                </Badge>
              </div>
            </div>
          </div>

          <Tabs defaultValue="alerts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="alerts">Meus Alertas</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>

            <TabsContent value="alerts" className="space-y-4">
              {alerts.map((alert) => (
                <Card key={alert.id} className={`${!alert.read ? 'ring-2 ring-medical-blue/20' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${getTypeColor(alert.type)} bg-current/10`}>
                        {getTypeIcon(alert.type)}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{alert.title}</h3>
                            <p className="text-muted-foreground text-sm flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(alert.date).toLocaleString('pt-BR')}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`${getPriorityColor(alert.priority)} text-white`}>
                              {alert.priority === 'high' ? 'Alta' : 
                               alert.priority === 'medium' ? 'Média' : 'Baixa'}
                            </Badge>
                            {!alert.read && (
                              <div className="w-2 h-2 bg-medical-blue rounded-full" />
                            )}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground">
                          {alert.message}
                        </p>
                        
                        <div className="flex items-center justify-between pt-2">
                          <Button variant="outline" size="sm">
                            {alert.action}
                          </Button>
                          {!alert.read && (
                            <Button variant="ghost" size="sm" className="text-medical-blue">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Marcar como lida
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {alerts.length === 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Nenhum alerta pendente</h3>
                      <p className="text-muted-foreground">
                        Você está em dia! Quando houver novos alertas, eles aparecerão aqui.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-medical-blue" />
                    Preferências de Notificação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="vaccine-reminders">Lembretes de Vacinas</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba alertas sobre vacinas próximas do vencimento
                      </p>
                    </div>
                    <Switch
                      id="vaccine-reminders"
                      checked={notifications.vaccineReminders}
                      onCheckedChange={() => handleNotificationToggle('vaccineReminders')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="campaign-alerts">Alertas de Campanhas</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificações sobre novas campanhas de vacinação
                      </p>
                    </div>
                    <Switch
                      id="campaign-alerts"
                      checked={notifications.campaignAlerts}
                      onCheckedChange={() => handleNotificationToggle('campaignAlerts')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="allergy-warnings">Avisos de Alergia</Label>
                      <p className="text-sm text-muted-foreground">
                        Alertas importantes sobre contraindicações
                      </p>
                    </div>
                    <Switch
                      id="allergy-warnings"
                      checked={notifications.allergyWarnings}
                      onCheckedChange={() => handleNotificationToggle('allergyWarnings')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="location-alerts">Alertas por Localização</Label>
                      <p className="text-sm text-muted-foreground">
                        Informações sobre UBS próximas e disponibilidade
                      </p>
                    </div>
                    <Switch
                      id="location-alerts"
                      checked={notifications.locationAlerts}
                      onCheckedChange={() => handleNotificationToggle('locationAlerts')}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-medical-blue">Como Funcionam os Alertas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-amber-600" />
                      <div>
                        <p className="font-medium">Lembretes de Vacinas</p>
                        <p className="text-sm text-muted-foreground">
                          Baseados no seu perfil e histórico vacinal
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <div>
                        <p className="font-medium">Avisos de Segurança</p>
                        <p className="text-sm text-muted-foreground">
                          Alertas sobre alergias e contraindicações
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-health-green" />
                      <div>
                        <p className="font-medium">Campanhas Públicas</p>
                        <p className="text-sm text-muted-foreground">
                          Informações sobre novas campanhas de imunização
                        </p>
                      </div>
                    </div>
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

export default Alertas;