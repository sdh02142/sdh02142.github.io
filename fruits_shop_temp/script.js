// DOM 요소
const fruitList = document.getElementById("fruitList");
const veggieList = document.getElementById("veggieList");

const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let veggiePage = 0;

// 카드 렌더링 함수
function renderProducts(data, container) {//data는 과일 또는 야채의 배열
  data.forEach(item => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
        <a href="detail.html?id=${item.id}" class="text-decoration-none text-dark">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text text-primary fw-bold">${item.price.toLocaleString()}원</p>
          </div>
          </a>
        </div>
      </div>`;
  });
}
////////아래 filterAndSortFruits() 와 loadVeggies() 완성하세요. /////////////////////////////////
/* 
  과일 출력
*/
function filterAndSortFruits() {
  const divFruit = document.querySelector('#fruitList');
  divFruit.innerHTML='';
  if(document.querySelector('#searchBox').value != ''){
    const searchfruit = fruits.filter(f => f.name.indexOf(document.querySelector('#searchBox').value) != -1);
    renderProducts(searchfruit, divFruit);
    return;
  }
  document.querySelectorAll('option').forEach((ele) => {
    if(ele.selected){
      if(ele.value == 'low') fruits.sort((s1, s2) => s1.price - s2.price);
      else if(ele.value == 'high') fruits.sort((s1, s2) => s2.price - s1.price);
      else fruits.sort((a,b) => a.name.localeCompare(b.name));
    }
  })
   //화면에 다시 출력
  renderProducts(fruits, divFruit);
}

// 채소 출력 (3개씩 증가)
function loadVeggies() {
  const divFruit = document.querySelector('#veggieList');
  let loadThreeveg = [];
   //화면에 다시 출력
   if(veggiePage >= veggies.length){
    alert('상품이 없습니다.');
    return;
   } else if (veggies.length-veggiePage < 3){
    veggies.slice(veggiePage);
    veggiePage += veggies.length-veggiePage;
   } else {
    loadThreeveg = veggies.slice(veggiePage, veggiePage+3);
    veggiePage += 3;
   }
   
  renderProducts(loadThreeveg, divFruit);
}
////////////////////////////////////////////////////////

// 이벤트 리스너
searchBox.addEventListener("input", filterAndSortFruits);
sortSelect.addEventListener("change", filterAndSortFruits);
loadMoreBtn.addEventListener("click", loadVeggies);

// 초기 실행
filterAndSortFruits();
loadVeggies();
