import "./style.css"
import Facade from "../../lib/puremvc/Facade"
import Constants from "./Constants";
import MainViewMediator from "./controllers/MainViewMediator";
import MediaDirectoriesProxy from "./proxies/MediaDirectoriesProxy";

let facade = Facade.getInstance("main");
facade.registerMediator(new MainViewMediator());
facade.registerProxy(new MediaDirectoriesProxy());
facade.sendNotification(Constants.NOTIFICATIONS.START_UP);
