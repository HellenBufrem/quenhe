# 🛠️ Software Design Document (SDD)

**Projeto:** Quenhé - Amigo Secreto
**Versão:** 1.0.0  
**Status:** ⚪ Aguardando Geração de Especificações.

## 🤖 1. Orquestração e Contexto de IA (MCP)
> Configuração dos servidores Model Context Protocol para a IDE Agêntica.

* **Supabase MCP:** Contexto do banco de dados real e políticas de RLS.
* **GitHub MCP:** Leitura das Issues do Kanban para orientar a implementação.

## 📦 2. Stack Tecnológica e Bibliotecas
* **Core:** Angular 21+ (Standalone / Signals).
* **BaaS & Auth:** Supabase-js.
* **Estilização & UI:** Tailwind CSS, Spartan UI (HLM), Lucide Angular.

## 🎨 3. Design Tokens (Tailwind CSS)

Definição das cores e tipografia principais utilizadas no protótipo de alta fidelidade:

* **Cores Principais:**
  * `primary` (Vermelho - Botões e Destaques): `#E02424`
  * `secondary` (Verde - Ações de Sucesso/Entrar): `#059669`
  * `background` (Fundo do App): `#F9FAFB`
  * `text-dark` (Textos principais): `#111827`
* **Tipografia:**
  * Família de Fonte: `Inter`, sans-serif

## 🗄️ 4. Arquitetura de Dados

### 📖 4.1. Glossário Técnico (Mapeamento)
| Termo PRD (PT-BR) | Entidade Técnica (EN) | Atributos Principais |
| :--- | :--- | :--- |
| Grupo | `group` | `id`, `name`, `owner_id`, `status` |
| Participante | `participant` | `id`, `group_id`, `name` |
| Sorteio | `draw` | `id`, `group_id`, `giver_id`, `receiver_id` |

### 📊 4.2. Diagrama ER (Mermaid)
```mermaid
erDiagram
    GROUP ||--o{ PARTICIPANT : contains
    GROUP ||--o{ DRAW : generates
    PARTICIPANT ||--o{ DRAW : is_giver
    PARTICIPANT ||--o{ DRAW : is_receiver

    GROUP {
        uuid id PK
        string name
        uuid owner_id
        string status "pending | completed"
    }
    PARTICIPANT {
        uuid id PK
        uuid group_id FK
        string name
    }
    DRAW {
        uuid id PK
        uuid group_id FK
        uuid giver_id FK
        uuid receiver_id FK
    }

## 📂 5. Estrutura de Diretórios (Monorepo)

### 5.1. Scaffolding Base
O projeto utiliza a arquitetura de Monorepo com NPM Workspaces para manter o contexto unificado.
* `apps/` - Diretório raiz dos subprojetos.
  * `apps/api/` - Reservado para futuro backend/serviços isolados.
  * `apps/web/` - Aplicação Frontend principal (Angular).
* `docs/` - Documentação de requisitos e arquitetura.
