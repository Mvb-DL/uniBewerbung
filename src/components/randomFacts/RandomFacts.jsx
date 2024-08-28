import React, { useState, useEffect, useRef } from 'react';
import Title from "../common/Title";
import { useGlobalState } from "../../components/changeLang/ChangeLang";

const RandomFacts = () => {
    const { data } = useGlobalState();
    const [showSpotify, setShowSpotify] = useState(false);
    const spotifyRef = useRef();

    // Funktion zum Laden des Spotify-Embeds nur bei Sichtbarkeit
    useEffect(() => {
        const handleScroll = () => {
            if (spotifyRef.current) {
                const rect = spotifyRef.current.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0) {
                    setShowSpotify(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="random_facts_sc">
            <div className="container fact-container">
                <div className='dotted-border-left'>
                    <Title titleText={data.titles.title_twelve} />
                    <h4 className='subtitle'>{data.titles.subtitle}</h4>

                    <div className='fact-box' style={{ border: "solid 2px white", borderRadius: "15px" }}>
                        <div className="fact-one flex">
                            <ul>
                                <li>
                                    <h4>{data.random.first}</h4>
                                    <p className="text">{data.random.second}</p>
                                </li>
                                <br />
                                <li>
                                    <h4>{data.random.three}</h4>
                                    <p className="text">{data.random.four}</p>
                                    <br />
                                    {/* Spotify-Embed nur bei Bedarf laden */}
                                    <div ref={spotifyRef}>
                                        {showSpotify && (
                                            <iframe
                                                className="flex items-right spotify"
                                                style={{ borderRadius: '12px' }}
                                                src="https://open.spotify.com/embed/playlist/1WMqP8mXyPxKa1wPFby6rf?utm_source=generator&theme=0"
                                                frameBorder="0"
                                                allowFullScreen
                                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                                loading="lazy"
                                            />
                                        )}
                                    </div>
                                </li>
                                <li>
                                    <h4>{data.random.five}</h4>
                                    <p className="text">{data.random.sixth}</p>
                                </li>
                            </ul>
                        </div>

                        <div className="fact-two flex">
                            <ul>
                                <li>
                                    <h4>{data.random.seven}</h4>
                                    <p className="text">{data.random.eight}</p>
                                </li>
                                <br />
                                <li>
                                    <h4>{data.random.nine}</h4>
                                    <p className="text">{data.random.ten}</p>
                                </li>
                                <br />
                                <li>
                                    <h4>{data.random.eleven}</h4>
                                    <p className="text">{data.random.twelve}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RandomFacts;
