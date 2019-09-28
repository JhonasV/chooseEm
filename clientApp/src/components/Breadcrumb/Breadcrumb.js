import React from "react";

import style from "./Breadcrumb.module.css";

let breadcrumbs = [
  { step: 1, name: "voter registration", className: style.breadcrumb_1 },
  { step: 2, name: "choose candidate", className: style.breadcrumb_2 },
  { step: 3, name: "vote review", className: style.breadcrumb_3 }
];

const Breadcrumb = ({ currentStep }) => {
  return (
    <div className={style.breadcrumb_wrapper}>
      {breadcrumbs.map(bread => {
        //If the current step is equal or bigger than the bread number the color is going to be blue and the number white
        //if else the color is white and number blue.
        let white_color = "#fff";
        let blue_color = "#00B8D8";
        let isStepReady = currentStep >= bread.step;
        return (
          <div
            key={bread.step}
            className={`${style.breadcrumb} ${bread.className} ${
              isStepReady ? style.completed_color : null
            }`}
            style={{ color: isStepReady ? white_color : blue_color }}
          >
            {bread.step}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
