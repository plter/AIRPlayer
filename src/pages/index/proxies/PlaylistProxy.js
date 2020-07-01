import Proxy from "../../../lib/puremvc/Proxy"
import Constants from "../Constants";
import MediaDirectoriesProxy from "./MediaDirectoriesProxy";

export default class PlaylistProxy extends Proxy {


    async onRegister() {
        this.sendNotification(Constants.NOTIFICATIONS.UPDATE_OUTPUT_TEXT, "正在扫描...");

        let dirs = this.facade.retrieveProxy(MediaDirectoriesProxy.name).getMediaDirectories();
        await this.scanMediaDirectories(dirs);
        this.sendNotification(Constants.NOTIFICATIONS.UPDATE_OUTPUT_TEXT, "扫描完成");
        this.sendNotification(Constants.NOTIFICATIONS.PLAY_FIRST);
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
                    await this.scanDir(path.join(dirPath, dirent.name), loopDepth + 1);
                    continue;
                }
                if (dirent.isFile()) {
                    let filenameLowerCase = dirent.name.toLowerCase();
                    if (filenameLowerCase.endsWith(".mp3") || filenameLowerCase.endsWith(".m4a")) {
                        this.sendNotification(Constants.NOTIFICATIONS.UPDATE_OUTPUT_TEXT, dirent.name);
                        this.sendNotification(Constants.NOTIFICATIONS.UPDATE_PLAYLIST, path.join(dirPath, dirent.name), Constants.UpdatePlaylistType.ADD_ONE);
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
}