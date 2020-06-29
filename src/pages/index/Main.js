import MainView from "./controllers/MainView"
import "./style.css"

let app = document.createElement("div");
document.body.append(app);

new MainView().$mount(app);