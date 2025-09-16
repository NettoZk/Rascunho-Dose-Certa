"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  User,
  Bell,
  Shield,
  Camera,
  Lock,
  Trash2,
  Download,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function ProfileForm() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("personal")
  const [isLoading, setIsLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Personal Information State
  const [personalData, setPersonalData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    cpf: "123.456.789-00", // TODO: Add to user model
    birthDate: "1990-01-01", // TODO: Add to user model
  })

  // Professional Information State (for health professionals)
  const [professionalData, setProfessionalData] = useState({
    license: "CRM-SP 123456", // TODO: Add to user model
    specialty: "Enfermagem", // TODO: Add to user model
    institution: user?.address || "",
    workPhone: user?.phone || "",
  })

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    email: user?.notifications?.email || true,
    sms: user?.notifications?.sms || false,
    push: user?.notifications?.push || true,
    campaigns: true,
    reminders: true,
    news: true,
  })

  // Security Settings State
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  })

  // Privacy Settings State
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "private",
    shareDataForResearch: false,
    allowMarketing: false,
    dataRetention: "5years",
  })

  if (!user) return null

  const handlePersonalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      // TODO: Replace with real API call to update user profile
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setMessage({ type: "success", text: "Informações pessoais atualizadas com sucesso!" })
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao atualizar informações. Tente novamente." })
    }

    setIsLoading(false)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    if (securityData.newPassword !== securityData.confirmPassword) {
      setMessage({ type: "error", text: "As senhas não coincidem." })
      setIsLoading(false)
      return
    }

    if (securityData.newPassword.length < 6) {
      setMessage({ type: "error", text: "A nova senha deve ter pelo menos 6 caracteres." })
      setIsLoading(false)
      return
    }

    try {
      // TODO: Replace with real API call to change password
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setMessage({ type: "success", text: "Senha alterada com sucesso!" })
      setSecurityData({ ...securityData, currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao alterar senha. Verifique sua senha atual." })
    }

    setIsLoading(false)
  }

  const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: keyof typeof privacySettings, value: any) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleDeleteAccount = async () => {
    if (window.confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
      setIsLoading(true)
      try {
        // TODO: Replace with real API call to delete account
        await new Promise((resolve) => setTimeout(resolve, 2000))
        logout()
      } catch (error) {
        setMessage({ type: "error", text: "Erro ao excluir conta. Tente novamente." })
      }
      setIsLoading(false)
    }
  }

  const handleExportData = async () => {
    setIsLoading(true)
    try {
      // TODO: Replace with real API call to export user data
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setMessage({ type: "success", text: "Seus dados foram exportados e o download iniciará em breve." })
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao exportar dados. Tente novamente." })
    }
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      {message && (
        <Alert variant={message.type === "error" ? "destructive" : "default"}>
          {message.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Pessoal</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="privacy">Privacidade</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          {/* Profile Picture */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Foto do Perfil
              </CardTitle>
              <CardDescription>Atualize sua foto de perfil</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/abstract-profile.png" />
                  <AvatarFallback className="text-lg">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline">
                    <Camera className="h-4 w-4 mr-2" />
                    Alterar Foto
                  </Button>
                  <Button variant="ghost" size="sm">
                    Remover Foto
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG ou GIF. Máximo 2MB.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
              <CardDescription>
                Mantenha seus dados atualizados para receber alertas precisos
                <Badge variant="outline" className="ml-2">
                  {user.type === "citizen" ? "Cidadão" : "Profissional de Saúde"}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePersonalSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={personalData.name}
                      onChange={(e) => setPersonalData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalData.email}
                      onChange={(e) => setPersonalData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      value={personalData.cpf}
                      onChange={(e) => setPersonalData((prev) => ({ ...prev, cpf: e.target.value }))}
                      placeholder="000.000.000-00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Data de Nascimento</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={personalData.birthDate}
                      onChange={(e) => setPersonalData((prev) => ({ ...prev, birthDate: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={personalData.phone}
                      onChange={(e) => setPersonalData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      value={personalData.address}
                      onChange={(e) => setPersonalData((prev) => ({ ...prev, address: e.target.value }))}
                      placeholder="Cidade, Estado"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Professional Information (only for professionals) */}
          {user.type === "professional" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Informações Profissionais
                </CardTitle>
                <CardDescription>Dados específicos para profissionais de saúde</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="license">Registro Profissional</Label>
                    <Input
                      id="license"
                      value={professionalData.license}
                      onChange={(e) => setProfessionalData((prev) => ({ ...prev, license: e.target.value }))}
                      placeholder="CRM, COREN, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidade</Label>
                    <Input
                      id="specialty"
                      value={professionalData.specialty}
                      onChange={(e) => setProfessionalData((prev) => ({ ...prev, specialty: e.target.value }))}
                      placeholder="Enfermagem, Medicina, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="institution">Instituição</Label>
                    <Input
                      id="institution"
                      value={professionalData.institution}
                      onChange={(e) => setProfessionalData((prev) => ({ ...prev, institution: e.target.value }))}
                      placeholder="Hospital, UBS, Clínica"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="workPhone">Telefone Profissional</Label>
                    <Input
                      id="workPhone"
                      value={professionalData.workPhone}
                      onChange={(e) => setProfessionalData((prev) => ({ ...prev, workPhone: e.target.value }))}
                      placeholder="(11) 3333-3333"
                    />
                  </div>
                </div>

                <Button className="mt-4" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar Informações Profissionais"}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Preferências de Notificação
              </CardTitle>
              <CardDescription>Configure como você deseja receber alertas e informações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">Receba lembretes e alertas por email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notificações por SMS</Label>
                    <p className="text-sm text-muted-foreground">Receba alertas urgentes por mensagem de texto</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notificações Push</Label>
                    <p className="text-sm text-muted-foreground">Receba notificações no navegador</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-4">Tipos de Notificação</h4>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Campanhas de Vacinação</Label>
                        <p className="text-sm text-muted-foreground">Alertas sobre novas campanhas e oportunidades</p>
                      </div>
                      <Switch
                        checked={notifications.campaigns}
                        onCheckedChange={(checked) => handleNotificationChange("campaigns", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Lembretes de Vacinas</Label>
                        <p className="text-sm text-muted-foreground">Lembretes sobre vacinas pendentes e reforços</p>
                      </div>
                      <Switch
                        checked={notifications.reminders}
                        onCheckedChange={(checked) => handleNotificationChange("reminders", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Notícias de Saúde</Label>
                        <p className="text-sm text-muted-foreground">
                          Informações sobre surtos, epidemias e saúde pública
                        </p>
                      </div>
                      <Switch
                        checked={notifications.news}
                        onCheckedChange={(checked) => handleNotificationChange("news", checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar Preferências"}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Password Change */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Alterar Senha
              </CardTitle>
              <CardDescription>Mantenha sua conta segura com uma senha forte</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Senha Atual</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={securityData.currentPassword}
                      onChange={(e) => setSecurityData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={securityData.newPassword}
                        onChange={(e) => setSecurityData((prev) => ({ ...prev, newPassword: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Alterando..." : "Alterar Senha"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Autenticação de Dois Fatores
              </CardTitle>
              <CardDescription>Adicione uma camada extra de segurança à sua conta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Ativar 2FA</Label>
                  <p className="text-sm text-muted-foreground">
                    Use um aplicativo autenticador para gerar códigos de segurança
                  </p>
                </div>
                <Switch
                  checked={securityData.twoFactorEnabled}
                  onCheckedChange={(checked) => setSecurityData((prev) => ({ ...prev, twoFactorEnabled: checked }))}
                />
              </div>

              {securityData.twoFactorEnabled && (
                <div className="mt-4 p-4 border rounded-lg bg-muted/20">
                  <p className="text-sm text-muted-foreground mb-2">
                    Escaneie o código QR com seu aplicativo autenticador:
                  </p>
                  <div className="w-32 h-32 bg-white border rounded-lg flex items-center justify-center">
                    <p className="text-xs text-muted-foreground">QR Code</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    Não consigo escanear
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configurações de Privacidade
              </CardTitle>
              <CardDescription>Controle como seus dados são utilizados e compartilhados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Compartilhar dados para pesquisa</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir uso anônimo dos dados para pesquisas em saúde pública
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.shareDataForResearch}
                    onCheckedChange={(checked) => handlePrivacyChange("shareDataForResearch", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Permitir comunicações de marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber informações sobre novos recursos e promoções
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.allowMarketing}
                    onCheckedChange={(checked) => handlePrivacyChange("allowMarketing", checked)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataRetention">Retenção de Dados</Label>
                <select
                  id="dataRetention"
                  className="w-full p-2 border rounded-md"
                  value={privacySettings.dataRetention}
                  onChange={(e) => handlePrivacyChange("dataRetention", e.target.value)}
                >
                  <option value="1year">1 ano após inatividade</option>
                  <option value="3years">3 anos após inatividade</option>
                  <option value="5years">5 anos após inatividade</option>
                  <option value="indefinite">Manter indefinidamente</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  Tempo que seus dados serão mantidos após inatividade da conta
                </p>
              </div>

              <Button disabled={isLoading}>{isLoading ? "Salvando..." : "Salvar Configurações"}</Button>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Gerenciamento de Dados
              </CardTitle>
              <CardDescription>Exporte ou exclua seus dados pessoais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base">Exportar meus dados</Label>
                  <p className="text-sm text-muted-foreground">
                    Baixe uma cópia de todos os seus dados em formato JSON
                  </p>
                </div>
                <Button variant="outline" onClick={handleExportData} disabled={isLoading}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg border-red-200">
                <div className="space-y-0.5">
                  <Label className="text-base text-red-600">Excluir minha conta</Label>
                  <p className="text-sm text-muted-foreground">
                    Remover permanentemente sua conta e todos os dados associados
                  </p>
                </div>
                <Button variant="destructive" onClick={handleDeleteAccount} disabled={isLoading}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir Conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
