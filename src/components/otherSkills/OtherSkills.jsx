import Title from "../common/Title";
import DATA from "../../constant/mockData";
import { useGlobalState } from "../../components/changeLang/ChangeLang";

const OtherSkills = () => {
  
  const { data } = useGlobalState();
  
    return (
      
      <div className="other-skills-sc resume-block">

        <div className="container">

          <div className="dotted-border-left">

            <Title titleText={data.titles.title_four}/>

            <div className="skill-content">

              <h4 className="sub-headline">{data.titles.title_six}</h4>

              <div className="skill-list grid">
                
                  {DATA.otherSkills?.map((item) => (
                    <SkillItem  key={item.id} item={item}/>
                  ))} 

              </div>
                
            <h4 className="sub-headline">{data.titles.title_five}</h4>

                <div className="language-box">

                  <div>
                    
                      <li className="language-text">{data.titles.title_seven}</li>
                  </div>

                  <div><li className="language-text">{data.titles.title_eight}</li></div>

                  <div><li className="language-text">{data.titles.title_nine}</li></div>

                </div>

            </div>
           
          </div>

        </div>
      </div>
    );
  };
  
  export default OtherSkills;

  const SkillItem = ({ item }) => {

    const getClassname = () => {
      if (item.skill === "blender") {
        return "skill-per blender";
      } else if (item.skill === "design") {
        return "skill-per design";
      } 
      else if (item.skill === "ableton") {
        return "skill-per ableton";
      } 
      else if (item.skill === "micro") {
        return "skill-per micro";
      } 
      
    };
  
    return (

      <div className="text-center other-skill-container" key={item.id}>
        <div className="skills">
            <div className="skill">
                <div className="flex">
                  <p className="skill-name">{item.name}</p>
                  <img src={item.icon} alt="" className="skill-icon" />
                </div>
                <div className="skill-bar">
                  <div className={getClassname()} per={item.skill_level}></div>
                </div>
            </div>
        </div>
      </div>

    );
  };