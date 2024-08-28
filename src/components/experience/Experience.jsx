import React, { forwardRef } from 'react';
import { FaLink } from "react-icons/fa6";
import Title from "../common/Title";
import PropTypes from "prop-types";
import { DiamondLgBlue, DiamondLgGreen, DiamondLgOrange, DiamondLgPink, DiamondLgYellow } from "../../assets/image";
import { useGlobalState } from "../../components/changeLang/ChangeLang";

const Experience = forwardRef((props, ref) => {

  const { data } = useGlobalState();

  return (
    
    <div ref={ref} className="experience-sc resume-block">
      <div className="container">
        <div className="experience-content dotted-border-left">
          <Title titleText={data.titles.title_one} />
          <div className="experience-list grid">
            {data.professionalExperiences.map((item) => (
              <ExperienceItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Experience;

const ExperienceItem = ({ item }) => {
  const showDiamondImage = (color) => {
    switch(color) {
      case "Blue": return DiamondLgBlue;
      case "Green": return DiamondLgGreen;
      case "Orange": return DiamondLgOrange;
      case "Pink": return DiamondLgPink;
      case "Yellow": return DiamondLgYellow;
      default: return null;
    }
  };

  return (
    <div className="experience-item" key={item.id} style={{border: "solid 2px white", borderRadius: "15px", padding: "2%", margin: "1%"}}>
      <div className="exp-time flex items-center">
        <span className="start-time">{item.startDate}</span>
        <span>-</span>
        <div className="end-time">{item.endDate || "Present"}</div>
      </div>
      <div className="exp-position flex items-center flex-wrap">
        <p className="exp-position-text">{item.position}</p>
        <div className="diamond-shapes-group">
          {item.diamondColors?.map((color, index) => (
            <img key={index} src={showDiamondImage(color)} alt="" />
          ))}
        </div>
      </div>
      <div className="exp-company flex items-center flex-wrap">
        <div className="company-logo">
          <img src={item.company.logo} alt="" />
        </div>
        <p className="company-name">{item.company.name}</p>
        <p className="company-info text">{item.company.info}</p>
      </div>
      <p className="exp-description text" dangerouslySetInnerHTML={{ __html: item.description.replace(/\n/g, '<br>') }}></p>
      <div className="exp-links">
        {item.links?.map((link) => (
          <a key={link.label} href={link.url} target="_blank" className="text-mauve">
            <FaLink />
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

ExperienceItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    position: PropTypes.string.isRequired,
    diamondColors: PropTypes.array,
    company: PropTypes.shape({
      logo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
    }),
    description: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        url: PropTypes.string,
      })
    ),
  }),
};
