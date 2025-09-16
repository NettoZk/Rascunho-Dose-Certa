import Link from "next/link"
import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-bold">Dose Certa</span>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">
              Sistema de gestão vacinal pessoal para cidadãos e profissionais de saúde.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Para Cidadãos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Meu Histórico
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Vacinas Disponíveis
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Encontrar Postos
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Para Profissionais</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Painel Profissional
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Gestão de Estoque
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Campanhas
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Suporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-6 lg:mt-8 pt-6 lg:pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Dose Certa. Todos os direitos reservados.</p>
          {/* TODO: Adicionar links para termos de uso e política de privacidade quando implementados */}
        </div>
      </div>
    </footer>
  )
}
