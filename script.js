const apiKey = document.getElementById("apiKey");
const gameSelect = document.getElementById("gameSelect");
const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");
const form = document.getElementById("form");
const AIResponse = document.getElementById("AIResponse");

function markdownToHTML(text) {
  const converter = new showdown.Converter();
  return converter.makeHtml(text);
}

async function perguntaAI(question, game, APIKey) {
  const model = "gemini-2.0-flash";
  const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const pergunta = `
    eu gostaria de saber sobre o jogo ${game}: ${question}
  `;
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: pergunta,
        },
      ],
    },
  ];
  const tools = [
    {
      google_search: {},
    },
  ];

  const response = await fetch(geminiURL, {
    method: "POST",
    headers: {
      "x-goog-api-key": APIKey,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ contents, tools }),
  });

  const data = await response.json();
  console.log({ data });
  const finalAnswer = data.candidates[0].content.parts.reduce((acc, value) => {
    return acc + value.text;
  }, "");
  return finalAnswer;
}

async function enviaFormulario(event) {
  event.preventDefault();
  const apiKeyVal = apiKey.value;
  const gameSelectVal = gameSelect.value;
  const questionInputVal = questionInput.value;

  if (!apiKeyVal || !gameSelectVal || !questionInputVal) {
    alert("Por favor, preencha todos os campos");
    return;
  }

  askButton.setAttribute("disabled", "disabled");
  askButton.innerText = "Perguntando...";
  askButton.classList.add("loading");

  try {
    const text = await perguntaAI(questionInputVal, gameSelectVal, apiKeyVal);
    AIResponse.querySelector(".response-content").innerHTML =
      markdownToHTML(text);
    AIResponse.classList.remove("hidden");
  } catch (e) {
    console.log(e);
  } finally {
    askButton.removeAttribute("disabled");
    askButton.innerText = "Perguntar";
    askButton.classList.remove("loading");
  }
}

form.addEventListener("submit", (e) => enviaFormulario(e));
