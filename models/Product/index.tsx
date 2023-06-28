import {API_URL} from "@/fetches/config";
import {yieldPromiseDataModel} from "@/helpers";
import {FetchGetHeader} from "@/fetches";

export const listPaging = (params: any) => {
    return new Promise((resolve, reject) => {
        FetchGetHeader(`${API_URL}/products`, params, data => {
            yieldPromiseDataModel(data, resolve, reject);
        })
    });
}

export const search = (params: any) => {
    return new Promise((resolve, reject) => {
        FetchGetHeader(`${API_URL}/products/search`, params, data => {
            yieldPromiseDataModel(data, resolve, reject);
        })
    });
}
