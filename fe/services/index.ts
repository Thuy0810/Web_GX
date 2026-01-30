import QueryString from "qs";

export const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const fetchGet = async (
    url: string,
    queryObject: Record<string, any> = {},
    tags: string[] = []
): Promise<any> => {
    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_STRAPI_API_URL is not defined");
    }

    const query = QueryString.stringify(queryObject, {
        encodeValuesOnly: true, // prettify URL
    });

    const queryString = query ? `?${query}` : "";
    const fullUrl = `${baseUrl}/api/${url}${queryString}`;

    // Debug log cho global service
   

    try {
        const res = await fetch(fullUrl, {
            cache: "no-store", // Tắt cache — luôn lấy dữ liệu mới từ BE
            // Sau này bật cache: bỏ cache: "no-store", bật block dưới:
            // next: {
            //     tags: [...tags, "all"],
            //     revalidate: 60, // revalidate mỗi 60 giây
            // },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        throw error;
    }
};