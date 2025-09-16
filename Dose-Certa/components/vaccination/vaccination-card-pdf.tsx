"use client"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface VaccinationRecord {
  id: string
  vaccine: string
  date: string
  dose: string
  batch: string
  manufacturer: string
  location: string
  professional: string
  nextDose?: string
}

interface VaccinationCardPDFProps {
  userProfile: {
    name: string
    cpf: string
    birthDate: string
    email: string
  }
  vaccinations: VaccinationRecord[]
}

export function VaccinationCardPDF({ userProfile, vaccinations }: VaccinationCardPDFProps) {
  const generatePDF = () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cartão de Vacinação - ${userProfile.name}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              color: #333;
              line-height: 1.4;
            }
            .header { 
              text-align: center; 
              border-bottom: 2px solid #0066cc; 
              padding-bottom: 20px; 
              margin-bottom: 30px;
            }
            .header h1 { 
              color: #0066cc; 
              margin: 0;
              font-size: 24px;
            }
            .header p { 
              margin: 5px 0; 
              color: #666;
            }
            .user-info { 
              background: #f8f9fa; 
              padding: 15px; 
              border-radius: 8px; 
              margin-bottom: 30px;
            }
            .user-info h2 { 
              margin-top: 0; 
              color: #0066cc;
              font-size: 18px;
            }
            .vaccination-record { 
              border: 1px solid #ddd; 
              margin-bottom: 15px; 
              padding: 15px; 
              border-radius: 8px;
              background: white;
            }
            .vaccination-record h3 { 
              margin: 0 0 10px 0; 
              color: #0066cc;
              font-size: 16px;
            }
            .record-details { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 10px;
              font-size: 14px;
            }
            .record-details div { 
              margin-bottom: 5px;
            }
            .record-details strong { 
              color: #333;
            }
            .footer { 
              margin-top: 40px; 
              text-align: center; 
              font-size: 12px; 
              color: #666;
              border-top: 1px solid #ddd;
              padding-top: 20px;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>CARTÃO DE VACINAÇÃO DIGITAL</h1>
            <p>Sistema Dose Certa - Ministério da Saúde</p>
            <p>Documento gerado em: ${new Date().toLocaleDateString("pt-BR")}</p>
          </div>
          
          <div class="user-info">
            <h2>Dados Pessoais</h2>
            <div><strong>Nome:</strong> ${userProfile.name}</div>
            <div><strong>CPF:</strong> ${userProfile.cpf}</div>
            <div><strong>Data de Nascimento:</strong> ${userProfile.birthDate}</div>
            <div><strong>Email:</strong> ${userProfile.email}</div>
          </div>

          <h2 style="color: #0066cc; margin-bottom: 20px;">Histórico de Vacinação</h2>
          
          ${vaccinations
            .map(
              (vaccination) => `
            <div class="vaccination-record">
              <h3>${vaccination.vaccine}</h3>
              <div class="record-details">
                <div><strong>Data:</strong> ${vaccination.date}</div>
                <div><strong>Dose:</strong> ${vaccination.dose}</div>
                <div><strong>Lote:</strong> ${vaccination.batch}</div>
                <div><strong>Fabricante:</strong> ${vaccination.manufacturer}</div>
                <div><strong>Local:</strong> ${vaccination.location}</div>
                <div><strong>Profissional:</strong> ${vaccination.professional}</div>
                ${vaccination.nextDose ? `<div><strong>Próxima Dose:</strong> ${vaccination.nextDose}</div>` : ""}
              </div>
            </div>
          `,
            )
            .join("")}

          <div class="footer">
            <p>Este documento foi gerado digitalmente pelo Sistema Dose Certa</p>
            <p>Para verificar a autenticidade, acesse: www.dosecerta.gov.br/verificar</p>
            <p>Código de Verificação: ${Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
        </body>
      </html>
    `

    printWindow.document.write(html)
    printWindow.document.close()

    // Wait for content to load then trigger print
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Cartão de Vacinação Digital
          <Button onClick={generatePDF} size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Baixar PDF
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium">Nome Completo</p>
              <p className="text-sm text-muted-foreground">{userProfile.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium">CPF</p>
              <p className="text-sm text-muted-foreground">{userProfile.cpf}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Data de Nascimento</p>
              <p className="text-sm text-muted-foreground">{userProfile.birthDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Últimas Vacinações</h4>
            {vaccinations.slice(0, 3).map((vaccination) => (
              <div key={vaccination.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{vaccination.vaccine}</p>
                  <p className="text-sm text-muted-foreground">
                    {vaccination.date} - {vaccination.dose}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{vaccination.location}</p>
                  <p className="text-xs text-muted-foreground">Lote: {vaccination.batch}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Documento oficial válido em todo território nacional
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
