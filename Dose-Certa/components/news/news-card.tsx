"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, ExternalLink, Eye, Share2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export interface NewsArticle {
  id: string
  title: string
  summary: string
  content: string
  source: string
  author: string
  publishedAt: string
  category: "epidemic" | "vaccination" | "health" | "alert"
  priority: "low" | "medium" | "high" | "urgent"
  tags: string[]
  imageUrl?: string
  externalUrl?: string
  readTime: number
  views: number
}

interface NewsCardProps {
  article: NewsArticle
  onReadMore?: (article: NewsArticle) => void
  compact?: boolean
}

export function NewsCard({ article, onReadMore, compact = false }: NewsCardProps) {
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "epidemic":
      case "alert":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
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

  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
    locale: ptBR,
  })

  if (compact) {
    return (
      <Card className={`${article.priority === "urgent" ? "border-red-500 bg-red-50" : ""}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">{getCategoryIcon(article.category)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={getPriorityColor(article.priority)}>
                  {getCategoryLabel(article.category)}
                </Badge>
                {article.priority === "urgent" && (
                  <Badge variant="destructive" className="animate-pulse">
                    URGENTE
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-sm leading-tight mb-1">{article.title}</h3>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{article.summary}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{article.source}</span>
                <span>{timeAgo}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`${article.priority === "urgent" ? "border-red-500 bg-red-50" : ""}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={getPriorityColor(article.priority)}>
                {getCategoryIcon(article.category)}
                <span className="ml-1">{getCategoryLabel(article.category)}</span>
              </Badge>
              {article.priority === "urgent" && (
                <Badge variant="destructive" className="animate-pulse">
                  URGENTE
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
            <CardDescription className="mt-2">{article.summary}</CardDescription>
          </div>
          {article.imageUrl && (
            <div className="flex-shrink-0">
              <img
                src={article.imageUrl || "/placeholder.svg"}
                alt={article.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>{article.source}</span>
              <span>Por {article.author}</span>
              <span>{timeAgo}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{article.views.toLocaleString()}</span>
              </div>
              <span>{article.readTime} min</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="default" size="sm" onClick={() => onReadMore?.(article)} className="flex-1">
              Ler Mais
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Share2 className="h-4 w-4" />
            </Button>
            {article.externalUrl && (
              <Button variant="outline" size="sm" className="bg-transparent">
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
