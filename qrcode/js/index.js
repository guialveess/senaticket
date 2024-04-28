// cria elemento
const video = document.createElement("video");

// nosso canvas
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

// div onde chegará nosso canvas
const btnScanQR = document.getElementById("btn-scan-qr");

// leitura desativada
let scanning = false;

// função para ligar a câmera
const encenderCamara = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      scanning = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    })
    .catch(function (error) {
      console.error('Error accessing camera:', error);
      // Trate o erro aqui, por exemplo, mostrando uma mensagem ao usuário
      Swal.fire('Erro ao acessar a câmera. Por favor, conceda permissão para acessar a câmera.');
    });
};

// funções para ligar as funções de ligar a câmera
function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}

// desligar a câmera
const cerrarCamara = () => {
  video.srcObject.getTracks().forEach((track) => {
    track.stop();
  });
  canvasElement.hidden = true;
  btnScanQR.hidden = false;
};

const activarSonido = () => {
  var audio = document.getElementById('audioScaner');
  audio.play();
}

// callback quando termina de ler o código QR
qrcode.callback = (respuesta) => {
  if (respuesta) {
    Swal.fire(respuesta)
    activarSonido();
    cerrarCamara();    
  }
};

// evento para mostrar a câmera sem o botão 
window.addEventListener('load', (e) => {
  encenderCamara();
});
