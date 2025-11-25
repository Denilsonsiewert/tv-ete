
async function carregarDados() {
    try {
        const response = await fetch('dados.json');
        const data = await response.json();
        const container = document.getElementById('conteudo');
        container.innerHTML = `<h2>Mês: ${data.Mes}</h2>`;
        data.Planilhas.forEach(planilha => {
            let html = `<div class="planilha"><h3>${planilha.Planilha}</h3>`;
            html += `<div class="dados">`;
            planilha.Dados.forEach(linha => {
                html += `<p>${JSON.stringify(linha)}</p>`;
            });
            html += `</div>`;
            html += `Graficos/${planilha.Planilha}_Chart1.png`;
            html += `</div>`;
            container.innerHTML += html;
        });
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

// Atualiza a cada 60 segundos
carregarDados();
setInterval(carregarDados, 60000);
