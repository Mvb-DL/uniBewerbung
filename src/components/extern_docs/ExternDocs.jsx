import Title from "../common/Title";
import { useGlobalState } from "../../components/changeLang/ChangeLang"

const ExternDocs = () => {

  const { data } = useGlobalState();

  return (

    <div className="extern_doc resume-block">
      
      <div className="container">
        
        <div className="extern_content">
          
          <Title titleText={"Externe Dokumente"} />

            <div className="extern-item text-center">
            <div className="skill-item">
              
                <a href={data.externDocs.realpdf} target="_blank">

                <img className="extern_img" src={data.externDocs.logo} alt="" />
                <h3>Lebenslauf</h3>

            </a>
                </div>
          </div>

          
          <div className="extern-item text-center">
            <div className="skill-item">
            <img className="extern_img" src={DATA.externDocs.notes} alt="" />
            <h3>Notenauszug</h3></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternDocs;
