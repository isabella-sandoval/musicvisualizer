// import { YearlyChart } from "./state_yearly_chart";

// function renderSlider() {
//     const slider = document.createElement("div");
//     slider.setAttribute("id", "slider-container");

//     const sliderInput = document.createElement("input");
//     sliderInput.setAttribute("id", "year-slider");
//     sliderInput.setAttribute("type", "range");
//     sliderInput.setAttribute("min", "2001");
//     sliderInput.setAttribute("max", "2018");
//     sliderInput.setAttribute("value", "2018");
//     sliderInput.setAttribute("step", "1");

//     const sliderLabel = document.createElement("span");
//     sliderLabel.setAttribute("id", "slider-current-year");
//     sliderLabel.innerHTML = 2018;

//     slider.appendChild(sliderInput);
//     slider.appendChild(sliderLabel);
//     document.getElementsByClassName("us-map-container")[0].appendChild(slider);

//     document.getElementById("slider-current-year").style.left = `calc( 100% - 12.5px - ${document.getElementById("slider-current-year").offsetWidth / 2}px)`;
// }