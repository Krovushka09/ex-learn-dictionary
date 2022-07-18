document.body.addEventListener('click', createPopup);

let popupExist = false;

function getSelectedText(){
  let selection = window.getSelection();
  let text = selection.toString();
  return  text;
};

async function createPopup(event){
  let selectedText = getSelectedText();
  if (!selectedText) return;
  if (popupExist === true){
    let delAlert = document.querySelector('.modal-popup');
    let delAlert1;
    try{
      let delAlert1 = document.querySelector('.modal-popup-test');
    }catch{
      console.log('er');
    }
    document.body.removeChild(delAlert);
    popupExist = false;
    console.log('now');
    console.log(delAlert1);
    return;
  }else{
    console.log('else');
    let translatedteWord = await translateWord(selectedText);
    if (translateWord === ''){
      console.log('do nothing bruh');
      return;
    }
    let div = document.createElement('div');

    div.className = 'modal-popup center';
    div.innerHTML = `<div>${translatedteWord}</div>`;
    
    div.style.top = `${event.clientY + 12}px`;
    div.style.left = `${event.clientX - 20}px`;

    document.body.append(div);
    popupExist = true;
  }
}

async function translateWord(findText){
    const response = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20210719T110344Z.d10dc7be15af410e.076c0dcf9789baf9ea84c3ef96a4ac08855547a5&lang=en-ru&flags=4&text=${findText}`);
    console.log(response);
    const answer = await response.json();
    console.log(answer);
    let translate = '';
    //let url = `https://translate.yandex.ru/?lang=en-ru&text=${findText}`;
    try{
      translate = answer.def[0].tr[0].text;
    }catch{
      //alert('Неприавльно выделено слово!');
      console.log('meh, fix this, cmon, html/css can wait(but now hr, i guess)')
    }
    return translate;
}