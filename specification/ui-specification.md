# 📘 UI Specification – Todo List

---

## 1. 🧭 Overview

Este documento descreve a interface de uma aplicação **Todo List moderna**, com foco em:

* UI clean com efeito **glassmorphism**
* Interações suaves (hover, transições)
* Organização clara de tarefas
* Responsividade básica

---

## 2. 🖼️ Layout (Wireframe)

```
./assets/wireframe.png

```

---

## 3. 📐 Estrutura Geral

### Container principal

* `max-width: 700px`
* `padding: 25px`
* `border-radius: 20px`
* `backdrop-filter: blur(15px)`
* `background: rgba(255,255,255,0.12)`
* `box-shadow: 0 15px 40px rgba(0,0,0,0.15)`

### Body

* `display: flex`
* `justify-content: center`
* `padding: 40px 20px`
* `background: linear-gradient(135deg, #6c5cff, #8a2be2)`

---

## 4. 🧩 Componentes

---

### 4.1 Header

**Elementos:**

* Título: `Todo List`
* Subtítulo: descrição

**Estilo:**

* `text-align: center`
* margem inferior: `30px`

**Tipografia:**

* título: `32px`
* subtítulo: cor branca com opacidade

---

### 4.2 Cards (Stats)

**Estrutura:**

* 3 cards: Total | Ativas | Completas

**Layout:**

* `display: flex`
* `gap: 15px`
* `flex-wrap: wrap`

**Card:**

* `padding: 20px`
* `border-radius: 16px`
* `min-width: 100px`
* `flex: 1`

**Estilo:**

* glass effect (transparência + blur)
* borda leve
* sombra suave

**Conteúdo:**

* número: `font-size: 26px`
* label: abaixo com opacidade

**Cores:**

* padrão: branco
* completas: verde (`--accent`)

---

### 4.3 Add Task

**Layout:**

* `display: flex`
* `gap: 10px`

#### Input

* `padding: 14px`
* `border-radius: 12px`
* `flex: 1`
* sem borda
* sombra leve

#### Botão

* `padding: 14px 20px`
* `border-radius: 12px`
* `background: gradient`
* texto branco
* cursor pointer

---

### 4.4 Filters

**Layout:**

* `display: flex`
* `gap: 10px`
* `flex-wrap: wrap`

**Botões:**

* `padding: 10px 16px`
* `border-radius: 12px`

**Estado ativo:**

* fundo mais forte
* leve escala (`scale: 1.05`)
* borda mais visível

---

### 4.5 Tasks

**Layout:**

* `display: flex`
* `flex-direction: column`
* `gap: 12px`

#### Item de tarefa

* `padding: 16px`
* `border-radius: 12px`
* `display: flex`
* `gap: 10px`
* alinhamento vertical central

**Estados:**

✔ Ativa:

* texto branco

✔ Completa:

* `text-decoration: line-through`
* opacidade reduzida

---

## 5. 🎨 Sistema de Cores

```css
--primary: #6c5cff
--secondary: #8a2be2
--accent: #00c9a7
--white: #ffffff
```

---

## 6. ✨ Interações e Efeitos

### Cards

* hover:

  * `translateY(-6px)`
  * `scale(1.02)`
  * mudança de cor
  * sombra mais forte

---

### Botão Add

* hover:

  * `scale(1.05)`
  * `opacity: 0.9`

---

### Filters

* hover individual:

  * `translateY(-3px)`
  * leve aumento (`scale`)
* ativo:

  * fundo mais intenso
  * destaque visual

---

### Tasks

* hover:

  * `translateX(5px)`
  * fundo mais forte

---

## 7. 📱 Responsividade

### Breakpoint: `600px`

Mudanças:

* cards ficam em coluna
* input e botão empilham
* botão ocupa 100%
* padding reduzido

---

## 8. ⚙️ Funcionalidades

### 8.1 Adicionar tarefa

* usuário digita no input
* clica em "Adicionar"
* tarefa aparece na lista

---

### 8.2 Marcar como concluída

* checkbox altera estado
* aplica estilo de tarefa concluída

---

### 8.3 Filtros

* Todas → mostra tudo
* Ativas → apenas não concluídas
* Completas → apenas concluídas

---

### 8.4 Estatísticas

* Total = número total de tarefas
* Ativas = tarefas pendentes
* Completas = tarefas finalizadas

---

## 9. 🔤 Tipografia

* Fonte: **Roboto Mono**
* Estilo: moderno / técnico
* Aplicada globalmente

---

## 10. 🧠 Conceito Visual

O design segue:

* **Glassmorphism**
* **Minimalismo**
* **Feedback visual com animação**
* **Hierarquia clara**
