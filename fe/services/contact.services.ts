import { fetchGet } from ".";

const contactService = () => {
    const getContact = async (): Promise<any> => {
        // Contact là singleType nên không cần query params phức tạp
        const response = await fetchGet(`contact`);
        return response;
    }

    return {
        getContact,
    }
}

export default contactService;

