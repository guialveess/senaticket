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

    // Atualizar a foto do usuário
    document.querySelector("#fotoPerfil").src = data.foto;

    // Atualiza o QR Code com o código do ingresso
    var qrcode = new QRCode(document.getElementById("qrcode-2"), {
      text: data.codIngresso,
      width: 120,
      height: 120,
      colorDark: "#000",
      colorLight: "#f2f2f7", // torna a cor branca transparente
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
