"use client";

import React, { useRef, useEffect, useState } from "react";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
    type?: string;
}

const LazyVideo: React.FC<LazyVideoProps> = ({
    src,
    type = "video/mp4",
    className,
    ...props
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasLoadedSource, setHasLoadedSource] = useState(false);

    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            entries => {
                const entry = entries[0];

                // First time in view → load source
                if (entry.isIntersecting && !hasLoadedSource) {
                    setHasLoadedSource(true);
                }

                // Control playback only when source is loaded
                if (entry.isIntersecting) {
                    el.play().catch(() => { });
                } else {
                    el.pause();
                }
            },
            {
                threshold: 0.2,
                rootMargin: "100px",
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [hasLoadedSource]);

    return (
        <video
            ref={videoRef}
            className={className}
            preload="none"
            muted
            playsInline
            loop
            {...props}
        >
            {hasLoadedSource && <source src={src} type={type} />}
        </video>
    );
};

export default LazyVideo;
