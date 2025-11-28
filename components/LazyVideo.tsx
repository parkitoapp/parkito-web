"use client";

import React, { useRef, useEffect, useState } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
    type?: string;
}

const LazyVideo: React.FC<LazyVideoProps> = ({ src, type = "video/mp4", className, ...props }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        videoRef.current?.play().catch(() => {
                            // Auto-play was prevented
                        });
                    } else {
                        setIsInView(false);
                        videoRef.current?.pause();
                    }
                });
            },
            {
                threshold: 0.2, // Trigger when 20% of the video is visible
                rootMargin: "50px" // Start loading a bit before it comes into view
            }
        );

        const currentVideoRef = videoRef.current;
        if (currentVideoRef) {
            observer.observe(currentVideoRef);
        }

        return () => {
            if (currentVideoRef) {
                observer.unobserve(currentVideoRef);
            }
        };
    }, []);

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
            {isInView && <source src={src} type={type} />}
        </video>
    );
};

export default LazyVideo;
