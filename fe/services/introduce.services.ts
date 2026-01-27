import { fetchGet } from ".";

const introduceService = () => {
    const getIntroduce = async (): Promise<any> => {
        // Introduce là singleType nên không cần query params phức tạp
        const response = await fetchGet(`introduce`);
        return response;
    }

    return {
        getIntroduce,
    }
}

export default introduceService;

