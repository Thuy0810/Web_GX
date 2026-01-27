import { fetchGet } from ".";

const liturgicalCalendarService = () => {
    const getLiturgicalCalendars = async (): Promise<any> => {
        const response = await fetchGet(`liturgical-calendars`, {
            populate: ['Schedude'],
            sort: 'createdAt:asc'
        });
        return response;
    }

    return {
        getLiturgicalCalendars,
    }
}

export default liturgicalCalendarService;

