import Title from "../common/Title";
import React, { useState } from 'react';
import { useGlobalState } from "../changeLang/ChangeLang"

const LifeLine = () => {

    const { data } = useGlobalState();

  return (

	<div className="lifeline-sc resume-block">

	<div className="container">

	  <div className="dotted-border-left">

		<Title titleText={data.titles.title_eleven}/>

		<div className="lifeline-item">

			<div className="flex-parent line">
				<div className="input-flex-container">
					<div className="input">
						<span data-year="2013" data-info={data.lifeline.monte}></span>
					</div>
					<div className="input">
						<span data-year="2013" data-info={data.lifeline.waldorf}></span>
					</div>
					<div className="input">
						<span data-year="2019" data-info={data.lifeline.abitur}></span>
					</div>
					<div className="input">
						<span data-year="2019-2020" data-info={data.lifeline.uni}></span>
					</div>
					<div className="input">
						<span data-year="2020-2024" data-info={data.lifeline.e_com}></span>
					</div>
					<div className="input">
						<span data-year="2023" data-info={data.lifeline.danzig}></span>
					</div>
					<div className="input">
						<span data-year="2023" data-info={data.lifeline.pillap}></span>
					</div>
					<div className="input">
						<span data-year="2023" data-info={data.lifeline.full}></span>
					</div>
					<div className="input">
						<span data-year="2023" data-info={data.lifeline.erasmus}></span>
					</div>
					
					<div className="input">
						<span data-year={data.lifeline.now} data-info={data.lifeline.future}></span>
					</div>
				</div>
			</div>

		</div>
	   
	  </div>

	</div>
  </div>
    
  );
};

export default LifeLine;