import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

const controlCenter = () => {

    const playBackState = usePlaybackState();
    //method next button
    const skipToNext = async () => {
        await TrackPlayer.skipToNext();
    }
    //method previous button
    const skipToPrevious = async () => {
        await TrackPlayer.skipToPrevious();
    }
    //method play puse toggle button
    const togglePlayBack = async (playback: State) => {
        //get current played track
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack !== null) {
            if (playback === State.Paused || playback === State.Ready) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={skipToPrevious}>
                <Icon style={styles.icon} name="skip-previous" size={40} />
            </Pressable>
            <Pressable onPress={() => togglePlayback(playBackState)}>
                <Icon
                    style={styles.icon}
                    name={playBackState === State.Playing ? "pause" : "play-arrow"}
                    size={75} />
            </Pressable>
            <Pressable onPress={skipToNext}>
                <Icon style={styles.icon} name="skip-next" size={40} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 56,

        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        color: '#FFFFFF',
    },
    playButton: {
        marginHorizontal: 24,
    },
});

export default controlCenter;