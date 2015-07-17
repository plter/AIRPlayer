/**
 * Created by plter on 7/17/15.
 */
package com.plter.airplayer {
import flash.events.Event;
import flash.filesystem.File;
import flash.filesystem.FileMode;
import flash.filesystem.FileStream;
import flash.media.Sound;
import flash.media.SoundChannel;
import flash.net.URLRequest;

import mx.collections.ArrayCollection;

public class Player {
    public function Player() {
    }

    private function play(song:Song):Song{
        if(_currentChannel){
            _currentChannel.stop();
        }

        _currentChannel = new Sound(new URLRequest(song.file.url)).play();
        _currentChannel.addEventListener(Event.SOUND_COMPLETE, function(e:Event):void{
            playNext();
        });
        return song;
    }

    private function playNext():void {
        if(_currentIndex<_songList.length-1){
            _currentIndex++;
            playAtIndex(_currentIndex);
        }
    }

    public function playAtIndex(index:int):void{
        if(_songList.length<=0){
            return;
        }
        if(index<0||index>_songList.length-1){
            return;
        }

        play(songList[index]);
        _currentIndex = index;
    }

    public function playLast():void{
        playAtIndex(_songList.length-1);
    }

    private var _currentIndex:int = -1;

    public function addSong(song:Song):Song{
        _songList.addItem(song);
        return song;
    }

    private var _currentChannel:SoundChannel = null;
    private var _songList:ArrayCollection = new ArrayCollection();

    public static function getInstance():Player{
        if(__ins==null){
            __ins = new Player();
        }
        return __ins;
    }

    private static var __ins:Player = null;

    [Bindable]
    public function get songList():ArrayCollection {
        return _songList;
    }

    public function set songList(value:ArrayCollection):void {
        _songList = value;
    }

    public function savePlaylist():void{
        if(_songList.length>0) {
            var dataFile:File = File.applicationStorageDirectory.resolvePath("playlist");
            var fs:FileStream = new FileStream();
            fs.open(dataFile, FileMode.WRITE);
            for each(var s:Song in songList) {
                fs.writeUTFBytes(s.file.nativePath+SP);
            }
            fs.close();
        }
    }

    public function readPlayList():void{
        var dataFile:File = File.applicationStorageDirectory.resolvePath("playlist");
        if(dataFile.exists&&dataFile.size) {
            var fs:FileStream = new FileStream();
            fs.open(dataFile, FileMode.READ);
            var str:String = fs.readUTFBytes(fs.bytesAvailable);
            fs.close();

            var urlArray:Array = str.split(SP);
            for each(var url:String in urlArray) {
                if(url&&url!="") {
                    var f:File = new File(url);
                    if(f.exists) {
                        addSong(new Song(new File(url)));
                    }
                }
            }
        }
    }

    private static const SP:String = "\n";
}
}
