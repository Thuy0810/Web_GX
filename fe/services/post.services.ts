import { fetchGet } from ".";

const postService = () => {
    const getPosts = async (categoryId?: number, categorySlug?: string): Promise<any> => {
        const queryObject: any = {
            populate: ['menu_item.menu', 'backgroundImage'],
            sort: ['postingDate:desc', 'createdAt:desc'], // Sắp xếp theo thời gian đăng giảm dần (mới nhất trước)
        };

        if (categoryId) {
            queryObject.filters = {
                menu_item: {
                    id: {
                        $eq: categoryId
                    }
                }
            };
        } else if (categorySlug) {
            queryObject.filters = {
                menu_item: {
                    slug: {
                        $eq: categorySlug
                    }
                }
            };
        }

        const response = await fetchGet(`posts`, queryObject);
        return response;
    }

    const getPostBySlug = async (slug: string): Promise<any> => {
        const response = await fetchGet(`posts`, {
            populate: ['menu_item'],
            filters: {
                slug: {
                    $eq: slug
                }
            }
        });
        return response;
    }

    return {
        getPosts,
        getPostBySlug,
    }
}

export default postService;