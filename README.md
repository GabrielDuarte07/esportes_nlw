# Projeto: Perguntas sobre Jogos com Gemini API

Este projeto é uma aplicação web que permite ao usuário fazer perguntas sobre jogos e receber respostas geradas por IA utilizando a API Gemini do Google.

## Tecnologias Utilizadas

- **HTML5**: Estrutura da página.
- **CSS3**: Estilização da interface.
- **JavaScript (ES6+)**: Lógica da aplicação e integração com a API.
- **[Showdown.js](https://github.com/showdownjs/showdown)**: Conversão de respostas em Markdown para HTML.

## Como Funciona

1. O usuário informa sua chave de API Gemini, seleciona um jogo e digita uma pergunta.
2. Ao enviar o formulário, a aplicação faz uma requisição para a API Gemini (`gemini-2.0-flash`) usando o endpoint:
   ```
   https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
   ```
3. A pergunta é enviada junto com o nome do jogo e a chave de API informada.
4. A resposta da IA é recebida em formato Markdown e convertida para HTML para exibição na tela.

## Conexão com a API Gemini

A integração é feita via `fetch` no JavaScript, enviando a pergunta e recebendo a resposta da IA. O usuário precisa fornecer sua própria chave de API para autenticação.

---

> **Atenção:** Nunca compartilhe sua chave de API publicamente.
