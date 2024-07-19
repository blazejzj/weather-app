import "./style.css";
import { apiHandler } from "./apiHandler";

console.log("Hello, webpack!");

const readyData = apiHandler.getData();

readyData.then((data => console.log(data))).catch((error) => console.log(error));

