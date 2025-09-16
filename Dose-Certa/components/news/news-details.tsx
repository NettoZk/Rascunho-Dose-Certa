"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, ExternalLink, Eye, Share2, User } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { NewsArticle } from "./news-card"

interface NewsDetailsProps {
  article: NewsArticle
  onBack: () => void
}

export function NewsDetails({ article, onBack }: NewsDetailsProps) {
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
    locale: ptBR,
  })

  const formattedDate = format(new Date(article.publishedAt), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
    locale: ptBR,
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "epidemic":
        return "Epidemia"
      case "vaccination":
        return "Vacinação"
      case "health":
        return "Saúde"
      case "alert":
        return "Alerta"
      default:
        return "Notícia"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack} className="bg-transparent">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-transparent">
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
          {article.externalUrl && (
            <Button variant="outline" size="sm" className="bg-transparent">
              <ExternalLink className="h-4 w-4 mr-2" />
              Fonte Original
            </Button>
          )}
        </div>
      </div>

      <Card className={`${article.priority === "urgent" ? "border-red-500 bg-red-50" : ""}`}>
        <CardHeader>
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className={getPriorityColor(article.priority)}>
                  {getCategoryLabel(article.category)}
                </Badge>
                {article.priority === "urgent" && (
                  <Badge variant="destructive" className="animate-pulse">
                    URGENTE
                  </Badge>
                )}
              </div>
              <CardTitle className="text-2xl leading-tight mb-3">{article.title}</CardTitle>
              <CardDescription className="text-lg">{article.summary}</CardDescription>
            </div>
            {article.imageUrl && (
              <div className="flex-shrink-0">
                <img
                  src={article.imageUrl || "/placeholder.svg"}
                  alt={article.title}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t pt-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} min de leitura</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{article.views.toLocaleString()} visualizações</span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-base leading-relaxed">{article.content}</p>

              {/* Mock additional content for demonstration */}
              <p className="text-base leading-relaxed mt-4">
                As autoridades de saúde recomendam que a população mantenha-se informada através de canais oficiais e
                siga todas as orientações preventivas. É fundamental que todos colaborem para conter a propagação e
                proteger os grupos mais vulneráveis.
              </p>

              <p className="text-base leading-relaxed mt-4">
                Para mais informações, entre em contato com a Secretaria de Saúde do seu município ou acesse o portal
                oficial do Ministério da Saúde. Mantenha-se atualizado e cuide da sua saúde e da sua família.
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Fonte Oficial</h4>
              <p className="text-sm text-muted-foreground">
                Esta informação foi publicada por <strong>{article.source}</strong> em {formattedDate}. Sempre verifique
                informações de saúde através de fontes oficiais e confiáveis.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
