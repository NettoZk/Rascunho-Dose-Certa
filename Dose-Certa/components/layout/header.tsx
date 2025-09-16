"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Shield, LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Perfil", href: "/perfil" },
  ]

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Dose Certa</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {user &&
              navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-muted-foreground">
                Olá, {user.name}
                <span className="ml-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {user.type === "citizen" ? "Cidadão" : "Profissional"}
                </span>
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Sair</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                <Link href="/login">Entrar</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Cadastrar</Link>
              </Button>
            </div>
          )}

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4 mt-8">
                {user ? (
                  <>
                    <div className="pb-4 border-b">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded mt-2 inline-block">
                        {user.type === "citizen" ? "Cidadão" : "Profissional"}
                      </span>
                    </div>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Button variant="ghost" onClick={handleLogout} className="justify-start">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild onClick={() => setIsOpen(false)}>
                      <Link href="/login">Entrar</Link>
                    </Button>
                    <Button variant="outline" asChild onClick={() => setIsOpen(false)} className="bg-transparent">
                      <Link href="/register">Cadastrar</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
