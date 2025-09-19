let mockData = [
  { id: 0, isDone: false, content: "React study", date: new Date().getTime() },
  { id: 1, isDone: true, content: "친구만나기", date: new Date().getTime() },
  { id: 2, isDone: false, content: "낮잠자기", date: new Date().getTime() },
];

let day = ["일", "월", "화", "수", "목", "금", "토"];
let aa = new Date();
let year = aa.getFullYear();
let month = aa.getMonth() + 1;
let date = aa.getDate();
let dayLabel = day[aa.getDay()];
let idData = 3;
const updateIdData = () => {
  for (let a = 0; a < mockData.length; a++) {
    if (idData <= mockData[a]["id"]) {
      idData = mockData[a]["id"] + 1;
    }
  }
};

onload = () => {
  //initData(mokData) 함수 호출
  initData(mockData);
  loadData();
  // 현재 날짜를 년 월 일 요일로 출력한다.
  document.querySelector("h1").innerHTML =
    year + "년 " + month + "월 " + date + "일 " + dayLabel + "요일";
};

// idIndex -> id의 값을 증가 시킬 변수(초기데이터가 2까지 있으므로 3부터 시작)
document.querySelector(".Editor > button").onclick = (event) => {
  event.preventDefault(); //전송기능 막음
  mockData.push({
    id: mockData.length,
    isDone: false,
    content: event.target.previousElementSibling.value,
    date: new Date().getTime(),
  });
  idData++;
  /*
id는 idIndex,
isDone은 기본 false,
content는 입력한 내용,
date는 new Date().getTime()
준비된 하나의 레코드를 mokData에 push()함수를 이용해서 추가한다.
*/
  initData(mockData); //호출한다.(다시 화면 랜더링)
  loadData();
};

document.body /* body 부분은 생략 가능 */
  .addEventListener("click", function async(event) {
    if (event.target.matches("[value='삭제']")) {
      let divPa = event.target.parentElement; // button -> 1개의 todo
      console.log(divPa.firstElementChild.id);
      localStorage.removeItem(divPa.firstElementChild.id);
      divPa.parentElement.removeChild(divPa);
      for (let i = 0; i < mockData.length; i++) {
        if (mockData[i]["id"] === Number(divPa.firstElementChild.id)) {
          mockData.splice(i, 1);
          console.log(mockData);
        }
      }
      updateIdData();
      loadData();
      idData--;
    }
  });

//searchTodo

const initData = (printData) => {
  for (let i = 0; i < printData.length; i++) {
    localStorage.setItem(printData[i]["id"], Object.values(printData[i]));
  }
  // mockData 배열을 forEach를 이용해서 화면에 출력한다.
  /* checkbox
onchange=”onUpdate(id값)”
todo의 isDone이 true이면 checked속성 추가
button
name속성 추가해서 value에 todo의 id 설정
onclick =”todoDel(this)” 추가
*/
};
const loadData = () => {
  if (mockData.length === 0) return;
  document.querySelector(".todos_wrapper").innerHTML = "";
  console.log(document.getElementById("searchTodo").value.trim());
  if (document.getElementById("searchTodo").value) {
    for (let i = 0; i < idData; i++) {
      if (localStorage.getItem(i)) {
        let ob = localStorage.getItem(i).split(",");
        console.log(ob[2]);
        if (
          ob[2].indexOf(document.getElementById("searchTodo").value.trim()) ===
          -1
        )
          continue;
        else {
          let checkOp = "";
          let re = new Function("return " + ob[1]);
          if (re()) checkOp = "checked";
          document.querySelector(
            ".todos_wrapper"
          ).innerHTML += `<div class="TodoItem">
            <input type="checkbox" id="${ob[0]}" ${checkOp}/>
            <div class="content">${ob[2]}</div>
            <div class="date">${new Date(Number(ob[3])).toLocaleString()}</div>
            <button onclick="" value="삭제">삭제</button>
          </div>`;
        }
      }
    }
  } else {
    for (let i = 0; i < idData; i++) {
      if (localStorage.getItem(i)) {
        let ob = localStorage.getItem(i).split(",");
        let checkOp = "";
        let re = new Function("return " + ob[1]);
        if (re()) checkOp = "checked";
        document.querySelector(
          ".todos_wrapper"
        ).innerHTML += `<div class="TodoItem">
            <input type="checkbox" id="${ob[0]}" ${checkOp}/>
            <div class="content">${ob[2]}</div>
            <div class="date">${new Date(Number(ob[3])).toLocaleString()}</div>
            <button onclick="" value="삭제">삭제</button>
          </div>`;
      }
    }
  }
};
document.getElementById("searchTodo").addEventListener("input", loadData);
