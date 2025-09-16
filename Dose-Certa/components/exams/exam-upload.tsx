"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, ImageIcon, X, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExamFile {
  id: string
  name: string
  size: number
  type: string
  url: string
}

interface ExamUploadProps {
  onUploadComplete?: (exam: any) => void
}

export function ExamUpload({ onUploadComplete }: ExamUploadProps) {
  const [files, setFiles] = useState<ExamFile[]>([])
  const [examData, setExamData] = useState({
    title: "",
    category: "",
    date: "",
    doctor: "",
    notes: "",
  })
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(event.target.files || [])

      selectedFiles.forEach((file) => {
        // Validate file type
        const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"]
        if (!allowedTypes.includes(file.type)) {
          toast({
            title: "Tipo de arquivo não suportado",
            description: "Apenas PDFs e imagens (JPG, PNG) são permitidos.",
            variant: "destructive",
          })
          return
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "Arquivo muito grande",
            description: "O arquivo deve ter no máximo 10MB.",
            variant: "destructive",
          })
          return
        }

        // Create file URL for preview
        const fileUrl = URL.createObjectURL(file)
        const newFile: ExamFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          url: fileUrl,
        }

        setFiles((prev) => [...prev, newFile])
      })
    },
    [toast],
  )

  const removeFile = (fileId: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId)
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.url)
      }
      return prev.filter((f) => f.id !== fileId)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (files.length === 0) {
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Adicione pelo menos um arquivo para continuar.",
        variant: "destructive",
      })
      return
    }

    if (!examData.title || !examData.category || !examData.date) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newExam = {
        id: Math.random().toString(36).substr(2, 9),
        ...examData,
        files: files,
        uploadDate: new Date().toISOString(),
      }

      // TODO: Replace with real API call
      console.log("[v0] Uploading exam:", newExam)

      onUploadComplete?.(newExam)

      toast({
        title: "Exame enviado com sucesso!",
        description: "Seu resultado foi adicionado ao histórico.",
      })

      // Reset form
      setFiles([])
      setExamData({
        title: "",
        category: "",
        date: "",
        doctor: "",
        notes: "",
      })
    } catch (error) {
      toast({
        title: "Erro no upload",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Resultado de Exame</CardTitle>
        <CardDescription>Faça upload de PDFs ou imagens dos seus resultados de exames</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div className="space-y-4">
            <Label>Arquivos do Exame *</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Clique para selecionar arquivos</p>
                <p className="text-xs text-muted-foreground">PDFs e imagens até 10MB cada</p>
              </div>
              <Input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file) => (
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
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Exam Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Exame *</Label>
              <Input
                id="title"
                value={examData.title}
                onChange={(e) => setExamData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Ex: Hemograma Completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <Select
                value={examData.category}
                onValueChange={(value) => setExamData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
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
              <Label htmlFor="date">Data do Exame *</Label>
              <Input
                id="date"
                type="date"
                value={examData.date}
                onChange={(e) => setExamData((prev) => ({ ...prev, date: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor">Médico Solicitante</Label>
              <Input
                id="doctor"
                value={examData.doctor}
                onChange={(e) => setExamData((prev) => ({ ...prev, doctor: e.target.value }))}
                placeholder="Ex: Dr. João Silva (CRM 12345)"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={examData.notes}
              onChange={(e) => setExamData((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Adicione observações sobre o exame..."
              rows={3}
            />
          </div>

          <Button type="submit" disabled={isUploading} className="w-full">
            {isUploading ? (
              <>
                <Upload className="h-4 w-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Adicionar Exame
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
