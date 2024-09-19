const SORT_ORDER = {
    ASC: 'asc',
  DESC: 'desc',
};

const parseSortOrder = (sortOrder) => {
    const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
    if(!isKnownOrder) return SORT_ORDER.ASC;
    return sortOrder;
};

const parseSortBy = (sortBy) => {
    const keyOfContacts = ['title', 'organizer', 'eventDate'];
    if(!keyOfContacts.includes(sortBy)) return 'title';
    return sortBy;
};

export const parsedSortParams = (query) => {
    const {sortBy, sortOrder} = query;

    const parsedSortOrder = parseSortOrder(sortOrder);
    const parsedSortBy = parseSortBy(sortBy);
    return {
        sortBy: parsedSortBy,
        sortOrder: parsedSortOrder,
    };
};
