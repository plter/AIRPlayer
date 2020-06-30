const Tpl = require("./MainView.html");
import "./MainView.css"
import Mediator from "../../../lib/puremvc/Mediator"

const MainView = Vue.component("main-view", {
    template: Tpl,
    data() {
        return {
            scanning_local_media_files: false,
            output_text: ""
        };
    },

    mounted() {

    },

    methods: {

        scanLocalMediaFiles() {
            this.scanning_local_media_files = true;
            this.output_text = "开始扫描...";
        },

        getOptionsMenu() {
            let self = this;
            if (!this._optionsMenu) {
                this._optionsMenu = this._optionsMenu || new electron.remote.Menu();
                const appPath = electron.remote.app.getAppPath();

                this._optionsMenu.append(new electron.remote.MenuItem({
                    label: "扫描本地音乐",
                    icon: path.join(appPath, "lib", "icons", "refresh.png"),
                    click() {
                        self.scanLocalMediaFiles();
                    }
                }));
                this._optionsMenu.append(new electron.remote.MenuItem({

                }));
                this._optionsMenu.append(new electron.remote.MenuItem({
                    label: "退出",
                    icon: path.join(appPath, "lib", "icons", "times.png"),
                    click() {
                        window.close();
                    }
                }));
            }
            return this._optionsMenu;
        },

        menuClicked(e) {
            this.getOptionsMenu().popup({ x: 335, y: 50 });
        }
    }
});

export default MainView;