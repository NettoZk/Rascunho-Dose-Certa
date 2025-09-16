# Dose Certa - Sistema de Gestão Vacinal

Sistema web completo para gestão pessoal de vacinação, desenvolvido com Next.js, TypeScript, TailwindCSS e Shadcn/UI.

## 🚀 Funcionalidades Implementadas

### Para Cidadãos
- ✅ **Histórico de Vacinação Digital**: Cartão vacinal completo com timeline cronológica
- ✅ **Alertas Inteligentes**: Notificações para vacinas atrasadas e doses de reforço
- ✅ **Resultados de Exames**: Upload seguro e organização de PDFs e imagens
- ✅ **Localização de Postos**: Mapa interativo com filtros por vacina e disponibilidade
- ✅ **Campanhas de Vacinação**: Notificações personalizadas por faixa etária e região
- ✅ **Notícias e Alertas**: Feed oficial com alertas de epidemias e surtos
- ✅ **Perfil Completo**: Gerenciamento de dados pessoais e preferências

### Para Profissionais de Saúde
- ✅ **Gerenciamento de Pacientes**: Cadastro e acompanhamento do histórico vacinal
- ✅ **Controle de Estoque**: Gestão completa de vacinas com alertas de baixo estoque
- ✅ **Campanhas**: Criação e monitoramento de campanhas de vacinação
- ✅ **Relatórios**: Estatísticas detalhadas e relatórios personalizáveis
- ✅ **Atualização de Postos**: Controle de disponibilidade e horários

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS v4
- **Componentes**: Shadcn/UI
- **Ícones**: Lucide React
- **Autenticação**: Context API (mock)
- **Estado**: React Hooks + Context

## 📱 Páginas e Rotas

- `/` - Homepage com apresentação do sistema
- `/login` - Autenticação para cidadãos e profissionais
- `/register` - Cadastro de novos usuários
- `/dashboard` - Dashboard personalizado por tipo de usuário
- `/perfil` - Gerenciamento de perfil e configurações

## 🎯 Componentes Principais

### Autenticação
- `AuthProvider` - Context de autenticação
- `LoginForm` - Formulário de login com seleção de tipo de usuário
- `RegisterForm` - Cadastro com validação
- `ProtectedRoute` - Proteção de rotas autenticadas

### Dashboard Cidadão
- `CitizenDashboard` - Dashboard principal com 7 abas
- `VaccinationCard` - Cards detalhados de vacinas
- `VaccinationTimeline` - Timeline cronológica
- `VaccinationAlerts` - Sistema de alertas inteligentes
- `ExamList` - Gerenciamento de resultados de exames
- `HealthPostsList` - Localização de postos com mapa
- `CampaignCard` - Campanhas de vacinação
- `NewsFeed` - Feed de notícias e alertas

### Dashboard Profissional
- `ProfessionalDashboard` - Dashboard com 5 abas especializadas
- `StockManagement` - Controle completo de estoque
- Gerenciamento de pacientes e campanhas
- Relatórios e estatísticas detalhadas

### Layout e Navegação
- `Header` - Navegação responsiva com menu mobile
- `Footer` - Rodapé com links e informações
- `ThemeToggle` - Alternador de tema claro/escuro

## 📊 Dados Fictícios

O sistema inclui dados mock abrangentes para demonstração:

- **Histórico Vacinal**: 6+ vacinas com status variados
- **Resultados de Exames**: 4 categorias com arquivos simulados
- **Postos de Saúde**: 8 locais com horários e disponibilidade
- **Campanhas**: 5 campanhas ativas e futuras
- **Notícias**: 6 artigos com diferentes prioridades
- **Estoque**: Controle completo com alertas automáticos

## 🔧 Instalação e Execução

\`\`\`bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
\`\`\`

## 👥 Usuários de Teste

### Cidadão
- **Email**: cidadao@teste.com
- **Senha**: qualquer senha
- **Funcionalidades**: Histórico, exames, postos, campanhas, notícias

### Profissional
- **Email**: profissional@teste.com
- **Senha**: qualquer senha
- **Funcionalidades**: Pacientes, estoque, campanhas, relatórios

## 🚧 Integrações Futuras (TODO)

### APIs e Backend
- [ ] Integração com banco de dados real (Supabase/PostgreSQL)
- [ ] API REST para operações CRUD
- [ ] Autenticação JWT com refresh tokens
- [ ] Upload real de arquivos (Vercel Blob)

### Notificações
- [ ] Push notifications (Service Workers)
- [ ] Notificações por email (Resend/SendGrid)
- [ ] SMS para alertas críticos (Twilio)

### Mapas e Localização
- [ ] Integração com Google Maps API
- [ ] Geolocalização para postos próximos
- [ ] Rotas e navegação

### Integrações Governamentais
- [ ] ConecteSUS para dados oficiais
- [ ] Sistema Nacional de Imunizações
- [ ] Carteira Nacional de Vacinação Digital

### Funcionalidades Avançadas
- [ ] QR Code para verificação de vacinas
- [ ] Exportação de certificados PDF
- [ ] Agendamento online de vacinas
- [ ] Telemedicina básica
- [ ] Analytics e métricas avançadas

## 📱 Responsividade

- ✅ Mobile First Design
- ✅ Breakpoints: sm (640px), md (768px), lg (1024px)
- ✅ Menu mobile com Sheet component
- ✅ Cards e grids adaptáveis
- ✅ Tipografia responsiva

## 🎨 Design System

- **Cores**: Sistema de 3-5 cores com primary/secondary
- **Tipografia**: Font system com Geist Sans/Mono
- **Componentes**: Shadcn/UI com customizações
- **Espaçamento**: Sistema consistente com gap utilities
- **Acessibilidade**: WCAG AA compliance

## 📈 Próximos Passos

1. **Integração com Supabase** para dados reais
2. **Sistema de notificações** push e email
3. **Mapas interativos** com Google Maps
4. **QR Codes** para verificação
5. **Agendamento** de vacinas online
6. **Relatórios avançados** com gráficos
7. **Integração governamental** com ConecteSUS

## 🤝 Contribuição

Este é um projeto de demonstração. Para implementação real, considere:

- Configurar ambiente de desenvolvimento
- Implementar testes unitários e E2E
- Configurar CI/CD pipeline
- Implementar monitoramento e logs
- Configurar backup e disaster recovery

---

**Dose Certa** - Mantendo a saúde vacinal do Brasil em dia! 🇧🇷💉
\`\`\`

\`\`\`tsx file="" isHidden
