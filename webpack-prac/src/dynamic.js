export const dynamic = () => {
    
    const bg = document.getElementById('bg');
    const imgs = bg.querySelectorAll('.img');
    
    const toggles = [];
    for (let i=0; i<imgs.length; i++){
        toggles.push(true)
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
        if (toggles[idx]){
            imgs[idx].style["margin-left"] = "0";
            toggles[idx] = false;
        } else {
            imgs[idx].style["margin-left"] = (20 * idx).toString() + "px";
            toggles[idx] = true;
        }
    }
    
    imgs.forEach(el=>el.addEventListener('click', clickHandler))
}
