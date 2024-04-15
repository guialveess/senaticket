function obterParametroDaURL(nome) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(nome);
  }
  
  // Obter parâmetros da URL
  const nome = obterParametroDaURL('nome');
  const email = obterParametroDaURL('email');
  const time = obterParametroDaURL('time');
  
  // Substituir dados no card
  document.getElementById('nomeUsuario').textContent = nome;
  document.getElementById('emailUsuario').textContent = email;
  document.getElementById('meuBotao').textContent = 'Time: ' + time;

document.addEventListener('DOMContentLoaded', function() {
    const imagemBase64 = localStorage.getItem('imagem');
  
    if (imagemBase64) {
      const imagem = document.createElement('img');
      imagem.src = imagemBase64;
      
      const card = document.querySelector('.card');
      card.appendChild(imagem);
    }
  });