import Mediator from "../../../lib/puremvc/Mediator"
import MainView from "./MainView";
import Constants from "../Constants";
import MediaDirectoriesProxy from "../proxies/MediaDirectoriesProxy";

class MainViewMediator extends Mediator {
    constructor() {
        super(MainViewMediator.name, new MainView());

        let app = document.createElement("div");
        document.body.append(app);
        this.viewComponent.$mount(app);
    }

    listNotificationInterests() {
        return [Constants.NOTIFICATIONS.START_UP];
    }

    async scanDir(dirPath, loopDepth) {
        if (loopDepth >= 5) {
            return;
        }

        if (fs.existsSync(dirPath) && (await fs.promises.stat(dirPath)).isDirectory()) {
            let dir = await fs.promises.opendir(dirPath);
            for await (const dirent of dir) {
                if (dirent.name.startsWith(".")) {
                    continue;
                }
                if (dirent.isDirectory()) {
                    this.scanDir(path.join(dirPath, dirent.name), loopDepth + 1);
                    continue;
                }
                if (dirent.isFile()) {
                    let filenameLowerCase = dirent.name.toLowerCase();
                    if (filenameLowerCase.endsWith(".mp3") || filenameLowerCase.endsWith(".m4a")) {
                        console.log(path.join(dirPath, dirent.name));
                        // TODO
                    }
                }
            }
        }
    }

    async scanMediaDirectories(dirs) {
        for (let d of dirs) {
            await this.scanDir(d, 1);
        }
    }

    handleNotification(notification) {
        switch (notification.name) {
            case Constants.NOTIFICATIONS.START_UP:
                this.viewComponent.output_text = "正在扫描...";
                let dirs = this.facade.retrieveProxy(MediaDirectoriesProxy.name).getMediaDirectories();
                this.scanMediaDirectories(dirs);
                break;
        }
    }

}

export default MainViewMediator;