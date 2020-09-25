export const dynamic = () => {
    
    const bg = document.getElementById('bg');
    // 왜 노드를 잡을때,  div만 잡지 못하고 text - div -text 순으로 잡히나요. 그리고 이걸 해결하기 위해선 어떻게 관리해야 할까요.
    // 해결:  <div id="bg"></div> 여기서 open tag와 close tag에 개행 문자가 있다면 브라우저는 이를 node라고 인식한다.
    let imgs = null;
    // NodeList(21) 
    // [text, div#bg-img-0.img, text, div#bg-img-1.img, text, div#bg-img-2.img, 
    // text, div#bg-img-3.img, text, div#bg-img-4.img, text, div#bg-img-5.img, 
    // text, div#bg-img-6.img, text, div#bg-img-7.img, text, div#bg-img-8.img, 
    // text, div#bg-img-9.img, text]
    const toggles = [];
    
    const fill = (n) => {
        // bg 크기 설정
        bg.style["width"] = (20 * n).toString() + "px"; 
        bg.style["height"] = (20 * n).toString() + "px"; 


        // 토글 store 생성
        for (let i=0; i<n; i++){
        toggles.push(true)
        }
        
        // 구름 아이콘 생성
        const docFrag = document.createDocumentFragment();
        for (let i=0; i<n; i++){
            const div = document.createElement('div');
            div.classList.add("img");
            div.id = "bg-img-" + i.toString();
            div.style["margin-left"] = (20 * i).toString() + "px";
            docFrag.appendChild(div);
        }
        bg.appendChild(docFrag);
        imgs = bg.childNodes;
        
    }

    const parseIndex = (string) => {
        let idx = string.replace('bg', '');
        idx = idx.replace('img', '');
        idx = idx.replaceAll('-', '');
        return parseInt(idx);
    }

    const clickHandler = (e) => {
        if (!e.target.classList.contains("after-load")){
            e.target.classList.add("after-load");
        }
        const idx = parseIndex(e.target.id);
        // idx로 관리하는 방법론 관련된 이슈
        // 현재 방법은 html의 각 태그를 id로 관리하고, idx만 추출하기 위해 parseIndex라는 함수를 이용한다.
        // 이때 발생하는 이슈는
        // 1. parseIndex를 재사용 하기 위해서는 붙을 수 있는 모든 prefix를 제거하는 과정이 필요
        // 2. 모든 div에 id를 사용하게 되어, 프로젝트가 커질경우 id 관리가 어려워 질 수 있음
        if (toggles[idx]){
            imgs[idx].style["margin-left"] = "0";
            toggles[idx] = false;
        } else {
            imgs[idx].style["margin-left"] = (20 * idx).toString() + "px";
            toggles[idx] = true;
        }
        // 트랜지션 관련 이슈.
        // transition all 0.5s로 설정했을 때,
        // 변경되는 거리가 멀면 상대적으로 빨리 움직이고, 변경되는 거리가 짧으면 상대적으로 느리게 움직인다.
        // 이런 동작은 뭔가 부자연스러운 느낌이 강하게 든다.
    }
    const init = () => {
        fill(10);
        imgs.forEach(el=>el.addEventListener('click', clickHandler))
    }
    init();
}
