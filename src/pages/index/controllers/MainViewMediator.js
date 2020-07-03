import Mediator from "../../../lib/puremvc/Mediator"
import MainView from "./MainView";
import Constants from "../Constants";
import PlaylistProxy from "../proxies/PlaylistProxy";

class MainViewMediator extends Mediator {
    constructor() {
        super(MainViewMediator.name, new MainView());
        this.viewComponent.setMediator(this);

        let app = document.createElement("div");
        document.body.append(app);
        this.viewComponent.$mount(app);
    }

    listNotificationInterests() {
        return [
            Constants.NOTIFICATIONS.UPDATE_OUTPUT_TEXT,
            Constants.NOTIFICATIONS.UPDATE_PLAYLIST,
            Constants.NOTIFICATIONS.PLAY_FIRST,
            Constants.NOTIFICATIONS.PLAY_MEDIA_FILE
        ];
    }

    handleNotification(notification) {
        switch (notification.name) {
            case Constants.NOTIFICATIONS.UPDATE_OUTPUT_TEXT:
                this.viewComponent.output_text = notification.body;
                break;
            case Constants.NOTIFICATIONS.UPDATE_PLAYLIST:
                switch (notification.type) {
                    case Constants.UpdatePlaylistType.ADD_ONE:
                        this.viewComponent.addMediaFileToPlaylist(notification.body);
                        break;
                }
                break;
            case Constants.NOTIFICATIONS.PLAY_FIRST:
                this.viewComponent.playFirst();
                break;
            case Constants.NOTIFICATIONS.PLAY_MEDIA_FILE:
                this.viewComponent.playFile(notification.body);
                break;
        }
    }

    markCurrentPlayingFile(file) {
        /**
         * @type {PlaylistProxy}
         */
        let playlistProxy = this.facade.retrieveProxy(PlaylistProxy.name);
        playlistProxy.markCurrentPlayingFile(file);
    }

}

export default MainViewMediator;