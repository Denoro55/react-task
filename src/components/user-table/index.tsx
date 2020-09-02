import React, {useEffect, useRef} from "react";
import './style.scss'
import { useTranslation } from "react-i18next";
import { useStepAnimation } from 'helpers/hooks';

interface IProps {
    list: any[],
    toggleFavorite: (id: number) => void
}

const UserTable: React.FC<IProps> = (props: any) => {
    const { list } = props;
    const { t } = useTranslation();
    const table = useRef(null);
    // let animationInterval: any = null;

    const handleFavorite = (id: number) => {
        const { toggleFavorite } = props;
        toggleFavorite(id);
    };

    useStepAnimation(list, () => {
        // @ts-ignore
        return table.current.querySelectorAll('tr');
    });

    return (
        <table ref={table} className="user-table">
            <tbody>
                {
                    list.map((item: any, index: number) => {
                        return (
                            <tr key={item.id} className="fade-animation">
                                <td>
                                    <div className="user-avatar">

                                    </div>
                                </td>
                                <td>
                                        <span>
                                            { item.name }
                                        </span>
                                </td>
                                <td>
                                        <span>
                                            { item.age } {t('years')}
                                        </span>
                                </td>
                                <td>
                                        <span>
                                            { item.phone }
                                        </span>
                                </td>
                                <td>
                                    <div onClick={() => handleFavorite(item.id)} className="star">
                                        <i
                                            className={`fa ${item.favourite ? 'fa-star' : 'fa-star-o'}`}
                                            aria-hidden="true"
                                        ></i>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
};

export default UserTable

