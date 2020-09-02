import qs from "query-string";

export function buildQuery(obj: any) {
    const temp: any = {};
    Object.keys(obj).forEach(key => {
        if (obj[key] !== '') {
            temp[key] = obj[key]
        }
    });
    return qs.stringify(temp);
}

export function parseUrl(url: string) {
    return qs.parse(url)
}

export function findInArrayAndUpdate(id: number, arr: any[], fn: any) {
    const index = arr.findIndex((i: any) => i.id === id);
    const item = arr[index];
    const newItem = {
        ...item,
        ...fn(item)
    };
    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
}
