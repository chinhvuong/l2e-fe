import { Rating } from '@/constants/interfaces'

export const dataRatings: Rating[] = [
    {
        _id: 1,
        user: 1,
        courseId: 1,
        rating: 4,
        comment: `This is a really good course to take if you are planning to be a web developer. Though some things aren't updated, but you can solve it anyway through the Q&A sections and through reading the documentations. I really love your "Tip from Angela" at the end of every lesson. Dr. Angela is really a good Instructor I would recommend this course.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: 2,
        user: 2,
        courseId: 1,
        rating: 5,
        comment: `I am thoroughly impressed with this course. It has provided me with a comprehensive education in front-end development and I am confident in my newfound abilities. Whether you are a beginner or an experienced programmer, I highly recommend this course for anyone seeking to enhance their skills in this area.`,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]
