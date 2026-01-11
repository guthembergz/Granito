const menuBtn=document.getElementById('menuBtn');
const menu=document.getElementById('sideMenu');
const overlay=document.getElementById('menuOverlay');

if(menuBtn){
menuBtn.onclick=()=>{menu.classList.add('open');overlay.classList.add('show')}
overlay.onclick=()=>{menu.classList.remove('open');overlay.classList.remove('show')}
}

const materialSelect=document.getElementById('material');
const precoSpan=document.getElementById('materialPreco');
const comp=document.getElementById('comprimento');
const larg=document.getElementById('largura');

function getMateriais(){
return JSON.parse(localStorage.getItem('materiais'))||[
{nome:'Verde Ubatuba',preco:250},
{nome:'Branco Siena A',preco:320}
];
}

function carregarMateriais(){
if(!materialSelect)return;
const mats=getMateriais();
materialSelect.innerHTML='';
mats.forEach((m,i)=>{
const opt=document.createElement('option');
opt.value=i;
opt.textContent=`${m.nome} — R$ ${m.preco.toFixed(2)}`;
materialSelect.appendChild(opt);
});
atualizar();
}

function atualizar(){
const mats=getMateriais();
const m=mats[materialSelect.value];
precoSpan.textContent=`R$ ${m.preco.toFixed(2)}`;
calcular();
}

function calcular(){
const mats=getMateriais();
const m=mats[materialSelect.value];
const c=parseFloat(comp.value)||0;
const l=parseFloat(larg.value)||0;
document.getElementById('metragemReal').textContent=(c*l).toFixed(2);
document.getElementById('metragemAjustada').textContent=(c*0.9).toFixed(2);
document.getElementById('totalReal').value='R$ '+(c*l*m.preco).toFixed(2);
document.getElementById('totalAjustado').value='R$ '+(c*0.9*m.preco).toFixed(2);
}

if(materialSelect){
materialSelect.onchange=atualizar;
comp.oninput=calcular;
larg.oninput=calcular;
carregarMateriais();
}