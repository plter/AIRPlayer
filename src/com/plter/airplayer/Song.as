/**
 * Created by plter on 7/17/15.
 */
package com.plter.airplayer {
import flash.filesystem.File;

public class Song {
    public function Song(file:File) {
        _file = file;
        _songName = file.name;
    }

    private var _songName:String = "";

    private var _file:File = null;

    public function get songName():String {
        return _songName;
    }

    public function get file():File {
        return _file;
    }
}
}
