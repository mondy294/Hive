import axios from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const requests = axios.create({
    baseURL: 'http://127.0.0.1:3007/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

requests.defaults.transformRequest = (data, headers) => {
    const contentType = headers['Content-Type'];
    if (contentType === "application/x-www-form-urlencoded") return qs.stringify(data);
    return data;
};

requests.interceptors.response.use((res: AxiosResponse) => {
    if (res.data.status == 1) {

        ElMessage.error(res.data.message)
    }
    return res

})


export default requests