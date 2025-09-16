"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus } from "lucide-react"
import { ExamCard, type ExamRecord } from "./exam-card"
import { ExamUpload } from "./exam-upload"

interface ExamListProps {
  exams: ExamRecord[]
  onExamAdded?: (exam: ExamRecord) => void
}

export function ExamList({ exams, onExamAdded }: ExamListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")
  const [showUpload, setShowUpload] = useState(false)

  const filteredAndSortedExams = exams
    .filter((exam) => {
      const matchesSearch =
        exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.doctor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || exam.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "title-asc":
          return a.title.localeCompare(b.title)
        case "title-desc":
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

  const handleExamAdded = (newExam: ExamRecord) => {
    onExamAdded?.(newExam)
    setShowUpload(false)
  }

  if (showUpload) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Adicionar Resultado de Exame</h2>
          <Button variant="outline" onClick={() => setShowUpload(false)}>
            Voltar à Lista
          </Button>
        </div>
        <ExamUpload onUploadComplete={handleExamAdded} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Resultados de Exames</h2>
          <p className="text-muted-foreground">
            {exams.length} {exams.length === 1 ? "exame" : "exames"} no seu histórico
          </p>
        </div>
        <Button onClick={() => setShowUpload(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Exame
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros e Busca
          </CardTitle>
          <CardDescription>Encontre rapidamente os exames que você procura</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título, médico ou observações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  <SelectItem value="sangue">Exames de Sangue</SelectItem>
                  <SelectItem value="urina">Exames de Urina</SelectItem>
                  <SelectItem value="imagem">Exames de Imagem</SelectItem>
                  <SelectItem value="cardiologico">Exames Cardiológicos</SelectItem>
                  <SelectItem value="neurologico">Exames Neurológicos</SelectItem>
                  <SelectItem value="ginecologico">Exames Ginecológicos</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ordenar por</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Data (mais recente)</SelectItem>
                  <SelectItem value="date-asc">Data (mais antigo)</SelectItem>
                  <SelectItem value="title-asc">Título (A-Z)</SelectItem>
                  <SelectItem value="title-desc">Título (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {filteredAndSortedExams.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="space-y-4">
              <div className="text-muted-foreground">
                {searchTerm || categoryFilter !== "all"
                  ? "Nenhum exame encontrado com os filtros aplicados."
                  : "Você ainda não possui exames cadastrados."}
              </div>
              <Button onClick={() => setShowUpload(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Exame
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredAndSortedExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      )}
    </div>
  )
}
