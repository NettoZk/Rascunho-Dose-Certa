"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin } from "lucide-react"
import { HealthPostCard, type HealthPost } from "./health-post-card"
import { HealthPostsMap } from "./health-posts-map"

// Mock data for health posts
const mockHealthPosts: HealthPost[] = [
  {
    id: "post-1",
    name: "UBS Vila Madalena",
    address: "Rua Harmonia, 123 - Vila Madalena",
    phone: "(11) 3021-1234",
    distance: 0.8,
    openingHours: {
      weekdays: "7h às 17h",
      weekends: "8h às 12h",
    },
    availableVaccines: [
      { name: "COVID-19 (Pfizer)", stock: 45, status: "available" },
      { name: "Influenza 2024", stock: 12, status: "low" },
      { name: "Hepatite B", stock: 28, status: "available" },
      { name: "Tétano/Difteria", stock: 35, status: "available" },
      { name: "Febre Amarela", stock: 8, status: "low" },
      { name: "HPV", stock: 22, status: "available" },
    ],
    rating: 4.8,
    waitTime: "15 min",
    coordinates: { lat: -23.5505, lng: -46.6333 },
  },
  {
    id: "post-2",
    name: "UBS Pinheiros",
    address: "Av. Brigadeiro Faria Lima, 456 - Pinheiros",
    phone: "(11) 3021-5678",
    distance: 1.2,
    openingHours: {
      weekdays: "6h às 18h",
      weekends: "Fechado",
    },
    availableVaccines: [
      { name: "COVID-19 (Pfizer)", stock: 67, status: "available" },
      { name: "COVID-19 (AstraZeneca)", stock: 23, status: "available" },
      { name: "Influenza 2024", stock: 0, status: "unavailable" },
      { name: "Hepatite B", stock: 41, status: "available" },
      { name: "Tétano/Difteria", stock: 19, status: "available" },
      { name: "Meningite ACWY", stock: 15, status: "available" },
    ],
    rating: 4.6,
    waitTime: "25 min",
    coordinates: { lat: -23.5629, lng: -46.6544 },
  },
  {
    id: "post-3",
    name: "Centro de Imunização Itaim",
    address: "Rua João Cachoeira, 789 - Itaim Bibi",
    phone: "(11) 3021-9012",
    distance: 2.1,
    openingHours: {
      weekdays: "8h às 16h",
      weekends: "8h às 14h",
    },
    availableVaccines: [
      { name: "COVID-19 (Pfizer)", stock: 89, status: "available" },
      { name: "Influenza 2024", stock: 34, status: "available" },
      { name: "Hepatite A", stock: 26, status: "available" },
      { name: "Hepatite B", stock: 31, status: "available" },
      { name: "Febre Amarela", stock: 18, status: "available" },
      { name: "HPV", stock: 5, status: "low" },
    ],
    rating: 4.9,
    waitTime: "10 min",
    coordinates: { lat: -23.5751, lng: -46.6742 },
  },
  {
    id: "post-4",
    name: "Hospital das Clínicas - Posto Avançado",
    address: "Av. Dr. Enéas de Carvalho Aguiar, 255",
    phone: "(11) 2661-0000",
    distance: 3.5,
    openingHours: {
      weekdays: "24h",
      weekends: "24h",
    },
    availableVaccines: [
      { name: "COVID-19 (Pfizer)", stock: 156, status: "available" },
      { name: "COVID-19 (AstraZeneca)", stock: 78, status: "available" },
      { name: "Influenza 2024", stock: 92, status: "available" },
      { name: "Hepatite A", stock: 45, status: "available" },
      { name: "Hepatite B", stock: 67, status: "available" },
      { name: "Tétano/Difteria", stock: 83, status: "available" },
      { name: "Febre Amarela", stock: 29, status: "available" },
      { name: "Meningite ACWY", stock: 34, status: "available" },
    ],
    rating: 4.7,
    waitTime: "35 min",
    coordinates: { lat: -23.5558, lng: -46.6696 },
  },
  {
    id: "post-5",
    name: "UBS Jardim Paulista",
    address: "Rua Augusta, 1011 - Jardim Paulista",
    phone: "(11) 3021-3456",
    distance: 1.8,
    openingHours: {
      weekdays: "7h às 17h",
      weekends: "8h às 12h",
    },
    availableVaccines: [
      { name: "COVID-19 (Pfizer)", stock: 23, status: "available" },
      { name: "Influenza 2024", stock: 3, status: "low" },
      { name: "Hepatite B", stock: 0, status: "unavailable" },
      { name: "Tétano/Difteria", stock: 17, status: "available" },
      { name: "HPV", stock: 11, status: "available" },
    ],
    rating: 4.4,
    waitTime: "20 min",
    coordinates: { lat: -23.5505, lng: -46.6605 },
  },
]

interface HealthPostsListProps {
  onPostSelect?: (post: HealthPost) => void
}

export function HealthPostsList({ onPostSelect }: HealthPostsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVaccine, setSelectedVaccine] = useState<string>("all")
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all")
  const [selectedPost, setSelectedPost] = useState<HealthPost | null>(null)
  const [showMap, setShowMap] = useState(false)

  // Get all unique vaccines for filter
  const allVaccines = Array.from(
    new Set(mockHealthPosts.flatMap((post) => post.availableVaccines.map((v) => v.name))),
  ).sort()

  // Filter posts based on search and filters
  const filteredPosts = mockHealthPosts.filter((post) => {
    const matchesSearch =
      post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.address.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesVaccine = selectedVaccine === "all" || post.availableVaccines.some((v) => v.name === selectedVaccine)

    const matchesAvailability =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && post.availableVaccines.some((v) => v.status === "available")) ||
      (availabilityFilter === "low" && post.availableVaccines.some((v) => v.status === "low"))

    return matchesSearch && matchesVaccine && matchesAvailability
  })

  const handlePostSelect = (post: HealthPost) => {
    setSelectedPost(post)
    onPostSelect?.(post)
  }

  const handleDirections = (post: HealthPost) => {
    // TODO: Integrate with maps API
    console.log("[v0] Opening directions to:", post.name)
    alert(`Abrindo direções para ${post.name}`)
  }

  const handleSchedule = (post: HealthPost) => {
    // TODO: Integrate with scheduling system
    console.log("[v0] Scheduling appointment at:", post.name)
    alert(`Agendando consulta em ${post.name}`)
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Postos de Vacinação Próximos
          </CardTitle>
          <CardDescription>Encontre postos com vacinas disponíveis perto de você</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou endereço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedVaccine} onValueChange={setSelectedVaccine}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por vacina" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as vacinas</SelectItem>
                {allVaccines.map((vaccine) => (
                  <SelectItem key={vaccine} value={vaccine}>
                    {vaccine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Disponibilidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os postos</SelectItem>
                <SelectItem value="available">Com estoque</SelectItem>
                <SelectItem value="low">Estoque baixo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{filteredPosts.length} postos encontrados</Badge>
              {searchTerm && <Badge variant="outline">Busca: "{searchTerm}"</Badge>}
              {selectedVaccine !== "all" && <Badge variant="outline">Vacina: {selectedVaccine}</Badge>}
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowMap(!showMap)}>
              <MapPin className="h-4 w-4 mr-2" />
              {showMap ? "Lista" : "Mapa"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map View */}
      {showMap && <HealthPostsMap posts={filteredPosts} selectedPost={selectedPost} onPostSelect={handlePostSelect} />}

      {/* Posts List */}
      <div className="grid gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <HealthPostCard key={post.id} post={post} onDirections={handleDirections} onSchedule={handleSchedule} />
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum posto encontrado</h3>
              <p className="text-muted-foreground mb-4">Tente ajustar os filtros ou buscar por uma região diferente.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedVaccine("all")
                  setAvailabilityFilter("all")
                }}
              >
                Limpar filtros
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
