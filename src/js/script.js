const BASE_URL = "http://localhost:3000/";

function formDataToJson(formData) {
  const json = {};
  formData.forEach((value, key) => {
    json[key] = value;
  });
  return json;
}

document.addEventListener("DOMContentLoaded", async function () {
  // Seleciona o elemento select
  var select = document.getElementById("timeSelect");

  localStorage.removeItem("email");
  localStorage.removeItem("codIngresso");

  try {
    // Faz a chamada HTTP usando Axios
    const response = await axios.get(BASE_URL + "games");
    // Limpa o select
    select.innerHTML = "";

    // Adiciona uma opção padrão
    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "Escolha um jogo";
    select.appendChild(defaultOption);

    // Adiciona opções baseadas na resposta da API
    response.data.forEach(function (game) {
      var option = document.createElement("option");
      option.value = game.jogo; // Altere conforme necessário para o ID do jogo
      option.textContent = game.jogo; // Altere conforme necessário para o nome do jogo
      select.appendChild(option);
    });
  } catch (error) {
    // Se houver um erro na chamada HTTP
    select.innerHTML = "";
    var errorOption = document.createElement("option");
    errorOption.textContent = "Erro ao carregar jogos";
    select.appendChild(errorOption);
  }
});

async function submitForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const jsonData = formDataToJson(formData);
  localStorage.setItem("email", jsonData.email);

  // Exibir o loading
  const loadingMessage = document.createElement("div");
  loadingMessage.textContent = "Cadastrando...";
  loadingMessage.style.position = "fixed";
  loadingMessage.style.left = "50%";
  loadingMessage.style.top = "50%";
  loadingMessage.style.transform = "translate(-50%, -50%)";
  loadingMessage.style.fontSize = "20px";
  loadingMessage.style.color = "white";
  loadingMessage.style.zIndex = "1000";
  loadingMessage.style.background = "rgba(0,0,0,0.8)";
  loadingMessage.style.border = "3px solid white";
  loadingMessage.style.padding = "10px 20px";
  loadingMessage.style.borderRadius = "10px";
  loadingMessage.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  document.body.appendChild(loadingMessage);

  // Aguarda 3 segundos
  setTimeout(async () => {
    try {
      const jsonData = formDataToJson(formData);

      const response = await axios.post(BASE_URL + "register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.codIngressoUpper) {
        localStorage.setItem("codIngresso", response.data.codIngressoUpper);
        localStorage.setItem("email", response.data.email);
      }

      // Remover a mensagem de loading
      document.body.removeChild(loadingMessage);

      // Redireciona para a página de ticket
      window.location.href = "ticket.html";
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      document.body.removeChild(loadingMessage); // Garante a remoção do loading se houver erro
    }
  }, 3000);
}

async function submitFormIngress(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  // Exibir o loading
  const loadingMessage = document.createElement("div");
  loadingMessage.textContent = "Carregando...";
  loadingMessage.style.position = "fixed";
  loadingMessage.style.left = "50%";
  loadingMessage.style.top = "50%";
  loadingMessage.style.transform = "translate(-50%, -50%)";
  loadingMessage.style.fontSize = "20px";
  loadingMessage.style.color = "white";
  loadingMessage.style.zIndex = "1000";
  loadingMessage.style.background = "rgba(0,0,0,0.8)";
  loadingMessage.style.border = "3px solid white";
  loadingMessage.style.padding = "10px 20px";
  loadingMessage.style.borderRadius = "10px";
  loadingMessage.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  document.body.appendChild(loadingMessage);

  // Aguarda 3 segundos
  setTimeout(async () => {
    try {
      const jsonData = formDataToJson(formData);
      const response = await axios.post(BASE_URL + "ingressUser", jsonData);

      if (response.data.codIngresso) {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("codIngresso", response.data.codIngresso);
      }

      // Remover a mensagem de loading
      document.body.removeChild(loadingMessage);

      // Redireciona para a página de ticket
      window.location.href = "ticket.html";
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      document.body.removeChild(loadingMessage); // Garante a remoção do loading se houver erro
    }
  }, 3000);
}
