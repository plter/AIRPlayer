import "./MainView.css"

const Tpl = require("./MainView.html");

const MainView = Vue.component("main-view", {
    template: Tpl,
    data() {
        return {
            scanning_local_media_files: false,
            output_text: "",
            playlist: []
        };
    },

    mounted() {

    },

    methods: {

        addMediaFileToPlaylist(filepath) {
            this.playlist.push(filepath);
        },

        getOptionsMenu() {
            let self = this;
            if (!this._optionsMenu) {
                this._optionsMenu = this._optionsMenu || new electron.remote.Menu();
                const appPath = electron.remote.app.getAppPath();

                this._optionsMenu.append(new electron.remote.MenuItem({
                    label: "播放列表",
                    icon: path.join(appPath, "lib", "icons", "playlist.png"),
                    click() {
                        // TODO
                    }
                }));
                this._optionsMenu.append(new electron.remote.MenuItem({
                    label: "扫描本地音乐",
                    icon: path.join(appPath, "lib", "icons", "refresh.png"),
                    click() {
                        // TODO
                    }
                }));
                this._optionsMenu.append(new electron.remote.MenuItem({
                    type: "separator"
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
            this.getOptionsMenu().popup({x: 335, y: 50});
        },

        playFirst() {
            let file = this.playlist[0];
            this.$refs.player.src = file;
            this.output_text = path.basename(file);
        }
    }
});

export default MainView;