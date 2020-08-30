import {sendGet, getResourcePath} from 'helpers';

export const getData = () => {
    return sendGet(getResourcePath('data.json'))
};
