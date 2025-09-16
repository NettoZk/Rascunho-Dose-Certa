"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Package, Plus, Minus, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface VaccineStock {
  id: string
  name: string
  currentStock: number
  minStock: number
  maxStock: number
  expiryDate: string
  batchNumber: string
  status: "available" | "low" | "expired" | "unavailable"
  lastUpdated: string
}

const mockVaccineStock: VaccineStock[] = [
  {
    id: "stock-1",
    name: "COVID-19 (Pfizer-BioNTech)",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    expiryDate: "2024-08-15",
    batchNumber: "PF2024-ABC123",
    status: "available",
    lastUpdated: "2024-03-20T10:30:00Z",
  },
  {
    id: "stock-2",
    name: "Influenza 2024 (Trivalente)",
    currentStock: 12,
    minStock: 15,
    maxStock: 80,
    expiryDate: "2024-12-31",
    batchNumber: "FLU2024-XYZ789",
    status: "low",
    lastUpdated: "2024-03-19T14:15:00Z",
  },
  {
    id: "stock-3",
    name: "Hepatite B (Recombinante)",
    currentStock: 28,
    minStock: 10,
    maxStock: 60,
    expiryDate: "2025-01-20",
    batchNumber: "HEP2024-DEF456",
    status: "available",
    lastUpdated: "2024-03-20T09:45:00Z",
  },
  {
    id: "stock-4",
    name: "Tétano e Difteria (dT)",
    currentStock: 0,
    minStock: 10,
    maxStock: 50,
    expiryDate: "2024-06-30",
    batchNumber: "TET2024-GHI789",
    status: "unavailable",
    lastUpdated: "2024-03-18T16:20:00Z",
  },
]

interface StockManagementProps {
  postId?: string
  postName?: string
}

export function StockManagement({ postId = "post-1", postName = "UBS Vila Madalena" }: StockManagementProps) {
  const [vaccineStock, setVaccineStock] = useState<VaccineStock[]>(mockVaccineStock)
  const [selectedVaccine, setSelectedVaccine] = useState<string>("")
  const [stockAdjustment, setStockAdjustment] = useState<number>(0)
  const [adjustmentReason, setAdjustmentReason] = useState<string>("")

  const handleStockUpdate = (vaccineId: string, adjustment: number, reason: string) => {
    setVaccineStock((prev) =>
      prev.map((vaccine) => {
        if (vaccine.id === vaccineId) {
          const newStock = Math.max(0, vaccine.currentStock + adjustment)
          let newStatus: VaccineStock["status"] = "available"

          if (newStock === 0) {
            newStatus = "unavailable"
          } else if (newStock <= vaccine.minStock) {
            newStatus = "low"
          }

          // TODO: Send update to API
          console.log("[v0] Updating stock for", vaccine.name, ":", {
            oldStock: vaccine.currentStock,
            newStock,
            adjustment,
            reason,
            postId,
            timestamp: new Date().toISOString(),
          })

          return {
            ...vaccine,
            currentStock: newStock,
            status: newStatus,
            lastUpdated: new Date().toISOString(),
          }
        }
        return vaccine
      }),
    )

    // Reset form
    setSelectedVaccine("")
    setStockAdjustment(0)
    setAdjustmentReason("")
  }

  const getStatusIcon = (status: VaccineStock["status"]) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "low":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "expired":
        return <Clock className="h-4 w-4 text-red-600" />
      case "unavailable":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusColor = (status: VaccineStock["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "low":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "unavailable":
        return "bg-gray-100 text-gray-800"
    }
  }

  const lowStockCount = vaccineStock.filter((v) => v.status === "low").length
  const unavailableCount = vaccineStock.filter((v) => v.status === "unavailable").length
  const totalVaccines = vaccineStock.reduce((sum, v) => sum + v.currentStock, 0)

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Doses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVaccines}</div>
            <p className="text-xs text-muted-foreground">Em estoque</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStockCount}</div>
            <p className="text-xs text-muted-foreground">Vacinas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Indisponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{unavailableCount}</div>
            <p className="text-xs text-muted-foreground">Vacinas</p>
          </CardContent>
        </Card>
      </div>

      {/* Stock Update Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Atualizar Estoque - {postName}
          </CardTitle>
          <CardDescription>Registre entrada ou saída de vacinas do estoque</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vaccine-select">Vacina</Label>
              <Select value={selectedVaccine} onValueChange={setSelectedVaccine}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma vacina" />
                </SelectTrigger>
                <SelectContent>
                  {vaccineStock.map((vaccine) => (
                    <SelectItem key={vaccine.id} value={vaccine.id}>
                      {vaccine.name} (Atual: {vaccine.currentStock})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock-adjustment">Ajuste de Estoque</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setStockAdjustment((prev) => prev - 1)}
                  disabled={!selectedVaccine}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="stock-adjustment"
                  type="number"
                  value={stockAdjustment}
                  onChange={(e) => setStockAdjustment(Number.parseInt(e.target.value) || 0)}
                  className="text-center"
                  placeholder="0"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setStockAdjustment((prev) => prev + 1)}
                  disabled={!selectedVaccine}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Use números positivos para entrada e negativos para saída</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adjustment-reason">Motivo do Ajuste</Label>
            <Textarea
              id="adjustment-reason"
              value={adjustmentReason}
              onChange={(e) => setAdjustmentReason(e.target.value)}
              placeholder="Ex: Recebimento de novo lote, aplicação de doses, vencimento..."
              rows={2}
            />
          </div>

          <Button
            onClick={() => {
              if (selectedVaccine && adjustmentReason.trim()) {
                handleStockUpdate(selectedVaccine, stockAdjustment, adjustmentReason)
              }
            }}
            disabled={!selectedVaccine || !adjustmentReason.trim() || stockAdjustment === 0}
            className="w-full"
          >
            Atualizar Estoque
          </Button>
        </CardContent>
      </Card>

      {/* Current Stock List */}
      <Card>
        <CardHeader>
          <CardTitle>Estoque Atual</CardTitle>
          <CardDescription>Situação atual do estoque de vacinas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vaccineStock.map((vaccine) => (
              <div key={vaccine.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(vaccine.status)}
                    <h4 className="font-medium">{vaccine.name}</h4>
                    <Badge className={getStatusColor(vaccine.status)}>
                      {vaccine.status === "available" && "Disponível"}
                      {vaccine.status === "low" && "Estoque Baixo"}
                      {vaccine.status === "expired" && "Vencido"}
                      {vaccine.status === "unavailable" && "Indisponível"}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>
                      Lote: {vaccine.batchNumber} • Validade: {new Date(vaccine.expiryDate).toLocaleDateString("pt-BR")}
                    </div>
                    <div>Última atualização: {new Date(vaccine.lastUpdated).toLocaleString("pt-BR")}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{vaccine.currentStock}</div>
                  <div className="text-sm text-muted-foreground">
                    Min: {vaccine.minStock} • Max: {vaccine.maxStock}
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${
                        vaccine.currentStock <= vaccine.minStock
                          ? "bg-red-500"
                          : vaccine.currentStock <= vaccine.minStock * 1.5
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min(100, (vaccine.currentStock / vaccine.maxStock) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
