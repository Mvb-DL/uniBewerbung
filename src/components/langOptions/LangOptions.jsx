import { useGlobalState } from "../../components/changeLang/ChangeLang"
import DATA_EN from '../../constant/mockDataEn'; 
import DATA from '../../constant/mockData'; 
import React, { useState } from 'react';

const LangOptions = () => {

  const { updateData } = useGlobalState();

  const [isEnglish, setIsEnglish] = useState(false);

  const handleUpdateData = () => {
    if (isEnglish) {
      updateData(DATA);
    } else {
      updateData(DATA_EN);
    }
    setIsEnglish(prevState => !prevState);
  };

  

  return (

    <div className="lo-sc">

    <div className="stickyText">

        <div className="change_lang">
           <p onClick={handleUpdateData}>
           {isEnglish ? 'DEUTSCH' : 'ENGLISH'}</p> 
        </div>

      </div>

    </div>
  );
};

export default LangOptions;