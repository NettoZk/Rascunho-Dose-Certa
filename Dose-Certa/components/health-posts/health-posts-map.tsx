"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Zap } from "lucide-react"
import type { HealthPost } from "./health-post-card"

interface HealthPostsMapProps {
  posts: HealthPost[]
  selectedPost?: HealthPost | null
  onPostSelect?: (post: HealthPost) => void
}

export function HealthPostsMap({ posts, selectedPost, onPostSelect }: HealthPostsMapProps) {
  const [mapView, setMapView] = useState<"map" | "satellite">("map")

  return (
    <Card className="h-96">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Mapa dos Postos</CardTitle>
            <CardDescription>{posts.length} postos encontrados</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant={mapView === "map" ? "default" : "outline"} size="sm" onClick={() => setMapView("map")}>
              Mapa
            </Button>
            <Button
              variant={mapView === "satellite" ? "default" : "outline"}
              size="sm"
              onClick={() => setMapView("satellite")}
            >
              Satélite
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Mock Map Interface */}
        <div className="relative h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-dashed border-muted-foreground/20 overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-blue-100/50" />

          {/* Mock Streets */}
          <div className="absolute top-16 left-0 right-0 h-1 bg-gray-300" />
          <div className="absolute top-32 left-0 right-0 h-1 bg-gray-300" />
          <div className="absolute top-0 bottom-0 left-20 w-1 bg-gray-300" />
          <div className="absolute top-0 bottom-0 left-40 w-1 bg-gray-300" />
          <div className="absolute top-0 bottom-0 right-20 w-1 bg-gray-300" />

          {/* User Location */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg" />
              <div className="absolute -inset-2 bg-blue-600/20 rounded-full animate-pulse" />
            </div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <Badge variant="secondary" className="text-xs">
                <Navigation className="h-3 w-3 mr-1" />
                Você está aqui
              </Badge>
            </div>
          </div>

          {/* Health Posts Markers */}
          {posts.slice(0, 5).map((post, index) => {
            const positions = [
              { top: "25%", left: "30%" },
              { top: "40%", left: "70%" },
              { top: "70%", left: "25%" },
              { top: "60%", left: "80%" },
              { top: "30%", left: "85%" },
            ]

            const position = positions[index] || positions[0]
            const isSelected = selectedPost?.id === post.id

            return (
              <div
                key={post.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ top: position.top, left: position.left }}
                onClick={() => onPostSelect?.(post)}
              >
                <div className={`relative group ${isSelected ? "z-10" : ""}`}>
                  <div
                    className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                      isSelected ? "bg-red-600 scale-125" : "bg-green-600 hover:bg-green-700"
                    } transition-all`}
                  >
                    <MapPin className="h-3 w-3 text-white" />
                  </div>

                  {/* Tooltip */}
                  <div
                    className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${
                      isSelected ? "block" : "hidden group-hover:block"
                    }`}
                  >
                    <div className="bg-white p-2 rounded-lg shadow-lg border text-xs whitespace-nowrap">
                      <div className="font-medium">{post.name}</div>
                      <div className="text-muted-foreground">
                        {post.distance}km • {post.waitTime}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Zap className="h-3 w-3 text-green-600" />
                        <span className="text-green-600">
                          {post.availableVaccines.filter((v) => v.status === "available").length} vacinas
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
              +
            </Button>
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
              -
            </Button>
          </div>

          {/* Scale */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-white px-2 py-1 rounded text-xs border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-black" />
                <span>1km</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
