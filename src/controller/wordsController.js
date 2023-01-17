;
import { execlToJsonVoca } from "../excelData";

export const postExcel = async (req, res) => {

  const vocas =  execlToJsonVoca();
  
  return res.json(vocas);
};
