//초기 데이터
let mockData = [
{id:0, isDone:false, content:"React study", date: new Date().getTime()},
{id:1, isDone:true, content:"친구만나기", date: new Date().getTime()},
{id:2, isDone:false, content:"낮잠자기", date: new Date().getTime()},
];

// 요일 출력을 위한 배열
let day =["일","월","화","수","목","금","토"];

let idIndex= 3; // id의 값을 증가 시킬 변수(초기데이터가 2까지 있으므로 3부터 시작)

onload = () => {
    const today = new Date();
    document.querySelector('h1').innerText = `${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일 ${day[today.getDay()]}요일`;

    const todoDel = (th) => {
    //filter()함수를 이용해서 삭제하려는 대상이외의 todo만 추출해서 mockData에 담든다.
    const delId = th.name.split('=')[1];
        mockData = mockData.filter(m => m.id != delId);
        initData(mockData); //호출한다.(다시 화면 랜더링)
    }

    const onUpdate = (targetId)=>{ //TodoItem에서 호출할 때 전달한 id
        /* mockData의 state의 값들 중에 targetId와 일치하는 todoitem의 isDone 변경
        map함수를 이용한다. map함수의 결과를 mockData에 저장한다.
        */
        mockData = mockData.map(m => {
            if (m.id == targetId) {
                m.isDone = !m.isDone;
            }

            return m;
        });
    initData(mockData); //호출한다.(다시 화면 랜더링)
    }

    document.querySelector("#keyword").addEventListener('keyup', (event) => {
    let searchedTodos = getFilterData(event.target.value);
    initData(searchedTodos);
    });

    const getFilterData = (search) =>{
        //검색어가 없으면 mockData를 리턴한다.
        if(search===""){
            return mockData;
        }
        //filter함수를 이용해서 search(검색어)를 포함하고 있는 todo들를 받는다
        //filter의 결과를 리턴 한다.
        return mockData.filter(m => m.content.indexOf(search) != -1);
    }

    const initData = (arr) => {
        let todosWrapper = document.querySelector('.todos_wrapper');
        todosWrapper.innerHTML = '';
        arr.forEach((ele) => {
            const divTodo = document.createElement('div');
            divTodo.className = 'TodoItem';

            const chBox = document.createElement('input');
            chBox.type = 'checkbox'
            chBox.onchange = () => onUpdate(ele.id);
            chBox.checked = ele.isDone;
            divTodo.appendChild(chBox);

            const divContent = document.createElement('div');
            divContent.className = 'content';
            divContent.textContent = ele.content;
            divTodo.appendChild(divContent);

            const divDate = document.createElement('div');
            divDate.className = 'date';
            divDate.textContent = new Date(ele.date).toLocaleString();
            divTodo.appendChild(divDate);

            const btn = document.createElement('button');
            btn.name = `value=${ele.id}`;
            btn.onclick = function(){
                todoDel(this);
            };
            btn.textContent = '삭제';
            divTodo.appendChild(btn);

            todosWrapper.appendChild(divTodo);
        });
        
    }
    initData(mockData);

    document.querySelector(".Editor > button").addEventListener('click', function(event){
    event.preventDefault(); //전송기능 막음

    const newTodo = {
        //id는 idIndex,
        id : idIndex++,
        // isDone은 기본 false,
        isDone : false,
        // content는 입력한 내용,
        content : event.target.previousElementSibling.value,
        // date는 new Date().getTime()
        date : new Date().getTime()
    };
    event.target.previousElementSibling.value = '';

    // 준비된 하나의 레코드를 mokData에 push()함수를 이용해서 추가한다.
    mockData.push(newTodo);
    initData(mockData); //호출한다.(다시 화면 랜더링)
    });
}

