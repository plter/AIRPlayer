import "./MainView.css"

const Tpl = require("./MainView.html");

const MainView = Vue.component("main-view", {
    template: Tpl,
    data() {
        return {
            scanning_local_media_files: false,
            output_text: "",
            currentPlayIndex: 0,
            playlist: [],
            playlist_visible: false,
            playing: true
        };
    },

    mounted() {

    },

    methods: {

        addMediaFileToPlaylist(filepath) {
            this.playlist.push(filepath);
        },

        showPlaylist() {
            let win = electron.remote.getCurrentWindow();
            this.playlist_visible = true;
            win.setBounds({height: 600});
        },

        getFileName(filepath) {
            return path.basename(filepath);
        },

        btnHidePlaylistClicked(e) {
            let win = electron.remote.getCurrentWindow();
            this.playlist_visible = false;
            win.setBounds({height: 48});
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
                        self.showPlaylist();
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

        btnShowInExplorerClicked(e) {
            let file = $(e.target).parents(".playlist-item").data("media_file");
            if (file) {
                electron.shell.showItemInFolder(file);
            }
            e.stopPropagation();
        },

        btnPlayMediaClicked(e) {
            let file = $(e.target).parents(".playlist-item").data("media_file");
            if (file) {
                this.playFile(file);
            }
            e.stopPropagation();
        },

        playlist_item_dbclicked(e) {
            let file = $(e.target).data("media_file");
            if (file) {
                this.playFile(file);
            }
        },


        playAtIndex(index) {
            if (this.playlist.length && index < this.playlist.length) {
                let file = this.playlist[index];
                this.playFile(file);
                this.currentPlayIndex = index;
            }
        },

        playPre() {
            let pre = this.currentPlayIndex - 1;
            if (pre < 0) {
                pre = this.playlist.length - 1;
            }
            this.playAtIndex(pre);
        },

        playNext() {
            let next = this.currentPlayIndex + 1;
            if (next > this.playlist.length - 1) {
                next = 0;
            }
            this.playAtIndex(next);
        },

        btnPlayPreClicked(e) {
            this.playPre();
        },

        btnPlayNextClicked(e) {
            this.playNext();
        },

        btnPlayOrStopClicked(e) {
            if (this.playing) {
                this.$refs.player.pause();
                this.playing = false;
            } else {
                this.$refs.player.play();
                this.playing = true;
            }
        },

        mediaEndedHandler(e) {
            // TODO 根据用户选择的循环类型进行播放
            this.playNext();
        },

        /**
         *
         * @param file {String}
         */
        playFile(file) {
            this.$refs.player.src = file;
            this.output_text = path.basename(file);
            this.playing = true;
            this.currentPlayIndex = this.playlist.indexOf(file);
            if (this.currentPlayIndex <= -1) {
                this.currentPlayIndex = 0;
            }
        },

        playFirst() {
            this.playAtIndex(0);
        }
    }
});

export default MainView;