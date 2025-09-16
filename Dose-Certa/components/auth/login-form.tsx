"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, User, Stethoscope, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"citizen" | "professional">("citizen")
  const [error, setError] = useState("")
  const router = useRouter()

  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await login(email, password, userType)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login")
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl">Entrar no Dose Certa</CardTitle>
        <CardDescription>Acesse sua conta para gerenciar seu histórico vacinal</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* User Type Selection */}
          <div className="space-y-3">
            <Label>Tipo de Usuário</Label>
            <RadioGroup
              value={userType}
              onValueChange={(value) => setUserType(value as "citizen" | "professional")}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="citizen" id="citizen" />
                <Label htmlFor="citizen" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  Cidadão
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="professional" id="professional" />
                <Label htmlFor="professional" className="flex items-center gap-2 cursor-pointer">
                  <Stethoscope className="h-4 w-4" />
                  Profissional
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>

          {/* Mock Users Info */}
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">Usuários de teste:</p>
            <p>Cidadão: cidadao@teste.com</p>
            <p>Profissional: profissional@teste.com</p>
            <p className="mt-2 text-xs">Qualquer senha funciona (sistema fake)</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
