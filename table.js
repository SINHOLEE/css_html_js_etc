const restaurant = document.querySelector(".restaurant");
// asc: true, desc: false
const orderAPI = function() {
  const fields = ["name", "price", "kcal"];
  const orderState = {
    price: true,
    kcal: true,
  };

  const getOrderState = key => orderState[key];
  const toggleOrderState = key => {
    orderState[key] = !orderState[key]
  }

  return {fields, getOrderState, toggleOrderState}
}

const menus = [
    {"name": "짜장면",
    "price": 3000,
    "kcal": 300,},
    {"name": "짬뽕",
    "price": 3500,
    "kcal": 350,},
    {"name": "울면",
    "price": 4000,
    "kcal": 200,},
    {"name": "특수짜장",
    "price": 3800,
    "kcal": 340,},
]
// 토글변수를 클로저로 관리하고 싶었는데 실패....
const {fields, getOrderState, toggleOrderState} = orderAPI();

const getMenusByKey = (key) => {
  const deepcopiedMenus = [...menus];
  if (key==""){
      return deepcopiedMenus;
  }
  const toggle = getOrderState(key);
  deepcopiedMenus.sort(function(a,b){
      return (a[key] <= b[key]?1 :-1)  * (toggle ? -1:1 )
  });
  return deepcopiedMenus;
}

// 이 부분이랑 밑에 getMenuByKey 이거를 조금 더 깔끔하게... if else없이 구현할 수 있는 방법 없을까?
// 해결
const renderTableHandler=(e)=>{
  toggleOrderState(e.target.abbr);
  const deepcopiedMenus = getMenusByKey(e.target.abbr);
  OrderTable(deepcopiedMenus);
}

const OrderTable = (menus) => {
    const total = {
        "price": 0,
        "kcal": 0
    }
    // 기존에 있는 돔 안의 값을 변경하면서 비용 최소화
    // restaurant 돔에서 쿼리셀렉터로 접근하는것 vs 최상단 doc element에서 id로 접근하는 법 뭐가 더 빠를까?
    // const trList = restaurant.querySelector("tbody").children;
    const trList = document.getElementById("menu-tbody").childNodes;  // static collection으로 루프를 돌리는 것이 원하는 방법으로 동작한다.
    menus.map((menu, menu_idx) => {
        const tr = trList[menu_idx].childNodes;
        fields.forEach((field, field_idx) => {
            const t = tr[field_idx];
            if (field ==="name"){
                t.scope = "row";
                t.innerText = menu[field];
            } else {
                total[field] += menu[field];
                t.innerText = menu[field];
            }
        })
    })
    // 총가격... 은 변하지 않을테니 생략해도 될듯!
    // const footerEls = restaurant.querySelectorAll("tfoot tr th, tfoot tr td");
    // fields.forEach((field, idx) => {if(idx>0){footerEls[idx].innerText = total[field]}})
}

const renderTable = (menus) => {
    // 기존의 tbody, tfoot 삭제
    const tbody = document.getElementById("menu-tbody");
    console.log("t", tbody)
    const dogFrac = new DocumentFragment();
    // 학수형 말대로 total이라는 오브젝트를 관리해보자.
    const total = {
        "price": 0,
        "kcal": 0
    }
    menus.map(value => {
        const tr = document.createElement("tr");
        fields.forEach(field => {
            if (field ==="name"){
                const t = document.createElement("th");
                t.scope = "row";
                t.innerText = value[field];
                tr.appendChild(t);
            } else {
                const t = document.createElement("td");      
                total[field] += value[field];
                t.innerText = value[field];
                tr.appendChild(t);
            }
        })
        dogFrac.appendChild(tr);
    })
    tbody.appendChild(dogFrac);
    restaurant.appendChild(tbody);
    const footerEls = document.getElementById("menu-tfoot").firstElementChild.children; // HTMLCollection type...아 이거 동적이라서 살짝 불안한데
    console.log(footerEls);
    // 두 코드 중 차이가 있는지? 없는지?
    // dom 객체 제어
    // footerEls.forEach((el, idx) => {if(idx>0){el.innerText = total[fields[idx]]}})
    
    // fields 객체 제어
    fields.forEach((field, idx) => {if(idx>0){footerEls[idx].innerText = total[field]}})
    // 총 가격
};


function init() {
    const colHeads = document.getElementById("menu-thead").childNodes;
    renderTable([...menus])
    colHeads.forEach(el => el.addEventListener("click", renderTableHandler));
}

init();