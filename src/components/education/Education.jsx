import React, { forwardRef } from 'react';
import Title from "../common/Title";
import PropTypes from "prop-types";
import { useGlobalState } from "../../components/changeLang/ChangeLang";

const Education = forwardRef((props, ref) => {
  
  const { data } = useGlobalState();
  return (
    <div ref={ref} className="education-sc resume-block">
      <div className="container">
        <div className="education-content dotted-border-left">
          <Title titleText={data.titles.title_two} />
          <div className="education-list grid">
            {data.educationalExperiences?.map((item) => (
              <EducationItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Education;

const EducationItem = ({ item }) => {
  const getClassname = () => {
    if (item.position === "begin") {
      return "education-item begin";
    } else if (item.position === "middle") {
      return "education-item middle";
    } else if (item.position === "end") {
      return "education-item end";
    }
  };

  return (
    <div className={getClassname()} id="box" key={item.id} style={{ border: "solid 2px white", borderRadius: "15px", padding: "2%" }}>
      <div className="edu-title flex items-center">
        <h3 className="edu-course">{item.course}</h3>
        <img src={item.icon} className="edu-icon" alt={item.course} />
      </div>
      <p className="edu-info text">
        {item.institution}, {item.startDate} - {item.endDate || "Present"}
        {""}<br />
        {item.degree && `(${item.degree})`}
      </p>
    </div>
  );
};

EducationItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    course: PropTypes.string.isRequired,
    institution: PropTypes.string,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    degree: PropTypes.string,
  }).isRequired,
};
