import Proxy from "../../../lib/puremvc/Proxy"

class MediaDirectoriesProxy extends Proxy {

    constructor() {
        super(MediaDirectoriesProxy.name, {});
    }

    getMediaDirectories() {
        let dirs = undefined;
        let dirsStr = localStorage.getItem("mediaDirectories");
        if (dirsStr) {
            try {
                dirs = JSON.parse(dirsStr);
            } catch (e) {
                console.warn(e);
            }
        }
        if (!dirs) {
            dirs = [os.homedir()];
        }
        return dirs;
    }
}

export default MediaDirectoriesProxy;