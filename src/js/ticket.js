document.addEventListener("DOMContentLoaded", async function () {
  const BASE_URL = "http://localhost:3000/"; // URL base da API

  const ingressoCode = localStorage.getItem("codIngresso");
  const emailUser = localStorage.getItem("email");

  if (!ingressoCode) {
    console.error("Código do ingresso não encontrado.");
    return; // Encerra se não houver código armazenado
  }

  if (!emailUser) {
    console.error("email não encontrado.");
    return; // Encerra se não houver código armazenado
  }

  try {
    const response = await axios.post(BASE_URL + "ingressUser", {
      email: emailUser,
      codigo: ingressoCode,
    });

    const data = response.data;

    // Atualiza os dados na página
    document.getElementById("name").getElementsByTagName("h1")[0].textContent =
      data.nome;
    document.getElementById("email").textContent = data.email;
    document.querySelector(".button-wrapper button").textContent =
      "Jogo: " + data.jogo;
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
