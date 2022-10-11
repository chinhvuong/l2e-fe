import { User } from '@/constants/interfaces'

export const getInstructorInfo = ({ user }: { user: User }) => {
    return {
        _id: user._id,
        name: user.name,
        title: user.title,
        bio: user.bio,
        rating: user.rating,
        courses: user.courses,
        avatar: user.avatar,
    }
}
