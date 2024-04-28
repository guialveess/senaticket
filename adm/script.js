// Função para enviar o código do ingresso e o novo status para a API
function atualizarStatusIngresso(codigo, novoStatus) {
    fetch('/api/updatestatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ codIngresso: codigo, Valido: novoStatus })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar status do ingresso. Código: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        const status = data.Valido;
        atualizarStatus(status);
    })
    .catch(error => {
        console.error('Erro ao atualizar status do ingresso:', error);
    });
}

// Função para atualizar o status no HTML
function atualizarStatus(status) {
    const paragrafo = document.getElementById('status');
    if (status === 1) {
        paragrafo.textContent = 'Ingresso válido.';
    } else {
        paragrafo.textContent = 'Ingresso inválido.';
    }
}

// Função para marcar o ingresso como resgatado
function marcarIngressoResgatado() {
    const codigo = document.getElementById('codigo').value;
    atualizarStatusIngresso(codigo, 0); // Marca o ingresso como resgatado (status 0)
}
