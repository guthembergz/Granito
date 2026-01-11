/* ===== MENU ===== */
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('menuOverlay');

menuBtn.onclick = () => {
  sideMenu.classList.add('open');
  overlay.classList.add('show');
};

overlay.onclick = () => {
  sideMenu.classList.remove('open');
  overlay.classList.remove('show');
};

/* ===== CRUD MATERIAIS ===== */
const lista = document.getElementById('listaMateriais');
const nome = document.getElementById('nomeMaterial');
const preco = document.getElementById('precoMaterial');
const salvar = document.getElementById('salvarMaterial');

function getMateriais() {
  return JSON.parse(localStorage.getItem('materiais')) || [];
}

function setMateriais(materiais) {
  localStorage.setItem('materiais', JSON.stringify(materiais));
}

function render() {
  lista.innerHTML = '';

  getMateriais().forEach((m, i) => {
    const div = document.createElement('div');
    div.className = 'box';
    div.innerHTML = `
      <strong>${m.nome}</strong><br>
      R$ ${m.preco.toFixed(2)}
      <br>
      <button onclick="editar(${i})">Editar</button>
      <button onclick="remover(${i})">Remover</button>
    `;
    lista.appendChild(div);
  });
}

salvar.onclick = () => {
  if (!nome.value || !preco.value) return;

  const materiais = getMateriais();
  materiais.push({
    nome: nome.value,
    preco: parseFloat(preco.value)
  });

  setMateriais(materiais);
  nome.value = '';
  preco.value = '';
  render();
};

window.editar = (i) => {
  const materiais = getMateriais();
  nome.value = materiais[i].nome;
  preco.value = materiais[i].preco;
  materiais.splice(i, 1);
  setMateriais(materiais);
  render();
};

window.remover = (i) => {
  const materiais = getMateriais();
  materiais.splice(i, 1);
  setMateriais(materiais);
  render();
};

render();
