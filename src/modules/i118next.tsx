import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        // we init with resources
        resources: {
            en: {
                translations: {
                    sorting: "Sorting",
                    language: "Language",
                    view: "View",
                    id: 'id',
                    name: 'Name',
                    age: 'Age',
                    table: 'Table',
                    preview: 'Preview',
                    ascending: 'Ascending',
                    descending: 'Descending',
                    years: 'years',
                    search: 'Search',
                    languages: {
                        russian: 'Russian',
                        english: 'English'
                    }
                }
            },
            ru: {
                translations: {
                    sorting: "Сортировка",
                    language: "Язык",
                    view: "Вид",
                    id: 'id',
                    name: 'Имя',
                    age: 'Возраст',
                    table: 'Таблица',
                    preview: 'Превью',
                    ascending: 'По возрастанию',
                    descending: 'По убыванию',
                    years: 'лет',
                    search: 'Поиск',
                    languages: {
                        russian: 'Русский',
                        english: 'Английский'
                    }
                }
            }
        },
        fallbackLng: "ru",
        debug: true,

        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        // keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
