import apiConfig from "../../src/configuration/configuration";

export type ApiUrl = string;

/**
 * CN joke service API url type
 *
 * @export
 * @interface ApiUrlTask
 */
export interface ApiUrlTask {
    joke: ApiUrl; //GET
    categories:ApiUrl;
    category: (category: string) => ApiUrl; //this way you may also define entpoints for DELETE, PATCH, UPDATE
}

/**
 * URL composer for task service API urls
 *
 * @param {string} baseUrl
 * @return {*}
 */
function getApiUrlChuckNorris(baseUrl: string, serviceVersion?: string) {
    const serviceName = 'jokes';
    const servicePath = `${baseUrl}/${serviceName}` + (serviceVersion ? `/${serviceVersion}`: '');
    return {
        joke: `${servicePath}/random`,
        categories: `${servicePath}/categories`,
        category: (category: string) => `${servicePath}/random?category=${category}`,
    } as ApiUrlTask;
}

/**
 * Central api URL access function
 *
 * @export
 * @return {*}
 */
export const ApiUrls = {
    //serviceName: service API url object
    chuckNorrisJokes: getApiUrlChuckNorris(apiConfig.env.THIRD_PARTY_SERVICE_BASE_URL),
};
