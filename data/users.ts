import { User } from '@/store/user/types'

export const dataUser: User = {
    _id: 1,
    walletAddress: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Dr. Angela Yu',
    title: 'Developer and Lead Instructor',
    bio: "I'm Angela, I'm a developer with a passion for teaching. I'm the lead instructor at the London App Brewery, London's leading Programming Bootcamp. I've helped hundreds of thousands of students learn to code and change their lives by becoming a developer. I've been invited by companies such as Twitter, Facebook and Google to teach their employees. My first foray into programming was when I was just 12 years old, wanting to build my own Space Invader game. Since then, I've made hundred of websites, apps and games. But most importantly, I realised that my greatest passion is teaching. I spend most of my time researching how to make learning to code fun and make hard concepts easy to understand. I apply everything I discover into my bootcamp courses. In my courses, you'll find lots of geeky humour but also lots of explanations and animations to make sure everything is easy to understand. I'll be there for you every step of the way.",
    rating: 4.7,
    courses: [1, 2, 3, 4, 5],
    avatar: 'https://img-c.udemycdn.com/user/200_H/31334738_a13c_3.jpg',
}
