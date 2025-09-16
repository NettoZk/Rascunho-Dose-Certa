import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, Calendar, FileText, AlertTriangle, Save } from "lucide-react";

const Perfil = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "João Silva",
    email: "joao@email.com",
    birthDate: "1985-03-15",
    cpf: "123.456.789-00",
    phone: "(11) 99999-9999",
    comorbidities: ["diabetes", "hipertensao"],
    allergies: "Penicilina, Sulfa"
  });

  const comorbidityOptions = [
    { id: "diabetes", label: "Diabetes" },
    { id: "hipertensao", label: "Hipertensão" },
    { id: "asma", label: "Asma" },
    { id: "cardiopatia", label: "Cardiopatia" },
    { id: "imunossupressao", label: "Imunossupressão" },
    { id: "doenca_renal", label: "Doença Renal Crônica" },
    { id: "gestante", label: "Gestante" },
    { id: "idoso", label: "Idoso (60+ anos)" }
  ];

  const handleSave = () => {
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleComorbidityChange = (comorbidityId: string, checked: boolean) => {
    setProfile(prev => ({
      ...prev,
      comorbidities: checked 
        ? [...prev.comorbidities, comorbidityId]
        : prev.comorbidities.filter(id => id !== comorbidityId)
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-medical-blue mb-2">
              Meu Perfil
            </h1>
            <p className="text-muted-foreground">
              Mantenha suas informações atualizadas para recomendações personalizadas
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-medical-blue" />
                  Informações Básicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de nascimento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={profile.birthDate}
                    onChange={(e) => setProfile(prev => ({ ...prev, birthDate: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    value={profile.cpf}
                    onChange={(e) => setProfile(prev => ({ ...prev, cpf: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Informações Médicas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-medical-blue" />
                  Informações Médicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-medical-blue">Comorbidades</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {comorbidityOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={profile.comorbidities.includes(option.id)}
                          onCheckedChange={(checked) => 
                            handleComorbidityChange(option.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={option.id} className="text-sm font-normal">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="allergies" className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Alergias e Contraindicações
                  </Label>
                  <Textarea
                    id="allergies"
                    placeholder="Descreva suas alergias conhecidas (medicamentos, conservantes, etc.)"
                    value={profile.allergies}
                    onChange={(e) => setProfile(prev => ({ ...prev, allergies: e.target.value }))}
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Esta informação é crucial para sua segurança vacinal
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Área de Recomendações */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-health-green" />
                Recomendações Personalizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-health-green/10 to-medical-blue/10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Com base no seu perfil:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Vacina da gripe anual recomendada</li>
                  <li>• Devido ao diabetes: vacina pneumocócica indicada</li>
                  <li>• Próxima dose da hepatite B: prevista para março/2024</li>
                  <li>• Atenção: alergia à penicilina registrada</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Botão Salvar */}
          <div className="mt-8 flex justify-end">
            <Button onClick={handleSave} variant="medical" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Salvar Perfil
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Perfil;