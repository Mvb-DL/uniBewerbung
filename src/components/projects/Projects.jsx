import Title from "../common/Title";
import { useGlobalState } from "../../components/changeLang/ChangeLang";
import React, { forwardRef } from 'react';

const Projects = forwardRef((props, ref) => {

    const { data } = useGlobalState();

    return (

    <div ref={ref} className="experience-sc resume-block">
        <div className="container">
          <div className="experience-content dotted-border-left">

            <Title titleText={data.titles.title_ten}  />

            <div className="experience-list grid">

                {data.projects.map((item) => (

                  <ProjectItem key={item.id} item={item} />

                ))}

                {data.projects_two.map((item) => (

                <ProjectItemTwo key={item.id} item={item}></ProjectItemTwo>

                ))}
             
            </div>
          </div>
        </div>
      </div>
    );
});

export default Projects;



const ProjectItem = ({ item }) => {
  
    return (

      <div className="experience-item project-sc" key={item.id} style={{border: "solid 2px white", borderRadius: "15px", padding: "2%", margin: "1%"}}>

        <div className="exp-position flex items-center flex-wrap">
          <h2 className="exp-position-text">{item.name}</h2>
          <div className="diamond-shapes-group">
            
          </div>
        </div>

        <div className="exp-company flex items-center flex-wrap">
          <p className="company-name">{item.short_desc}</p>
        </div>

        <p className="exp-description text">
                {item.desc}
        </p>
        <p className="exp-description text">
                {item.next_desc}
        </p>

        <div className="link-container ">
                <a target="_blank" href={item.link_one}>{item.link_one_text}</a>
                <a target="_blank" href={item.link_two}>{item.link_two_text}</a> 
        </div>

        <div className="projects-images">

            <img loading="lazy" src={item.pic_two}></img>
            <img loading="lazy" src={item.pic_three}></img>
            <img loading="lazy" src={item.pic_one} className="wide"></img>

        </div>

      </div>
    );
  };


  const ProjectItemTwo = ({ item }) => {
  
    return (

      <div className="experience-item project-sc" style={{border: "solid 2px white", borderRadius: "15px", padding: "2%", margin: "1%"}}>

        <div className="exp-position flex items-start flex-wrap github-container">

          <h2 className="exp-position-text">{item.github}</h2>

            <p><a href="https://github.com/Mvb-DL" target="_blank">{item.github_desc}</a></p>

            <div className="github-images">

                <img loading="lazy" src={item.github_pic_one} alt="MetaMerce"></img>
                <img loading="lazy" src={item.github_pic_two} alt="Munich Pieces"></img>

            </div>

        </div>

        <div className="exp-position flex items-center flex-wrap github-container">
            
          <h2 className="exp-position-text">{item.bike}</h2>

          <p>{item.bike_desc}</p>

          <div className="bike-images">

                <img loading="lazy" src={item.bike_pic_one} alt="Bike One"></img>
                <img loading="lazy" src={item.bike_pic_two} alt="Bike Two"></img>
                <img loading="lazy" src={item.bike_pic_three} alt="Bike Three"></img>

            </div>
         
        </div>

        
        <div className="exp-position flex items-end flex-wrap github-container">
            
            <h2 className="exp-position-text">SDW e.V.</h2>
            <h4 className="exp-position-text">Sustainable Digital Projects Wuerzburg e.V.</h4>

            <p>{item.sdw}</p>
           
          </div>
       

      </div>
    );
  };
  