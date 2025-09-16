"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Shield, AlertCircle, CheckCircle } from "lucide-react"

export interface HealthPost {
  id: string
  name: string
  address: string
  phone: string
  distance: number
  openingHours: {
    weekdays: string
    weekends: string
  }
  availableVaccines: {
    name: string
    stock: number
    status: "available" | "low" | "unavailable"
  }[]
  rating: number
  waitTime: string
  coordinates: {
    lat: number
    lng: number
  }
}

interface HealthPostCardProps {
  post: HealthPost
  compact?: boolean
  onDirections?: (post: HealthPost) => void
  onSchedule?: (post: HealthPost) => void
}

export function HealthPostCard({ post, compact = false, onDirections, onSchedule }: HealthPostCardProps) {
  const availableCount = post.availableVaccines.filter((v) => v.status === "available").length
  const lowStockCount = post.availableVaccines.filter((v) => v.status === "low").length

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className={compact ? "pb-3" : ""}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{post.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-4 w-4" />
              {post.address} • {post.distance}km
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">⭐ {post.rating}</div>
            <div className="text-xs text-muted-foreground">Tempo: {post.waitTime}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Contact Info */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{post.phone}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{post.openingHours.weekdays}</span>
          </div>
        </div>

        {/* Vaccine Availability */}
        {!compact && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="font-medium text-sm">Vacinas Disponíveis</span>
              <Badge variant="secondary" className="text-xs">
                {availableCount} disponíveis
              </Badge>
              {lowStockCount > 0 && (
                <Badge variant="outline" className="text-xs text-yellow-600">
                  {lowStockCount} estoque baixo
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {post.availableVaccines.slice(0, 6).map((vaccine, index) => (
                <div key={index} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                  <div className="flex items-center gap-2">
                    {vaccine.status === "available" ? (
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    ) : vaccine.status === "low" ? (
                      <AlertCircle className="h-3 w-3 text-yellow-600" />
                    ) : (
                      <AlertCircle className="h-3 w-3 text-red-600" />
                    )}
                    <span className="truncate">{vaccine.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {vaccine.stock > 0 ? `${vaccine.stock} doses` : "Indisponível"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={() => onDirections?.(post)}>
            <MapPin className="h-4 w-4 mr-1" />
            Direções
          </Button>
          <Button size="sm" className="flex-1" onClick={() => onSchedule?.(post)}>
            <Clock className="h-4 w-4 mr-1" />
            Agendar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
