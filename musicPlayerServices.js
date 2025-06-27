import TrackPlayer, { Event, RepeatMode } from "react-native-track-player";

import { playListData } from "./src/constants";

//create method for music player
export async function setupPlayer() {
    let isSetup = false;
    try {
        await TrackPlayer.getCurrentTrack();
        isSetup = true;
    } catch (error) {
        await TrackPlayer.setupPlayer();
        isSetup = true;
    } finally {
        return isSetup;
    }
}

//create method for loading music into the player
export async function addTrack() {
    //add music list into the player
    await TrackPlayer.add(playListData);
    //if finish play last music then repeting entair play list
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

//create method for playback service
export async function playBackService() {
    //setup Pause Event Service
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause();
    });
    //setup Play Event Service
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play();
    });
    //setup Next Event Service
    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext();
    });
    //setup Previous Event Service
    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious();
    });
}