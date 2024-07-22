import "./style.css";
import { apiHandler } from "./apiHandler";
import { UI } from "./UI";
import { DOMS } from "./DOMS";



// To be deleted
console.log("Hello, webpack!");

const readyData = apiHandler.getData();

readyData.then((data => console.log(data))).catch((error) => console.log(error));

window.addEventListener("load", () => {
    DOMS.getCityName();
});
