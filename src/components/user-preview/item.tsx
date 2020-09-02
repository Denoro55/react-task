import React from "react";

interface ItemProps {
    id: number,
    name: string,
    age: string,
    phone: string,
    phrase: string,
    favourite: boolean,
    handleFavorite: (id: number) => void
}

const renderItem: React.FC<ItemProps> = ({id, name, age, phone, phrase, favourite, handleFavorite}) => {
    return (
        <div className="user-info">
            <div className="user-info__head">
                <div className="user-info__avatar">
                    <div className="user-avatar user-avatar_blue">

                    </div>
                </div>
                <div className="user-info__name">
                    { name }
                </div>
                <div className="user-info__star">
                    <div onClick={() => handleFavorite(id)} className="star">
                        <i className={`fa ${favourite ? 'fa-star' : 'fa-star-o'}`} aria-hidden="true"></i>
                    </div>
                </div>
            </div>
            <div className="user-info__years">
                <span> { age } </span>
            </div>
            <div className="user-info__phone">
                <span> { phone } </span>
            </div>
            <p className="user-info__text">
                { phrase }
            </p>
        </div>
    )
};

export default renderItem
