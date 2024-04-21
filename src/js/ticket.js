// function obterParametroDaURL(nome) {
//     const urlSearchParams = new URLSearchParams(window.location.search);
//     return urlSearchParams.get(nome);
//   }

//   // Obter parâmetros da URL
//   const nome = obterParametroDaURL('nome');
//   const email = obterParametroDaURL('email');
//   const time = obterParametroDaURL('time');

//   // Substituir dados no card
//   document.getElementById('nomeUsuario').textContent = nome;
//   document.getElementById('emailUsuario').textContent = email;
//   document.getElementById('meuBotao').textContent = 'Time: ' + time;

// document.addEventListener('DOMContentLoaded', function() {
//     const imagemBase64 = localStorage.getItem('imagem');

//     if (imagemBase64) {
//       const imagem = document.createElement('img');
//       imagem.src = imagemBase64;

//       const card = document.querySelector('.card');
//       card.appendChild(imagem);
//     }
//   });

document.addEventListener("DOMContentLoaded", async function () {
  const BASE_URL = "http://localhost:3000/"; // URL base da API

  const ingressoCode = localStorage.getItem("codIngresso");
  const emailUser = localStorage.getItem("email");

  console.log(ingressoCode);
  console.log(emailUser);

  if (!ingressoCode) {
    console.error("Código do ingresso não encontrado.");
    return; // Encerra se não houver código armazenado
  }

  if (!emailUser) {
    console.error("email não encontrado.");
    return; // Encerra se não houver código armazenado
  }
  console.log("passou validações");

  try {
    const response = await axios.post(BASE_URL + "ingressUser", {
      email: emailUser,
      codigo: ingressoCode,
    });
    console.log("passou request");

    const data = response.data;
    console.log(data);

    // Atualiza os dados na página
    document.getElementById("name").getElementsByTagName("h1")[0].textContent =
      data.nome;
    document.getElementById("email").textContent = data.email;
    document.querySelector(".button-wrapper button").textContent =
      "Time: " + data.jogo;
    document.querySelector(".button-wrapper2 button").textContent =
      "#" + data.codIngresso;

    // Atualiza o QR Code com o código do ingresso
    var qrcode = new QRCode(document.getElementById("qrcode-2"), {
      text: data.codIngresso,
      width: 120,
      height: 120,
      colorDark: "#E1E1E6",
      colorLight: "transparent", // torna a cor branca transparente
      correctLevel: QRCode.CorrectLevel.H,
    });

    // Atualizar a foto do usuário
    document.querySelector(".card #fotoPerfil").src = data.foto;
  } catch (error) {
    console.error("Erro ao carregar dados do usuário:", error);
  }
});
