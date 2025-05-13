import apiClient from "./service";

// 上传题目
export const uploadItem = (data) => {
    return apiClient({
        url: '/subject/subject/save',
        method: 'post',
        data
    })
};