const V1_URL = "/api/v1";

export const BOOK_URL = {
    LIST_BOOKS: V1_URL + '/books/',
    DTL_BOOKS: (id: number) => V1_URL + `/books/${id}`
}

export const CATEGORIES_URL = {
    LIST_CATEGORY: V1_URL + '/categories/',
    OPTION_CATEGORY:  V1_URL + '/categories/option',
    DTL_CATEGORY: (id: number) => V1_URL + `/categories/${id}`
}