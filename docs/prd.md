# 📄 Product Requirements Document (PRD)

**Projeto:** Quenhé - Amigo Secreto  
**Versão:** 1.0.0  
**Status:** 🟡 Em Definição (MVP)

## 🎯 1. Visão Geral e Objetivo
Aplicação web para gerenciar sorteios de Amigo Secreto de forma automatizada e justa. O objetivo é eliminar o uso de papel, garantir que ninguém tire a si mesmo e manter o segredo absoluto do sorteio até a revelação.

## 📖 2. Glossário Ubíquo
* **Grupo:** A sala virtual do sorteio.
* **Organizador:** Criador do grupo, responsável por adicionar participantes e acionar o sorteio.
* **Participante:** Pessoa incluída no grupo.
* **Par:** A relação gerada (quem tira quem).

## 👤 3. Atores e Permissões
* **Organizador (Admin):** Cria grupos, gerencia participantes antes do sorteio e inicia o sorteio.
* **Participante Comum:** Acessa o grupo via link e visualiza apenas o seu próprio par sorteado.

## 📝 4. Escopo Funcional (User Stories)
* Como organizador, eu quero criar um novo grupo de amigo secreto para que eu possa convidar pessoas.
* Como participante, eu quero entrar em um grupo através de um link para que eu seja incluído no sorteio.
* Como organizador, eu quero iniciar o sorteio com um clique para que o sistema defina os pares aleatoriamente.
* Como participante, eu quero visualizar quem eu tirei no sorteio de forma oculta para que o segredo seja mantido.
* Como organizador, eu quero excluir um participante antes do sorteio para corrigir erros.

## 🛡️ 5. Regras de Negócio (Constraints)
* Um grupo precisa de no mínimo 3 pessoas para realizar o sorteio.
* Um participante nunca pode tirar a si mesmo.
* O sorteio só pode ser realizado uma vez por grupo.

## 🚫 6. Fora de Escopo (Non-goals)
* Chat interno ou envio de mensagens automatizadas (WhatsApp/SMS).
* Lista de presentes.

## ⚙️ 7. Requisitos Não Funcionais (Qualidade)
* Mobile-first e interface acessível.

## 🛠️ 8. Tech Stack Principal (Diretrizes)
* Angular 21+ (Standalone / Signals) e Supabase.