import React, { useEffect, useState } from "react";
import './style.scss'
import { useTranslation } from "react-i18next";
import UserTable from "../user-table";
import UserPreview from "../user-preview";
import Radio from "../form/radio";
import { getData } from "../../api";
import { buildQuery, parseUrl, findInArrayAndUpdate } from "../../helpers";
import { useSelector, connect } from "react-redux";
import * as actions from "../../store/action";

enum Language {
    russian = 'ru',
    english = 'en'
}

enum SortDir {
    increase = 'increase',
    decrease = 'decrease'
}

enum ViewType {
    table = 'table',
    preview = 'preview'
}

const Table: React.FC = (props: any) => {
    const { actionSetData } = props;
    const query: any = parseUrl(props.location.search);

    const data: any = useSelector(state => state);
    const [list, setList] = useState([]);

    // filter
    const [term, setTerm] = useState('');
    const [sortValue, setSortValue] = useState(query.sortValue || 'id');
    const [sortDir, setSortDir] = useState(query.sortDir || SortDir.increase);
    const [listType, setListType] = useState(query.listType || ViewType.table);

    const { t, i18n } = useTranslation();

    useEffect(() => {
        getData().then((response: any) => {
            actionSetData(response.data);
            setList(sortData(response.data, sortValue, sortDir));
        });
    }, []);

    useEffect(() => {
        const { history } = props;
        history.push(`?${buildQuery({
            term,
            sortValue, 
            sortDir, 
            listType
        })}`)
    }, [term, sortValue, sortDir, listType]);

    const toggleFavorite = (id: number) => {
        const { toggleFavorite: actionToggleFavorite } = props;
        const newList: any = findInArrayAndUpdate(id, list, (item: any) => {
            return {
                favourite: !item.favourite
            }
        });
        setList(newList);
        actionToggleFavorite(id);
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const sortMapping: any = {
        'default': (state: any[], attrName: string, sortDir: string) => {
            return state.sort((a: any, b: any) => {
                if (sortDir === SortDir.increase) {
                    return a[attrName] - b[attrName]
                }
                return b[attrName] - a[attrName]
            })
        },
        'name': (state: any[], attrName: string, sortDir: string) => {
            let sign1 = -1, sign2 = 1;
            if (sortDir === SortDir.decrease) {
                sign1 = 1;
                sign2 = -1;
            }

            return state.sort((a: any, b: any) => {
                const nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                if (nameA < nameB)
                    return sign1;
                if (nameA > nameB)
                    return sign2;
                return 0
            })
        }
    };

    const sortData = (list: any[], attrName: string, sortDir: string) => {
        let newList = [];
        const cloneData = [...list];

        if (sortMapping[attrName]) {
            newList = sortMapping[attrName](cloneData, attrName, sortDir)
        } else {
            newList = sortMapping['default'](cloneData, attrName, sortDir)
        }

        return newList;
    };

    const onSort = (e: any) => {
        const value = e.target.value;
        setSortValue(value);
        setList(sortData(list, value, sortDir));
    };

    const onChangeSortDir = (e: any) => {
        const value = e.target.value;
        setSortDir(value);
        setList(sortData(list, sortValue, value));
    };

    const onChangeView = (e: any) => {
        setListType(e.target.value);
    };

    const onChangeLanguage = (e: any) => {
        changeLanguage(e.target.value);
    };

    const handleSearch = (e: any) => {
        const term = e.target.value;
        setTerm(term);
        const filtered = data.filter((item: any) => {
            return item.name.includes(term);
        });

        setList(sortData(filtered, sortValue, sortDir));
    };

    const ListComponent = listType === ViewType.table ? UserTable : UserPreview;

    return (
        <div className="table">
            <div className="table__filter">
                <div className="table__filter-sort">
                    <div className="table__filter-row">
                        <div className="filter-item">
                            <div className="filter-item__name">
                                {t("sorting")}
                            </div>
                            <div className="filter-item__content">
                                <div className="items">
                                    {
                                        ['id', 'name', 'age'].map((radio, index) => {
                                            return (
                                                <div key={index} className="items__item">
                                                    <Radio onChange={onSort} checked={radio === sortValue} text={t(radio)} value={radio} name="sort1" />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table__filter-row">
                        <div className="filter-item">
                            <div className="filter-item__content">
                                <div className="items">
                                    <div className="items__item">
                                        <Radio onChange={onChangeSortDir} checked={sortDir === SortDir.increase} text={t("ascending")} value="increase" name="sort2" />
                                    </div>
                                    <div className="items__item">
                                        <Radio onChange={onChangeSortDir} checked={sortDir === SortDir.decrease} text={t("descending")} value="decrease" name="sort2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table__filter-view">
                    <div className="filter-item">
                        <div className="filter-item__name">
                            {t("view")}
                        </div>
                        <div className="filter-item__content">
                            <div className="items">
                                {
                                    ['table', 'preview'].map((radio, index) => {
                                        return (
                                            <div key={index} className="items__item">
                                                <Radio onChange={onChangeView} checked={radio === listType} text={t(radio)} value={radio} name="view" />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table__filter-language">
                    <div className="filter-item">
                        <div className="filter-item__name">
                            {t("language")}
                        </div>
                        <div className="filter-item__content">
                            <div className="items">
                                <div className="items__item">
                                    <Radio onChange={onChangeLanguage} checked text={t("languages.russian")} value={Language.russian} name="language" />
                                </div>
                                <div className="items__item">
                                    <Radio onChange={onChangeLanguage} text={t("languages.english")} value={Language.english} name="language" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table__search">
                <div className="filter-item">
                    <div className="filter-item__name">
                        {t("search")}
                    </div>
                    <div className="filter-item__content">
                        <input onChange={handleSearch} type="text" className="input"/>
                    </div>
                </div>
            </div>
            <div className="table__bottom">
                { <ListComponent toggleFavorite={toggleFavorite} list={list} /> }
            </div>
        </div>
    )
};

export default connect(
    () => ({}),
    {
        actionSetData: actions.setData,
        toggleFavorite: actions.toggleFavorite
})(Table)
