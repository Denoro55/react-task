import React from "react";

interface ItemProps {
    name: string,
    age: string,
    phone: string,
    phrase: string
}

const renderItem: React.FC<ItemProps> = ({name, age, phone, phrase}) => {
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
                    <div className="star">
                        <i className="fa fa-star-o" aria-hidden="true"></i>
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
