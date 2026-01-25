import { fetchGet } from ".";

const menuService = () => {
    const getMenus = async (): Promise<any> => {
        // Lấy Menu với populate category (bảng Category - relation oneToMany)
        // Category có: name, slug, isActive, menu (relation), posts (relation)
        const response = await fetchGet(`menus`, {
            populate: ['category'], // Populate category từ bảng Category
            filters: {
                is: {
                    $eq: true
                }
            },
            sort: 'order:asc'
        });
        return response;
    }

    const getCategories = async (menuId?: number): Promise<any> => {
        const queryObject: any = {
            populate: ['menu', 'posts'],
            filters: {
                isActive: {
                    $eq: true
                }
            }
        };

        if (menuId) {
            queryObject.filters.menu = {
                id: {
                    $eq: menuId
                }
            };
        }

        const response = await fetchGet(`categories`, queryObject);
        return response;
    }

    return {
        getMenus,
        getCategories,
    }
}

export default menuService;

