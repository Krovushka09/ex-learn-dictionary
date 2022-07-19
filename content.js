document.body.addEventListener('click', createPopup);

let but = document.querySelector('modal-button');

let popupIsExist = false;
const words = {
    en: '',
    ru: '',
};

function getSelectedText(){
    let selection = window.getSelection();
    let text = selection.toString();
    return  text;
};

async function createPopup(event){
    if (popupIsExist){
        let popup = document.querySelector('.modal-popup');
        document.body.removeChild(popup);
        popupIsExist = false;
    }
    let selectedText = getSelectedText();
    if (!selectedText) return;
    let wordsObj = await useTranslateApi(selectedText);
    console.log(wordsObj);
    if (!wordsObj){
        console.log('failed translate');
        return;
    }
    //let firstDef = wordsObj.tr0[0];
    let firstDef = wordsObj;
    popupTameplate(event, selectedText, firstDef);

    console.log('content');
    console.log(wordsObj);
    console.log(firstDef);
    words.en = selectedText;
    words.ru = firstDef;

    let addButton = document.querySelector('.modal-button');
    addButton.addEventListener('click', addWords);
}

function popupTameplate(event, selectedText, translatedteWord){
    let div = document.createElement('div');

    div.className = 'modal-popup center';
    div.innerHTML = `<div>
        <div>${selectedText}</div>
        <div>${translatedteWord}</div>
        <button class="modal-button">Add</button>
    </div>`;

    div.style.top = `${event.clientY + 12}px`;
    div.style.left = `${event.clientX - 20}px`;

    document.body.append(div);
    popupIsExist = true;
}

function addWords(){
    let popup = document.querySelector('.modal-popup');
    document.body.removeChild(popup);
    document.getSelection().empty();
    popupIsExist = false;

    chrome.runtime.sendMessage({
        from:"content",
        en: words.en,
        ru: words.ru
    });
}
/*
chrome.runtime.onMessage.addListener(function(msg) {
    if (msg.from == "background") {
        console.log(msg.from);
        console.log(msg.col);
    }
});*/
