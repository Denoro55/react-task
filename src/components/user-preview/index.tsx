import React from "react";
import cn from 'classnames'
import './style.scss'
import renderItem from "./item";
import { useTranslation } from "react-i18next";

interface IProps {
    list: any[]
}

const UserPreview: React.FC<IProps> = (props) => {
    const { list } = props;
    const { t } = useTranslation();

    return (
        <div className="user-preview">
            <div className="user-preview__list">
                {
                    list.map((item) => {
                        const itemContent = renderItem({
                            name: item.name,
                            phone: item.phone,
                            phrase: item.phrase,
                            age: item.age + ' ' + t('years')
                        });

                        return (
                            <div className={cn({
                                "user-preview__item": true,
                                "user-preview__item_wide": !!item.video,
                            })} key={item.id}>
                                <div className="user-preview__block">
                                    <div className="user-preview__content">
                                        { itemContent }
                                    </div>
                                    {
                                        item.video ? <div className="user-preview__video">
                                            <video controls={true}>
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
