let docClick = document.body.addEventListener('click', createPopup);
//let but = document.querySelector('.but');
//document.body.addEventListener('click', () => alert('hi'));
//let addBut = document.body.querySelector('.add')
//addBut.addEventListener('click', createPopup);
//but.addEventListener('click', find);

var textApi = 'resist';
var popupExist = false;

function getSelectedText(){
  let selection = window.getSelection();
  let text = selection.toString();
  //console.log(typeof(text));
  //console.log(text.length);
  /*
  прошлая версия всплывашки по нажатию на текст
  if (text.length > 0){
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
  */
  return  text;
};

function printXY(event){
  alert(event.clientX + '/' + event.clientY);
}

async function createPopup(event){
  let selectedText = getSelectedText();
  if (selectedText === ''){
    if (popupExist === true){
      let delAlert = document.querySelector('.modalPopup');
      document.body.removeChild(delAlert);
      popupExist = false;
      console.log('if 2');
      return;
    }
    return;
  }
  if (popupExist === true){
    let delAlert = document.querySelector('.modalPopup');
    document.body.removeChild(delAlert);
    popupExist = false;
    console.log('if');
  }else{
    console.log('else');
    let translatedteWord = await find(selectedText);
    let div = document.createElement('div');
    div.className = 'modalPopup center';
    div.innerHTML = `
        <div>
            ${translatedteWord}
        </div>
        <div>
            <button class='modalButton'>Add</button>
        </div>`;
    /*
    div.style.top = `300px`;
    div.style.left = `300px`;
    */
    
    div.style.top = `${event.clientY + 12}px`;
    div.style.left = `${event.clientX - 20}px`;
    /*
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.backgroundColor = 'white';
    div.style.position = 'absolute';
    */

    document.body.append(div);
    popupExist = true;
  }
}

function popFunc() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

async function find(findText){
    const response = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20210719T110344Z.d10dc7be15af410e.076c0dcf9789baf9ea84c3ef96a4ac08855547a5&lang=en-ru&flags=4&text=${findText}`);
    console.log(response);
    const answer = await response.json();
    console.log(answer);
    let translate = '';
    //let url = `https://translate.yandex.ru/?lang=en-ru&text=${findText}`;
    try{
      translate = answer.def[0].tr[0].text;
    }catch{
      alert('Неприавльно выделено слово!');
    }
    return translate;
}