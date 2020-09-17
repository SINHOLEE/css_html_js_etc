const restruant = document.querySelector(".restruant");
const fields = ["name", "price", "kcal"];
const menus = [
    {
        "name": "짜장면",
        "price": 3000,
        "kcal": 300,
    },
    {
        "name": "짬뽕",
        "price": 3500,
        "kcal": 350,
    },
    {
        "name": "울면",
        "price": 4000,
        "kcal": 200,
    },
    {
        "name": "특수짜장",
        "price": 3800,
        "kcal": 340,
    },
]
// 토글변수를 클로저로 관리하고 싶었는데 실패....
// hs : priceToggle === true 면 오름차순인가, 내림차순인가 알기 어려움
// ex) let isPriceOrderedByAsc = true;
//     let iskcalOrderedByAsc = true;
let priceToggle = true;
let kcalToggle = true;


// hs : 전역 변수로 관리하려면 get 함수를 안써도 될 듯
// ex) function togglePrice(){
//        isPriceOrderedByAsc = !isPriceOrderedByAsc;
//     }
function getPriceToggle() {
    priceToggle = !priceToggle;
    return priceToggle;
}
function getKcalToggle() {
    kcalToggle = !kcalToggle;
    return kcalToggle;
}

// sortBtSomething 더 생길때마다 하나하나 함수를 더 만들어야하나? 뭔가 이것도 통합되는 함수 만들 수 있을거같은데...ㅠ
// 해결 ...ㅎㅎ
// hs : getMenusByKey 인데 실제로는 toggle 행위를 함, toggleMenusByKey 가 더 어울릴 듯
const getMenusByKey = (key) => {
    // hs : getPriceToggle() 은 사용하지 않는 함수인건가
    const tempToggle = getKcalToggle();
    // const deepcopiedMenus = JSON.parse(JSON.stringify(menus));
    // hs : spread 연산자를 이용하여 분해한 후 다시 {}, []로 감싸줘서 새로운 객체, 배열 만들기 가능
    const deepcopiedMenus = [...menus];
    // hs :  꼭 필요한 경우가 아니면 == 연산자 대신 === 연산자 사용하기
    if (key === "") {
        return deepcopiedMenus;
    }
    deepcopiedMenus.sort(function (a, b) {
        return (a[key] <= b[key] ? 1 : -1) * (tempToggle ? -1 : 1)
    });
    return deepcopiedMenus;
}


// 이 부분이랑 밑에 getMenuByKey 이거를 조금 더 깔끔하게... if else없이 구현할 수 있는 방법 없을까?
// 해결
const renderTableHandler = (e) => {
    renderTable(e.target.abbr);
}

// const totalNumHandler = (field, tPrice, tKcal, value) => {
//     if (field === "price") {
//         return [tPrice + value, tKcal];
//     } else {
//         return [tPrice, tKcal + value];
//     }
// }

const renderTable = (key) => {
    // 기존의 tbody, tfoot 삭제
    restruant.removeChild(restruant.querySelector("tbody"));
    const tbody = document.createElement("tbody");
    // hs : 아래 코드 보니까 value[field] 로 구분하길래 total도 field를 key로 관리하게 수정해봄
    // let totalPrice = 0;
    // let totalKcal = 0;
    const total = {
        price: 0,
        kcal: 0
    }
    const deepcopiedMenus = getMenusByKey(key);
    deepcopiedMenus.map(value => {
        const tr = document.createElement("tr");
        fields.forEach((field) => {
            // idx 0 이 name 인걸 몰라도 코드만 보고 알 수 있게 조건문을 수정
            // if (idx === 0) {
            if (field === 'name') {
                const t = document.createElement("th");
                t.scope = "row";
                t.innerText = value[field];
                tr.appendChild(t);
            } else {
                const t = document.createElement("td");
                // [totalPrice, totalKcal] = totalNumHandler(field, totalPrice, totalKcal, value[field]);
                // hs : totalPrice, totalKcal이 입력으로 들어가서 다시 출력으로 갱신되는 과정이 복잡해 보임.
                total[field] += value[field];
                t.innerText = value[field];
                tr.appendChild(t);
            }
        })
        tbody.appendChild(tr);
    })
    restruant.appendChild(tbody);
    const totalPriceEls = restruant.querySelectorAll("tfoot td");
    // 총 가격
    totalPriceEls[0].innerText = total['price'];
    totalPriceEls[1].innerText = total['kcal'];
};


function init() {
    const colHeads = restruant.querySelectorAll("thead > tr > th");
    console.log(colHeads);
    colHeads.forEach(el => el.addEventListener("click", renderTableHandler));

    // 왜 map으로 순환돌리면 안되는거냐.... 
    // -> map은 새로운 객체를 만드는 것이기 때문에 이벤트리스너를 붙일 수 없다.
    // colHeads.map(el => el.addEventListener("click", renderTableHandler));
}

init();