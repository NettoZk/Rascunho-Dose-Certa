import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { ProfileForm } from "@/components/profile/profile-form"

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 py-8 px-4">
          <div className="container max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Meu Perfil</h1>
              <p className="text-muted-foreground">
                Gerencie suas informações pessoais, preferências e configurações de segurança
              </p>
            </div>

            <ProfileForm />
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
