export interface CreateCourseRequest {
    name: string
    category: string
}

export interface CreateCourseResponse {}

type Category = {
    _id: string
    name: string
    slug: string
    banner: string
    thumbnail: string
    color: string
    __v: number
    createdAt: Date
    updatedAt: Date
}
export interface GetCategoryResponse {
    total: number
    data: Category[]
}
