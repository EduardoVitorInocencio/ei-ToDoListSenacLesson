# Interface da Todo List

Esta pasta contém a aplicação front-end, desenvolvida somente com HTML, CSS e JavaScript.

## Arquivos

- `index.html`: estrutura semântica e acessível;
- `style.css`: identidade visual, animações e responsividade;
- `script.js`: estado, persistência, filtros e interações.

## Execução

Abra o arquivo `index.html` em um navegador moderno. A aplicação funciona sem instalação de pacotes.

As tarefas ficam armazenadas no `localStorage` do navegador utilizado. Por isso, elas permanecem disponíveis depois que a página é fechada ou atualizada.

Cada tarefa possui um identificador único, uma descrição e um status (`active` ou `completed`). A interface e a barra de progresso são atualizadas imediatamente após qualquer alteração.

## Uso

1. Digite a descrição no campo principal e pressione **Adicionar** ou **Enter**.
2. Marque a caixa de seleção para concluir uma tarefa.
3. Use os botões **Todas**, **Ativas** e **Completas** para filtrar a lista.
4. Use o botão × para remover uma tarefa.
