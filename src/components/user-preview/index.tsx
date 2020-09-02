import React, {useCallback, useEffect, useRef, useState} from "react";
import cn from 'classnames'
import './style.scss'
import _ from 'lodash';
import Item from "./item";
import { useTranslation } from "react-i18next";
import { useStepAnimation, useWindowSize } from 'helpers/hooks';

interface IProps {
    list: any[],
    toggleFavorite: (id: number) => void
}

const UserPreview: React.FC<IProps> = (props) => {
    const { list } = props;
    const { t } = useTranslation();
    const userPreview = useRef<HTMLDivElement>(null);
    const size = useWindowSize();

    const { toggleFavorite } = props;

    useStepAnimation(list, () => {
        // @ts-ignore
        return userPreview.current.querySelectorAll('.user-preview__item');
    });

    const handleCheck = useCallback(_.debounce((size) => {
        const scrollTop = size;
        const windowHeight = window.innerHeight;
        const windowCenter = scrollTop + windowHeight / 2;

        const positions: number[] = [];
        const videosInScreen: HTMLVideoElement[] = [];

        // @ts-ignore
        const videos = userPreview.current.querySelectorAll('video');

        videos.forEach((video: HTMLVideoElement) => {
            // console.log(video.offsetTop, video.offsetHeight, Object.getPrototypeOf(video))
            if (video.offsetTop + video.offsetHeight > scrollTop && video.offsetTop < scrollTop + windowHeight) {
                videosInScreen.push(video);
                positions.push(Math.abs((video.offsetTop + video.offsetHeight / 2) - windowCenter))
            }
        });

        const minDistanceValue = Math.min(...positions);
        const index = positions.findIndex((n) => n === minDistanceValue);
        const nearestVideo: any = videosInScreen[index];

        if (nearestVideo && !nearestVideo.playing && !nearestVideo['autoPlayDisabled']) {
            nearestVideo.play();
        }

        videos.forEach((video: HTMLVideoElement) => {
            if (nearestVideo !== video) {
                video.pause();
            }
        });
    }, 100), []);

    useEffect(() => handleCheck(size), [size]);

    const onVideoPlay = (e: any) => {
        // @ts-ignore
        const videos = userPreview.current.querySelectorAll('video');

        videos.forEach((video: HTMLVideoElement) => {
            if (e.target !== video) {
                video.pause();
            }
        });
    };

    const playVideo = (e: any) => {
        e.target['autoPlayDisabled'] = true;
    };

    return (
        <div ref={userPreview} className="user-preview">
            <div className="user-preview__list">
                {
                    list.map((item) => {
                        return (
                            <div className={cn({
                                "user-preview__item fade-animation": true,
                                "user-preview__item_wide": !!item.video,
                            })} key={item.id}>
                                <div className="user-preview__block">
                                    <div className="user-preview__content">
                                        <Item
                                            id={item.id}
                                            name={item.name}
                                            phone={item.phone}
                                            phrase={item.phrase}
                                            favourite={item.favourite}
                                            age={item.age + ' ' + t('years')}
                                            handleFavorite={toggleFavorite}
                                        />
                                    </div>
                                    {
                                        item.video ? <div className="user-preview__video">
                                            <video onClick={playVideo} onPlay={onVideoPlay} controls={true}>
                                                <source src={`./resources/videos/${item.video}.mp4`} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
                                            </video>
                                        </div> : null
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default UserPreview
