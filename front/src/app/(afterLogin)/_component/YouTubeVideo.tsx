"use client";
import React, { useRef, useEffect } from "react";
import YouTube from "react-youtube";
import { inherits } from "util";

type Props ={
    videoId: string
}
const YouTubeVideo = ({videoId}: Props) => {
    const playerRef = useRef<any>(null); // Use 'any' type for the ref

    // Define 'onReady' function before the useEffect
    const onReady = (event) => {
        // Access player via event.target
        event.target.pauseVideo();
    };

    useEffect(() => {
    

        // You can access the player instance via ref
        if (playerRef.current) {
            // Use type assertion to tell TypeScript about the type of the ref
            (playerRef.current as any).internalPlayer.pauseVideo();
        }

    }, []);

    // Define 'opts' outside of the useEffect
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <div>
            
            <YouTube videoId={videoId} opts={opts} onReady={onReady} ref={playerRef} />
        </div>
    );
};

export default YouTubeVideo;
