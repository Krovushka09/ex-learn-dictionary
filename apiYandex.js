async function useTranslateApi(findText){
    const response = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20210719T110344Z.d10dc7be15af410e.076c0dcf9789baf9ea84c3ef96a4ac08855547a5&lang=en-ru&flags=4&text=${findText}`);
    const answer = await response.json();
    console.log('answer', answer);
    return answer.def[0]?.tr[0]?.text ?? false;
    /*
    let url = `https://translate.yandex.ru/?lang=en-ru&text=${findText}`;
    let translate = '';
    //try-catch block
    try{
      translate = answer.def[0].tr[0].text;
    }catch{
      //alert('Неприавльно выделено слово!');
      console.log('meh, fix this, cmon, html/css can wait')
    }
    */
    return createResultObj(answer);
}

function createResultObj(answer) {

  let result = {};
  for(let i = 0; i < answer.def.length; i++){
    result[`tr${i}`] =  getArrayWords(answer, i);
  }

  function getArrayWords(answer, position) {
    let arr = [];
    for(let i = 0; i < answer.def[position].tr.length; i++){
      arr.push(answer.def[position].tr[i].text);
    }
    return arr;
  }

  return result;
}

//module.exports = translateWord;