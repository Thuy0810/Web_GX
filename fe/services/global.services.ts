import { fetchGet } from ".";

const globalService = () => {
    const getGlobal = async (): Promise<any> => {
        // Global là singleType, cần populate favicon để lấy thông tin media
        // Sử dụng array format như trong post.services.ts
        const queryObject = {
            populate: ['favicon'],
        };
        const response = await fetchGet(`global`, queryObject);
        
        // Debug log để kiểm tra dữ liệu
        console.log('GlobalService - Full response:', response);
        console.log('GlobalService - Response data:', response?.data);
        console.log('GlobalService - Favicon:', response?.data?.favicon);
        
        return response;
    }

    return {
        getGlobal,
    }
}

export default globalService;

