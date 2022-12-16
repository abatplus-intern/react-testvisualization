export interface ParamData {
    name: string;
    value: string;
    type: ParamType;
}

export enum ParamType {
    SubPath,
    QueryParam,
}

export enum Routes {
    home = 'home',
    testquadrant = 'testquadrant',
}

export const getRoutePath = (route: Routes, ...params: ParamData[]) => {
    let result = '/' + Routes[route];
    if (params)
        params.forEach((param) => {
            if (param.type === ParamType.SubPath) {
                result += `/${param.value}`;
            } else {
                // QueryParam
                if (!result.endsWith('?')) result += '?'; // ensure ?
                result += `${param.name}=${param.value}`;
            }
        });
    return result;
};
