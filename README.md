# Todo List — SPA

Aplicação web de página única desenvolvida para validar uma solução simples, rápida e agradável de gerenciamento de tarefas.

## Objetivo

O projeto aplica fundamentos de HTML semântico, CSS responsivo, manipulação do DOM e gerenciamento de estado com JavaScript. A interface segue a especificação visual do curso, com glassmorphism, feedback de interação e hierarquia clara.

## Funcionalidades

- Adicionar tarefas com validação de entrada;
- listar, concluir e remover tarefas;
- filtrar por todas, ativas ou completas;
- atualizar estatísticas em tempo real;
- preservar tarefas no navegador com `localStorage`;
- adaptar a interface para computadores e celulares;
- oferecer navegação por teclado e mensagens acessíveis.

## Estrutura

```text
.
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
├── specification/
│   ├── assets/
│   ├── development.md
│   └── ui-specification.md
├── .github/
│   ├── ISSUE_TEMPLATE/bug_report.md
│   └── pull_request_template.md
└── README.md
```

## Como executar

1. Clone o repositório.
2. Abra a pasta `frontend`.
3. Abra `index.html` em um navegador moderno.

Não é necessário instalar dependências ou executar um servidor.

## Referências do projeto

- [Planejamento no Notion](https://deluxe-blue-bc1.notion.site/Single-Page-Application-SPA-3b9dfca74d8d807099afd13d35082333?pvs=73)
- [Layout no Figma](https://www.figma.com/design/h2JApNaTYjC15enWmehsx1/ToDo-List-%E2%80%94-Pastel-Modern-UI?node-id=0-1&t=TpREPpGI43cL0eMy-1)
- [Especificação da interface](specification/ui-specification.md)
- [Plano de desenvolvimento](specification/development.md)

## Versionamento

O desenvolvimento utiliza commits semânticos (`feat`, `fix`, `style`, `refactor` e `docs`) e mantém a personalização em uma branch própria.
