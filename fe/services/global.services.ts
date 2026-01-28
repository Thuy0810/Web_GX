import { fetchGet } from ".";

const globalService = () => {
    const getGlobal = async (): Promise<any> => {
        // Global là singleType, cần populate favicon để lấy thông tin media
        // Sử dụng array format như trong post.services.ts
        const queryObject = {
            populate: ['favicon'],
        };
        const response = await fetchGet(`global`, queryObject);
        

        return response;
    }

    return {
        getGlobal,
    }
}

export default globalService;

