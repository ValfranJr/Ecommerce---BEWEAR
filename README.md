# BE-WEAR 🛍️

Uma plataforma de e-commerce moderna e completa para venda de roupas, construída com as melhores tecnologias do ecossistema React e Next.js.

## 📋 Sobre o Projeto

BE-WEAR é uma aplicação de e-commerce full-stack que oferece uma experiência de compra completa, desde a navegação por produtos até o checkout final. A plataforma inclui funcionalidades avançadas como autenticação, carrinho de compras, gestão de pedidos e painel administrativo.

## ✨ Funcionalidades

### 🛒 Para Clientes

- **Catálogo de Produtos**: Navegação por categorias e produtos
- **Sistema de Carrinho**: Adição, remoção e gestão de produtos
- **Autenticação**: Login e cadastro de usuários
- **Checkout**: Processo de compra integrado com Stripe
- **Gestão de Pedidos**: Acompanhamento de pedidos realizados
- **Endereços de Entrega**: Cadastro e gestão de endereços

### 👨‍💼 Para Administradores

- **Painel Administrativo**: Gestão completa da plataforma
- **Relatórios de Vendas**: Análise de vendas e receita
- **Gestão de Pedidos**: Acompanhamento e atualização de status
- **Dashboard**: Visão geral das métricas do negócio

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Linguagem de programação tipada
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de UI modernos
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **React Query** - Gerenciamento de estado do servidor

### Backend & Banco de Dados

- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM moderno e type-safe
- **BetterAuth** - Sistema de autenticação
- **Stripe** - Processamento de pagamentos

### Ferramentas de Desenvolvimento

- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Drizzle Kit** - Migrações e seed do banco

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 18+
- PostgreSQL
- Conta no Stripe (para pagamentos)

### Instalação

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd be-wear
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env.local` na raiz do projeto:

```env
# Banco de Dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/be-wear"

# Autenticação
AUTH_SECRET="sua-chave-secreta-aqui"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Next.js
NEXTAUTH_URL="http://localhost:3000"
```

4. **Configure o banco de dados**

```bash
# Execute as migrações
npm run db:migrate

# Popule o banco com dados iniciais
npm run db:seed
```

5. **Execute o projeto**

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── actions/           # Server Actions
├── app/              # Páginas e rotas (App Router)
│   ├── admin/        # Painel administrativo
│   ├── api/          # Rotas da API
│   ├── authentication/ # Páginas de autenticação
│   ├── cart/         # Páginas do carrinho
│   ├── category/     # Páginas de categorias
│   ├── checkout/     # Páginas de checkout
│   └── my-orders/    # Páginas de pedidos
├── components/       # Componentes React
│   ├── common/       # Componentes compartilhados
│   └── ui/           # Componentes de UI (shadcn/ui)
├── data/             # Funções de acesso a dados
├── db/               # Configuração do banco de dados
├── helpers/          # Funções utilitárias
├── hooks/            # Hooks customizados
├── lib/              # Configurações e utilitários
└── providers/        # Providers do React
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm run db:migrate` - Executa as migrações do banco
- `npm run db:seed` - Popula o banco com dados iniciais

## 🎨 Design System

O projeto utiliza o **shadcn/ui** como base para componentes, garantindo:

- Consistência visual
- Acessibilidade
- Customização fácil
- Performance otimizada

## 🔐 Autenticação

O sistema de autenticação é baseado no **BetterAuth** e suporta:

- Login com email/senha
- Registro de novos usuários
- Sessões seguras
- Controle de acesso por roles (usuário/admin)

## 💳 Pagamentos

Integração completa com **Stripe**:

- Checkout seguro
- Processamento de cartões
- Webhooks para atualizações
- Gestão de reembolsos

## 📊 Banco de Dados

**PostgreSQL** com **Drizzle ORM**:

- Schema type-safe
- Migrações automáticas
- Relacionamentos otimizados
- Queries performáticas

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através dos issues do GitHub.

---

Desenvolvido com ❤️ usando Next.js, TypeScript e as melhores práticas de desenvolvimento web moderno.
