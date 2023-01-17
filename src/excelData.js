import xlsx from "xlsx";

export const books = xlsx.readFile(__dirname + "/../public/toeic_voca.xlsx");


export const execlToJsonVoca = (req,res) => {

  const sheet = books.Sheets["Sheet1"];
  const datas = xlsx.utils.sheet_to_json(sheet);
//

  const json = {};  
  for(let i = 0;i< datas.length; i++) {
      let day = datas[i]['Day']

      const a = day.substring(3);
      console.log(a);

      const noDayVoca = {
        'voca' : datas[i]['단어'],
        'mean' : datas[i]['뜻'],
      }

      if(json[a]  == undefined) {
        json[a] = [];
      }
      json[a].push(noDayVoca);
  } 

  console.log(json);
  
 

  return json;
} 
