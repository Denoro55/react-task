import React from "react";
import './style.scss'
import { useTranslation } from "react-i18next";

const UserTable: React.FC<IProps> = (props) => {
    const { list } = props;
    const { t } = useTranslation();

    return (
        <table className="user-table">
            <tbody>
                {
                    list.map((item) => {
                        return (
                            <tr key={item.id}>
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
                                    <div className="star">
                                        <i className="fa fa-star-o" aria-hidden="true"></i>
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

interface IProps {
    list: any[]
}

export default UserTable
