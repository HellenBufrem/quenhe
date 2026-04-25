# 🎁 Quenhé - Amigo Secreto

Um aplicativo web moderno para organização de sorteios de Amigo Secreto de forma elegante, rápida e segura. Projeto desenvolvido com foco em componentização e regras de negócio de autenticação.

## 1. Autores
* Eduardo Wosiak
* Hellen Bufrem

## 🚀 2. Tecnologias Utilizadas
* **Frontend:** Angular 21+ (Standalone / Signals)
* **Backend/Auth:** Supabase
* **Estilização e UI:** Tailwind CSS, Spartan UI (HLM) e Lucide Angular

## 🔗 3. Links da Prototipagem (Atividade 4)
* **Protótipo Navegável e Responsivo (Stitch):** https://stitch.withgoogle.com/projects/14976334861006297120
* **Mapa de Componentes Angular e Fluxo (Figma):** https://www.figma.com/design/tXtpBYCdfSDP7OGmN4p5mL/Amigo-secreto?node-id=2-2&t=sAjU1c3B5KpaRcqo-1

## 📄 4. Documentação do Projeto
Todo o planejamento arquitetural e de requisitos do projeto foi documentado ao longo das atividades:

* 📄 **PRD (Product Requirements Document):** Visão do produto, personas, histórias de usuário e regras de negócio estão no arquivo `docs/prd.md`.
* 📐 **SDD (Software Design Document):** A arquitetura de dados (Diagrama ER), orquestração e Design Tokens estão detalhados no arquivo `docs/sdd.md`.
* 📋 **Gestão de Tarefas (Kanban):** Nossas histórias de usuário e planejamento de Sprints estão na aba [Projects do GitHub].

## 📋 5. Checklist de Avaliação (RAs e IDs)

<details>
<summary><strong>Clique para expandir e ver o progresso da disciplina</strong></summary>

### RA1 - Design e Experiência do Usuário (UI/UX) com IA
- [x] **ID1:** Desenvolver protótipos navegáveis (ex: gerados via Stitch e refinados no Figma) que demonstram compreensão das diretrizes de usabilidade, com link público disponibilizado no repositório.
- [x] **ID2:** Projetar interfaces responsivas com a abordagem Mobile-First, garantindo que o layout se adapte perfeitamente a diferentes resoluções.
- [ ] **ID3:** Projetar a experiência de aplicativo nativo (PWA), configurando o `manifest.webmanifest`.

### RA2 - Componentização e UI Declarativa Moderna
- [x] **ID4:** Desenvolver componentes utilizando estritamente a arquitetura Standalone (sem o uso de NgModules).
- [x] **ID5:** Incorporar e customizar componentes utilizando um Framework CSS moderno (ex: Tailwind CSS, Spartan).
- [ ] **ID6:** Aplicar a nova sintaxe de fluxo de controle (`@if` / `@switch`).
- [ ] **ID7:** Utilizar a nova sintaxe de fluxo de controle `@for` com a propriedade `track`.
- [ ] **ID8:** Aplicar Pipes (nativos ou customizados).
- [ ] **ID9:** Implementar Deferrable Views (`@defer`).

### RA3 - Reatividade e Gerenciamento de Estado (Signals)
- [ ] **ID10:** Aplicar técnicas de one-way data binding utilizando estritamente Signals.
- [ ] **ID11:** Aplicar técnicas de event binding `( )`.
- [ ] **ID12:** Aplicar técnicas de two-way data binding utilizando a função moderna `model()`.
- [ ] **ID13:** Utilizar efeitos (`effect()`) para manipulação de efeitos colaterais.

### RA4 - Arquitetura de Software e Injeção de Dependências
- [ ] **ID14:** Utilizar as funções modernas `input()` e `output()` para a comunicação entre componentes.
- [ ] **ID15:** Criar comunicação entre componentes extraindo a lógica para Services, utilizando a função `inject()`.

### RA5 - Roteamento e Navegação SPA
- [ ] **ID16:** Configurar rotas dinâmicas utilizando a API funcional moderna.
- [ ] **ID17:** Passar e consumir dados entre telas usando `@Input()`.
- [ ] **ID18:** Criar uma estrutura de navegação aninhada (rotas filhas).
- [ ] **ID19:** Aplicar Functional Route Guards e Resolvers.

### RA6 - Integração de APIs e Assincronismo (BaaS)
- [ ] **ID20:** Realizar requisições assíncronas (GET) a uma API pública.
- [ ] **ID21:** Implementar o fluxo de Autenticação e Gerenciamento de Sessão (JWT) via Supabase.
- [ ] **ID22:** Realizar o ciclo completo de operações CRUD conectando a um BaaS.
- [ ] **ID23:** Implementar Functional Interceptors.
- [ ] **ID24:** Aplicar validações em Formulários Reativos.
- [ ] **ID25:** Integrar RxJS com Signals (`toSignal` / `toObservable`).

### RA7 - Engenharia de Software, Versionamento e DevOps
- [x] **ID26:** Criar e gerenciar um repositório no GitHub utilizando a estrutura ágil do Gitflow (branches `main` e `develop`).
- [ ] **ID27:** Colaborar ativamente realizando integrações via Pull Requests.
- [ ] **ID28:** Planejar, executar o build moderno e realizar o deploy automatizado.

### RA8 - Engenharia de Software Assistida por IA
- [x] **ID29:** Utilizar IA Generativa para a ideação e redação de User Stories. Cadastrar no Kanban no GitHub Projects.
- [x] **ID30:** Apoiar-se na IA para estruturar o Documento de Requisitos do Produto (`prd.md`).
- [x] **ID31:** A partir do PRD, instruir a IA a gerar um documento de especificação rigoroso (`sdd.md`).
- [x] **ID32:** Configurar a IDE ativando Servidores MCP e utilizando Skills de Angular 20+.
- [ ] **ID33:** Validação e Testes (TDD): Orientar o agente a gerar testes unitários (`.spec.ts`).

</details>

---
*Status atual: Fase de prototipagem e mapeamento de arquitetura concluídos. Aguardando início do desenvolvimento dos componentes em Angular.*
