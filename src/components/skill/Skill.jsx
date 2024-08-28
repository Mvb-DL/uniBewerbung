import { useGlobalState } from "../../components/changeLang/ChangeLang"
import Title from "../common/Title";
import PropTypes from "prop-types";
import React, { useState, forwardRef } from 'react';

const Skill = forwardRef((props, ref) => {

  const { data } = useGlobalState();

  return (
    <div ref={ref} className="skill-sc resume-block" >
      <div className="container" >
        <div className="skill-content dotted-border-left">
          <Title titleText={data.titles.title_three}  />
          <div className="skill-list grid">
            {data.skills?.map((item) => (
              <SkillItem key={item.id} item={item}   
                />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Skill;



const SkillItem = ({ item }) => {

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  const getClassname = () => {
    if (item.skill === "python") {
      return "gas ar";
    } else if (item.skill === "js") {
      return "gas js";
    } 
    else if (item.skill === "c") {
      return "gas c";
    } 
    else if (item.skill === "kotlin") {
      return "gas ko";
    } 
    else if (item.skill === "solidity") {
      return "gas so";
    } 
    else if (item.skill === "bash") {
      return "gas ba";
    } 
    else if (item.skill === "php") {
      return "gas php";
    } 
    else if (item.skill === "html") {
      return "gas html";
    } 
    else {
      return "";
    }
  };

  return (

      <div className={`skill-item text-center ${getClassname()} ${isHovered ? 'hovered' : ''}`} key={item.id}
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}>

      <div className="skill-item-inner">

        <div className="front">
        {isHovered ? "" :
            <div className="skill-icon">
             <img src={item.icon} alt="icon" /> 
            </div> }

            <div className="skill-info">
                <h3 className="skill-name">{isHovered ? "" : item.name}</h3>
                <p className="skill-description text">{isHovered ? "" : item.description}</p>
            </div>

            <div>
               <span><h3><b>{isHovered ? "" :"Skill-Level:"}</b></h3> <h2 className="skill_level">{isHovered ? "" : item.skill_level}</h2></span>
            </div>

        </div>

        <div className="back">

            <h3>{isHovered ? item.project_name : ""}</h3>
            <p>{isHovered ? item.project_description : ""}</p>

            {isHovered ?  <a className="project-link" target="_blank" href={item.project_link}>
              <p className="link-p">Code</p>
                </a> : ""
            }
             
        </div> 
      </div>

    </div>

  );
};

SkillItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    skill_level: PropTypes.string.isRequired,

  }),
};
