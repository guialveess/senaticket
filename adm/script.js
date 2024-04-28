// Função para enviar o código do ingresso e o novo status para a API
function atualizarStatusIngresso(codigo, novoStatus) {
  fetch("/api/updatestatus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ codIngresso: codigo, Valido: novoStatus }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Erro ao atualizar status do ingresso. Código: " + response.status
        );
      }
      return response.json();
    })
    .then((data) => {
      const status = data.Valido;
      atualizarStatus(status);
    })
    .catch((error) => {
      console.error("Erro ao atualizar status do ingresso:", error);
    });
}

// Função para atualizar o status no HTML
function atualizarStatus(status) {
  const paragrafo = document.getElementById("status");
  if (status === 1) {
    paragrafo.textContent = "Ingresso válido.";
  } else {
    paragrafo.textContent = "Ingresso inválido.";
  }
}

// Função para marcar o ingresso como resgatado
function marcarIngressoResgatado() {
  const codigo = document.getElementById("codigo").value;
  atualizarStatusIngresso(codigo, 0); // Marca o ingresso como resgatado (status 0)
}

async function tocarSom() {
  console.log("CHEGOU AQUI");
  var audio = new Audio("check.mp3");
  audio.addEventListener("canplaythrough", function () {
    audio.play();
  });
}

function formDataToJson(formData) {
  const json = {};
  formData.forEach((value, key) => {
    json[key] = value;
  });
  return json;
}

async function onScanSuccess(qrCodeMessage) {
  await tocarSom();

  console.log(qrCodeMessage);

  const objCheck = {
    codIngresso: qrCodeMessage,
    valido: false,
  };

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

  setTimeout(async () => {
    try {
      //const jsonData = formDataToJson(objCheck);
      const response = await axios.post(BASE_URL + "changeIngress", objCheck);

      console.log(response);

      // Remover a mensagem de loading
      document.body.removeChild(loadingMessage);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      document.body.removeChild(loadingMessage); // Garante a remoção do loading se houver erro
    }
  }, 3000);
}
function onScanError(errorMessage) {
  //handle scan error
}

var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 250,
});

html5QrcodeScanner.render(onScanSuccess, onScanError);