const BASE_URL = "https://api-foot-3.onrender.com/";

document.addEventListener("DOMContentLoaded", async function () {
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

    // Atualizar a foto do usuário
    document.querySelector("#fotoPerfil").src = data.foto;

    // Verifica se o ingresso é válido e adiciona a imagem de sucesso
    if (data.Valido === 0) {
      const statusImg = document.createElement("img");
      statusImg.src = "./assets/check_success.png";
      statusImg.alt = "Ingresso Válido";
      statusImg.classList.add("statusImagem");
      document.querySelector(".containerQrCodeStatus").appendChild(statusImg);
      statusImg.style.display = "block"; // Mostra a imagem se o ingresso for válido
    }

    // Atualiza o QR Code com o código do ingresso
    new QRCode(document.getElementById("qrcode-2"), {
      text: data.codIngresso,
      width: 120,
      height: 120,
      colorDark: "#ffffff",
      colorLight: "#000", // torna a cor branca transparente
      correctLevel: QRCode.CorrectLevel.H,
    });
  } catch (error) {
    console.error("Erro ao carregar dados do usuário:", error);
  }
});

function submitForm() {
  html2canvas(document.getElementById("element-to-print"), {
    useCORS: true, // Permite carregar imagens de origens cruzadas
    logging: true, // Ativa o log para diagnóstico
    letterRendering: 1,
    allowTaint: false, // Não permite renderizar imagens que não seguem a política CORS
  }).then((canvas) => {
    const pdf = new jspdf.jsPDF("p", "mm", "a4");
    let width = pdf.internal.pageSize.getWidth();
    let height = pdf.internal.pageSize.getHeight();
    let imgWidth = (canvas.width * height) / canvas.height;
    let x = (width - imgWidth) / 2;
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", x, 0, imgWidth, height);
    pdf.save("meu-ingresso.pdf");
  });
}
