"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, User, Stethoscope, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "citizen" as "citizen" | "professional",
    phone: "",
    address: "",
  })
  const [error, setError] = useState("")
  const router = useRouter()
  const { register, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
      })
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta")
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl">Criar Conta</CardTitle>
        <CardDescription>Cadastre-se para começar a gerenciar seu histórico vacinal</CardDescription>
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
              value={formData.userType}
              onValueChange={(value) => handleInputChange("userType", value)}
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

          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone (opcional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Endereço (opcional)</Label>
              <Input
                id="address"
                type="text"
                placeholder="Cidade, Estado"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Criando conta..." : "Criar Conta"}
          </Button>

          {/* Login Link */}
          <div className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Faça login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
