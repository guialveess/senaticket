import QrScanner from "./lib/qrcodes/qr-scanner.min.js";

document.addEventListener("DOMContentLoaded", (event) => {
  const startButton = document.querySelector(".btn-success");
  const stopButton = document.querySelector(".btn-cancel");

  startButton.addEventListener("click", iniciarCamera);
  stopButton.addEventListener("click", pararCamera);
});

const BASE_URL = "https://api-foot-3.onrender.com//";

const video = document.getElementById("qr-video");
const videoContainer = document.getElementById("qr-video-container");
const camQrResult = document.getElementById("cam-qr-result");

function setResult(label, result) {
  onScanSuccess(result.data);
}

const scanner = new QrScanner(
  video,
  (result) => setResult(camQrResult, result),
  {
    onDecodeError: (error) => {
      camQrResult.textContent = error;
      camQrResult.style.color = "inherit";
    },
    highlightScanRegion: true,
    highlightCodeOutline: true,
  }
);

const updateFlashAvailability = () => {
  scanner.hasFlash().then((hasFlash) => {
    camHasFlash.textContent = hasFlash;
    flashToggle.style.display = hasFlash ? "inline-block" : "none";
  });
};

QrScanner.hasCamera().then(
  (hasCamera) => (camHasCamera.textContent = hasCamera)
);

//inicia a câmera
scanner.start().then(() => {
  updateFlashAvailability();

  QrScanner.listCameras(true).then((cameras) =>
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.id;
      option.text = camera.label;
      camList.add(option);
    })
  );
});

scanner.setInversionMode("both");

videoContainer.className = "example-style-1";
scanner._updateOverlay();

async function tocarSom() {
  var audio = new Audio("sonido.mp3");
  audio.addEventListener("canplaythrough", function () {
    audio.play();
  });
}

async function iniciarCamera() {
  scanner.start();
}

async function pararCamera() {
  scanner.stop();
}

async function onScanSuccess(qrCodeMessage) {
  await tocarSom();
  pararCamera();

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
      const response = await axios.post(BASE_URL + "changeIngress", objCheck);

      // Remover a mensagem de loading
      document.body.removeChild(loadingMessage);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      document.body.removeChild(loadingMessage); // Garante a remoção do loading se houver erro
    }
  }, 3000);
}

export { iniciarCamera, pararCamera };
