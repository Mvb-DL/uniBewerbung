import { Mario } from "../../assets/image";
import { useGlobalState } from "../../components/changeLang/ChangeLang";
import TagCloud from 'TagCloud';
import React, { useEffect, useState } from 'react';

const Biopic = ({ refs }) => {

  const container = '.content';
  const options = {
    radius: 100,
    maxSpeed: 'normal',
    initSpeed: 'normal',
    direction: 135,
    keep: true
  };

  const { data } = useGlobalState();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      TagCloud(container, data.cloud_text, options);
      setInitialized(true);
    }
  }, [initialized, data.cloud_text, options]);

  const handleScroll = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="biopic-sc resume-block">
      <div className="container">
        <div className="biopic-content grid">
          <div className="biopic-intro item_one1">
            <h2 className="biopic-header-name">
              {data.biopic_text.header_name}
            </h2>
            <img width={"100%"} height={"100%"} loading="lazy" src={Mario} alt="Mario" className="me" />
            <p className="pic-text">{data.biopic_text.pic_text}</p>
            <div className="content"></div>
            <ul className="biopic-text text-white">
              <li id="head_attr">{data.biopic_text.hobbies}</li>
              <li id="attr">{data.biopic_text.hobbies_attr}</li>
              <br />
              <li id="head_attr">{data.biopic_text.interest}</li>
              <li id="attr">{data.biopic_text.interest_attr}</li>
              <br />
              <div className="link-container">
                <a target="_blank" href="./docs/lebenslauf.pdf">{data.biopic_text.cv}</a>
                <a target="_blank" href="./docs/noten_mariovonbassen.pdf">{data.biopic_text.notes}</a>
              </div>
            </ul>
            <div className="link-container-big">
              <a target="_blank" href="./docs/lebenslauf.pdf">{data.biopic_text.cv}</a>
              <a target="_blank" href="./docs/noten_mariovonbassen.pdf">{data.biopic_text.notes}</a>
            </div>
          </div>

          <div className="item_one2 website_structure">
            <section className="design-section">
              <h2 className="start-text">Start</h2>
              <div className="timeline">
                <div className="timeline-empty"></div>
                <div className="timeline-left"></div>
                <div className="timeline-component timeline-content" onClick={() => handleScroll(refs.experienceRef)}>
                  <h4 className="text-center">{data.biopic_text.exp}</h4>
                </div>
                <div className="timeline-component timeline-content" onClick={() => handleScroll(refs.educationRef)}>
                  <h4 className="text-center">{data.biopic_text.ausbildung}</h4>
                </div>
                <div className="timeline-middle">
                  <div className="timeline-circle-middle"></div>
                </div>
                <div className="timeline-right">
                  <div className="timeline-circle-right"></div>
                </div>
                <div className="timeline-middle-leftover">
                  <div className="timeline-circle-right-leftover"></div>
                </div>
                <div className="timeline-left">
                  <div className="timeline-circle"></div>
                </div>
                <div className="timeline-component timeline-content" onClick={() => handleScroll(refs.skillRef)}>
                  <h4 className="text-center">{data.biopic_text.skills}</h4>
                </div>
                <div className="timeline-component timeline-content" onClick={() => handleScroll(refs.projectRef)}>
                  <h4 className="text-center">{data.biopic_text.projects}</h4>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Biopic;
