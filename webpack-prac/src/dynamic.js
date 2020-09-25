// export const dynamic = () => {
    

const bg = document.getElementById('bg');
// 왜 노드를 잡을때,  div만 잡지 못하고 text - div -text 순으로 잡히나요. 그리고 이걸 해결하기 위해선 어떻게 관리해야 할까요.
// 해결:  <div id="bg"></div> 여기서 open tag와 close tag에 개행 문자가 있다면 브라우저는 이를 node라고 인식한다.
let imgs = null;
// NodeList(21) 
// [text, div#bg-img-0.img, text, div#bg-img-1.img, text, div#bg-img-2.img, 
// text, div#bg-img-3.img, text, div#bg-img-4.img, text, div#bg-img-5.img, 
// text, div#bg-img-6.img, text, div#bg-img-7.img, text, div#bg-img-8.img, 
// text, div#bg-img-9.img, text]

const fill = (n) => {
    // bg 크기 설정
    bg.style["width"] = (20 * n).toString() + "px"; 
    bg.style["height"] = (20 * n).toString() + "px"; 

    
    // 구름 아이콘 생성
    const docFrag = document.createDocumentFragment();
    for (let i=0; i<n; i++){
        const div = document.createElement('div');
        div.classList.add("img");
        div.style["margin-left"] = (20 * i).toString() + "px";
        div.dataset.toggle = true;
        div.dataset.idx = i;
        docFrag.appendChild(div);
    }
    bg.appendChild(docFrag);
    imgs = bg.childNodes;
    
}

const clickHandler = (e) => {
    // console.log(e)
    // transition이 첫 랜더딩할때부터 있으면 그려지는 동안 구름이랑 네모칸이 움직여서 보기 시름
    if (!e.target.classList.contains("after-load")){
        e.target.classList.add("after-load");
    }

    // target.dataset으로 해결; 흠 토글로 들어간건 불리언, 넘버 등등 타입이 달라도 결국 스트링으로 나오네..
    if (e.target.dataset.toggle){
        e.target.style["margin-left"] = "0";
        e.target.dataset.toggle = "";
    } else {
        const idx = parseInt(e.target.dataset.idx);
        e.target.style["margin-left"] = (20 * idx).toString() + "px";
        e.target.dataset.toggle = true;
    }
    // 트랜지션 관련 이슈.
    // transition all 0.5s로 설정했을 때,
    // 변경되는 거리가 멀면 상대적으로 빨리 움직이고, 변경되는 거리가 짧으면 상대적으로 느리게 움직인다.
    // 이런 동작은 뭔가 부자연스러운 느낌이 강하게 든다.
}
const init = () => {
    fill(20);
    imgs.forEach(el=>el.addEventListener('click', clickHandler))
}
init();
// }
