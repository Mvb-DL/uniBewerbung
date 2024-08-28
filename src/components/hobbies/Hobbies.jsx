import PropTypes from "prop-types";
import Title from "../common/Title";
import DATA from "../../constant/mockData";
import {Helmet} from "react-helmet";

const Hobbies = () => {


  return (
    
    <div className="hobbies-sc resume-block">
      <div className="container">
        <div className="hobbies-content dotted-border-left">
          <div className="box-container">

             

          </div>

        </div>
      </div>
    </div>
  );
};

export default Hobbies;

const HobbiesItem = ({ item }) => {
  return (
    <div className="hobbies-item flex items-center">
      <div className="hobbies-icon">
        <img src={item.icon} alt="" />
      </div>
      <div className="hobbies-text">{item.name}</div>
    </div>
  );
};

HobbiesItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
