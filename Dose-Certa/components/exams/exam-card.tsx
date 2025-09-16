"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, ImageIcon, Download, Eye, Calendar, User, FileCheck } from "lucide-react"

export interface ExamRecord {
  id: string
  title: string
  category: string
  date: string
  doctor?: string
  notes?: string
  files: Array<{
    id: string
    name: string
    size: number
    type: string
    url: string
  }>
  uploadDate: string
}

interface ExamCardProps {
  exam: ExamRecord
  compact?: boolean
}

const categoryColors = {
  sangue: "bg-red-100 text-red-800 border-red-200",
  urina: "bg-yellow-100 text-yellow-800 border-yellow-200",
  imagem: "bg-blue-100 text-blue-800 border-blue-200",
  cardiologico: "bg-pink-100 text-pink-800 border-pink-200",
  neurologico: "bg-purple-100 text-purple-800 border-purple-200",
  ginecologico: "bg-green-100 text-green-800 border-green-200",
  outros: "bg-gray-100 text-gray-800 border-gray-200",
}

const categoryLabels = {
  sangue: "Exames de Sangue",
  urina: "Exames de Urina",
  imagem: "Exames de Imagem",
  cardiologico: "Exames Cardiológicos",
  neurologico: "Exames Neurológicos",
  ginecologico: "Exames Ginecológicos",
  outros: "Outros",
}

export function ExamCard({ exam, compact = false }: ExamCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleDownload = (file: any) => {
    // TODO: Replace with real download logic
    console.log("[v0] Downloading file:", file.name)

    // Simulate download
    const link = document.createElement("a")
    link.href = file.url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleView = (file: any) => {
    // TODO: Replace with real file viewer
    console.log("[v0] Viewing file:", file.name)
    window.open(file.url, "_blank")
  }

  if (compact) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <FileCheck className="h-4 w-4 text-primary" />
                <h3 className="font-medium truncate">{exam.title}</h3>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(exam.date)}
                </div>
                <Badge variant="outline" className={categoryColors[exam.category as keyof typeof categoryColors]}>
                  {categoryLabels[exam.category as keyof typeof categoryLabels]}
                </Badge>
              </div>
            </div>
            <div className="flex gap-1 ml-2">
              {exam.files.map((file) => (
                <Button key={file.id} variant="ghost" size="sm" onClick={() => handleView(file)}>
                  <Eye className="h-3 w-3" />
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="flex items-center gap-2 mb-2">
              <FileCheck className="h-5 w-5 text-primary" />
              {exam.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(exam.date)}
              </div>
              {exam.doctor && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {exam.doctor}
                </div>
              )}
            </CardDescription>
          </div>
          <Badge variant="outline" className={categoryColors[exam.category as keyof typeof categoryColors]}>
            {categoryLabels[exam.category as keyof typeof categoryLabels]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {exam.notes && (
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm">{exam.notes}</p>
          </div>
        )}

        {/* Files */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Arquivos ({exam.files.length})</h4>
          <div className="grid gap-2">
            {exam.files.map((file) => (
              <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg">
                {file.type.startsWith("image/") ? (
                  <ImageIcon className="h-5 w-5 text-blue-600" />
                ) : (
                  <FileText className="h-5 w-5 text-red-600" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleView(file)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDownload(file)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">Adicionado em {formatDate(exam.uploadDate)}</div>
      </CardContent>
    </Card>
  )
}
