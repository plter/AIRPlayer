const Tpl = require("./MainView.html");
import "./MainView.css"

const MainView = Vue.component("main-view", {
    template: Tpl,
    methods: {

        getOptionsMenu() {
            if (!this._optionsMenu) {
                this._optionsMenu = this._optionsMenu || new electron.remote.Menu();
                const appPath = electron.remote.app.getAppPath();

                this._optionsMenu.append(new electron.remote.MenuItem({
                    label: "扫描本地音乐",
                    icon: path.join(appPath, "lib", "icons", "refresh.png"),
                    click() {
                        alert("扫描本地音乐");
                    }
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