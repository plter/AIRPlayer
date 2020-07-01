import "./style.css"
import Facade from "../../lib/puremvc/Facade"
import MainViewMediator from "./controllers/MainViewMediator";
import MediaDirectoriesProxy from "./proxies/MediaDirectoriesProxy";
import PlaylistProxy from "./proxies/PlaylistProxy";

let facade = Facade.getInstance("main");
facade.registerMediator(new MainViewMediator());
facade.registerProxy(new MediaDirectoriesProxy());
facade.registerProxy(new PlaylistProxy());
