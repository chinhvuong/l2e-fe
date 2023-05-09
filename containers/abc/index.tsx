import { CoursePreview } from '@/api/dto/course.dto'
import UserProfileDetail from '@/components/common/user-profile-detail'
import CertificateCard from '@/components/core/certificate-card'
import Divider from '@/components/core/divider'
import HorizontalCourseCard from '@/components/core/horizontal-course-card'
import { Certificate } from '@/store/certification/types'
import { CourseDetailIncludeList } from '@/constants/interfaces'

export default function AbcContainer() {
    const user = {
        _id: '6444a59e17e96be03fe27e3e',
        __v: 0,
        avatar: 'https://l2e-store.s3.amazonaws.com/file-1683092294805.jpg',
        bio: '<p>I&#x27;m Angela, I&#x27;m a developer with a passion for teaching. I&#x27;m the <strong>lead instructor</strong> at the London App Brewery, London&#x27;s leading <strong>Programming Bootcamp</strong>. I&#x27;ve helped hundreds of thousands of students learn to code and change their lives by becoming a developer. I&#x27;ve been invited by companies such as Twitter, Facebook and Google to teach their employees.</p><p>My first foray into programming was when I was just 12 years old, wanting to build my own Space Invader game. Since then, I&#x27;ve made <strong>hundred of websites, apps and games</strong>. But most importantly, I realised that my <strong>greatest passion</strong> is teaching.</p><p>I spend most of my time researching how to make <strong>learning to code fun</strong> and make <strong>hard concepts easy to understand</strong>. I apply everything I discover into my bootcamp courses. In my courses, you&#x27;ll find lots of geeky humour but also lots of <strong>explanations and animations</strong> to make sure everything is easy to understand.</p><p><strong>I&#x27;ll be there for you every step of the way.</strong></p><p>I&#x27;m Angela, I&#x27;m a developer with a passion for teaching. I&#x27;m the <strong>lead instructor</strong> at the London App Brewery, London&#x27;s leading <strong>Programming Bootcamp</strong>. I&#x27;ve helped hundreds of thousands of students learn to code and change their lives by becoming a developer. I&#x27;ve been invited by companies such as Twitter, Facebook and Google to teach their employees.</p><p>My first foray into programming was when I was just 12 years old, wanting to build my own Space Invader game. Since then, I&#x27;ve made <strong>hundred of websites, apps and games</strong>. But most importantly, I realised that my <strong>greatest passion</strong> is teaching.</p><p>I spend most of my time researching how to make <strong>learning to code fun</strong> and make <strong>hard concepts easy to understand</strong>. I apply everything I discover into my bootcamp courses. In my courses, you&#x27;ll find lots of geeky humour but also lots of <strong>explanations and animations</strong> to make sure everything is easy to understand.</p><p><strong>I&#x27;ll be there for you every step of the way.</strong> </p>',
        createdAt: '2023-04-23T03:27:26.026Z',
        name: 'Hữu An',
        rating: 0,
        title: 'Front-end Developer',
        updatedAt: '2023-05-09T02:47:25.229Z',
        walletAddress: '0x4BCD25Ac40C446D28318c225b613AF963C4BC3f8',
        nonce: 0,
    }

    const certificates: Certificate[] = [
        {
            _id: '644a63aba435d8d94f86b294',
            user: {
                _id: '6444a59e17e96be03fe27e3e',
                avatar: 'https://l2e-store.s3.amazonaws.com/file-1683092294805.jpg',
                bio: '<p>I&#x27;m Angela, I&#x27;m a developer with a passion for teaching. I&#x27;m the <strong>lead instructor</strong> at the London App Brewery, London&#x27;s leading <strong>Programming Bootcamp</strong>. I&#x27;ve helped hundreds of thousands of students learn to code and change their lives by becoming a developer. I&#x27;ve been invited by companies such as Twitter, Facebook and Google to teach their employees.</p><p>My first foray into programming was when I was just 12 years old, wanting to build my own Space Invader game. Since then, I&#x27;ve made <strong>hundred of websites, apps and games</strong>. But most importantly, I realised that my <strong>greatest passion</strong> is teaching.</p><p>I spend most of my time researching how to make <strong>learning to code fun</strong> and make <strong>hard concepts easy to understand</strong>. I apply everything I discover into my bootcamp courses. In my courses, you&#x27;ll find lots of geeky humour but also lots of <strong>explanations and animations</strong> to make sure everything is easy to understand.</p><p><strong>I&#x27;ll be there for you every step of the way.</strong></p><p>I&#x27;m Angela, I&#x27;m a developer with a passion for teaching. I&#x27;m the <strong>lead instructor</strong> at the London App Brewery, London&#x27;s leading <strong>Programming Bootcamp</strong>. I&#x27;ve helped hundreds of thousands of students learn to code and change their lives by becoming a developer. I&#x27;ve been invited by companies such as Twitter, Facebook and Google to teach their employees.</p><p>My first foray into programming was when I was just 12 years old, wanting to build my own Space Invader game. Since then, I&#x27;ve made <strong>hundred of websites, apps and games</strong>. But most importantly, I realised that my <strong>greatest passion</strong> is teaching.</p><p>I spend most of my time researching how to make <strong>learning to code fun</strong> and make <strong>hard concepts easy to understand</strong>. I apply everything I discover into my bootcamp courses. In my courses, you&#x27;ll find lots of geeky humour but also lots of <strong>explanations and animations</strong> to make sure everything is easy to understand.</p><p><strong>I&#x27;ll be there for you every step of the way.</strong> </p>',
                createdAt: '2023-04-23T03:27:26.026Z',
                name: 'Hữu An',
                nonce: 4,
                rating: 0,
                title: 'Front-end Developer',
                updatedAt: '2023-05-09T02:47:25.229Z',
                walletAddress: '0x4BCD25Ac40C446D28318c225b613AF963C4BC3f8',
            },
            course: {
                _id: '6444a6af5d3772742aef7b45',
                owner: '0x4BCD25Ac40C446D28318c225b613AF963C4BC3f8',
                name: 'The Complete JavaScript Course 2023: From Zero to Expert!',
                overview:
                    'The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one!',
                description:
                    '<p><strong><em>*** The #1 bestselling JavaScript course on Udemy! ***</em></strong></p><p><strong><em>*** Just updated for latest ES2021 and ES2022 features ***</em></strong></p><p><em>&quot;Really, really well made course. Super in-depth, with great challenges and projects that will solidify your Javascript understanding. I found the lectures were paced perfectly -- Jonas doesn&#x27;t skip over anything that might be useful to a JS developer&quot;</em> — Carson Bartholomew</p><p>JavaScript is the most popular programming language in the world. It powers the entire modern web. It provides millions of high-paying jobs all over the world.</p><p>That&#x27;s why you want to learn JavaScript too. And you came to the right place!</p><p><strong>Why is this the right JavaScript course for you?</strong></p><p><em>This is the most complete and in-depth JavaScript course on Udemy (and maybe the entire internet!). It&#x27;s an all-in-one package that will take you from the very fundamentals of JavaScript, all the way to building modern and complex applications.</em></p><p>You will learn modern JavaScript from the very beginning, step-by-step. I will guide you through <strong>practical and fun code examples</strong>, <strong>important theory</strong> about how JavaScript works behind the scenes, and <strong>beautiful and complete projects</strong>.</p><p>You will become ready to continue learning advanced <strong>front-end frameworks</strong> like React, Vue, Angular, or Svelte.</p><p>You will also learn how to think like a developer, how to plan application features, how to architect your code, how to debug code, and a lot of other real-world skills that you will need on your developer job.</p><p>And unlike other courses, this one actually contains beginner, intermediate, advanced, and even expert topics, so <strong>you don&#x27;t have to buy any other course in order to master JavaScript</strong> from the ground up!</p><p>But... You don&#x27;t have to go into all these topics. This is a huge course, because, after all, it&#x27;s &quot;The Complete JavaScript Course&quot;. In fact, it&#x27;s like many courses in one! <strong>But you can become an excellent developer by watching only parts of the course</strong>. That&#x27;s why I built this course in a very modular way, and designed pathways that will take you through the course faster.</p><p><em>By the end of the course, you will have the knowledge and confidence that you need in order to ace your job interviews and become a professional developer.</em></p><p><strong>Why am I the right JavaScript teacher for you?</strong></p><p>My name is Jonas, I&#x27;m an experienced web developer and designer, and one of Udemy&#x27;s top instructors. I have been teaching this bestselling course since 2016 to over 700,000 developers, always listening to feedback and understanding exactly how students actually learn.</p><p>I know how students learn JavaScript and what they need in order to master it. And with that knowledge, I designed the ideal course curriculum. <strong>It&#x27;s a unique blend of real-world projects, deep explanations, theory lectures, and challenges</strong>, that will take you from zero to an expert and confident JavaScript developer in just a couple of weeks.</p><p><strong>So what exactly is covered in the course?</strong></p><ul><li>Build 5 beautiful real-world projects for your portfolio! In these projects, you will learn how to plan and architect your applications using flowcharts and common JavaScript patterns</li><li>Master the JavaScript fundamentals: variables, if/else, operators, boolean logic, functions, arrays, objects, loops, strings, and more</li><li>Learn modern JavaScript (ES6+) from the beginning: arrow functions, destructuring, spread operator, default arguments, optional chaining, and more</li><li>How JavaScript works behind the scenes: engines, the call stack, hoisting, scoping, the &#x27;this&#x27; keyword, reference values, and more.</li><li>Deep dive into functions: arrow functions, first-class and higher-order functions, bind, and closures.</li><li>Deep dive into object-oriented programming: prototypal inheritance, constructor functions (ES5), classes (ES6), encapsulation, abstraction, inheritance, and polymorphism. [This is like a small standalone course]</li><li>Deep dive into asynchronous JavaScript: the event loop, promises, async/await, and error handling. You will use these to access data from third-party APIs with AJAX calls. [This is like a small standalone course]</li><li>Learn modern tools that are used by professional web developers: NPM, Parcel (module bundler), Babel, and ES6 modules</li></ul><p>Check out the course curriculum for an even more detailed overview of the content :)</p><p><strong>This is what&#x27;s also included in the package:</strong></p><ul><li>Up-to-date HD-quality videos, that are easy to search and reference (<em>great for Udemy Business students</em>)</li><li>Professional English captions (not the auto-generated ones)</li><li>Downloadable starter code and final code for each section</li><li>Downloadable slides for 40+ theory videos (not boring, I promise!)</li><li>Free support in the course Q&amp;A</li><li>25+ coding challenges and 25+ assignments to practice your new skills (solutions included)</li></ul><p><strong>This course is for you if...</strong></p><ul><li>... you want to gain a true and deep understanding of JavaScript</li><li>... you have been trying to learn JavaScript but: 1) still don&#x27;t really understand JavaScript, or 2) still don&#x27;t feel confident to code real apps</li><li>... you are interested in using a library/framework like React, Angular, Vue, or Node.js in the future</li><li>... you already know JavaScript and are looking for an advanced course. This course includes expert topics!</li><li>... you want to get started with programming: JavaScript is a great first language!</li></ul><p><strong>Does any of these look like you? If so, then start this adventure today, and join me and 700,000+ other developers in the only JavaScript course that you will ever need!</strong></p>',
                price: 10,
                rating: 3,
                ratingCount: 2,
                reviews: 0,
                students: 2,
                language: 'en',
                approved: true,
                requirements: [
                    'No coding experience is necessary to take this course! I take you from beginner to expert!',
                    'Any computer and OS will work — Windows, macOS or Linux. We will set up your text editor the course.',
                    'A basic understanding of HTML and CSS is a plus, but not a must! The course includes an HTML and CSS crash course.',
                ],
                goals: [
                    'Become an advanced, confident, and modern JavaScript developer from scratch',
                    'Build 6 beautiful real-world projects for your portfolio (not boring toy apps)',
                    'Build 6 beautiful real-world projects for your portfolio (not boring toy apps)',
                    'How to think and work like a developer: problem-solving, researching, workflows',
                    'JavaScript fundamentals: variables, if/else, operators, boolean logic, functions, arrays, objects, loops, strings, etc.',
                    'Modern ES6+ from the beginning: arrow functions, destructuring, spread operator, optional chaining (ES2020), etc.',
                    'Modern OOP: Classes, constructors, prototypal inheritance, encapsulation, etc.',
                ],
                thumbnail:
                    'https://l2e-store.s3.ap-northeast-1.amazonaws.com/file-1682222113432.jpg',
                promotionalVideo:
                    'https://l2e-store.s3.ap-northeast-1.amazonaws.com/file-1682222128622.mp4',
                category: {
                    _id: '6444a4115d3772742aef7b29',
                    name: 'IT',
                    slug: 'it',
                    banner: 'https://dlearn-storage.herokuapp.com/research-and-development-1665840546844-201407850.png',
                    thumbnail:
                        'https://dlearn-storage.herokuapp.com/research-and-development-1665840546844-201407850.png',
                    color: '#2267B5',
                    __v: 0,
                    createdAt: '2023-04-23T03:20:50.004Z',
                    updatedAt: '2023-04-23T03:20:50.004Z',
                },
                createdAt: '2023-04-23T03:31:59.397Z',
                updatedAt: '2023-05-06T14:20:00.015Z',
                include: {} as CourseDetailIncludeList,
                courseId: 14,
            },
            courseId: 14,
            finalGrade: 100,
            graduation: 'A',
            status: 'ON_CHAIN',
            createdAt: '2023-04-27T11:59:39.411Z',
            updatedAt: '2023-04-27T18:31:10.130Z',
        },
    ]

    return (
        <div className="mx-60 under_2xl:mx-20">
            <div className="h-full pt-5 px-14">
                <div className="flex mb-5 space-x-5">
                    <div className="bg-primary w-1.5"></div>
                    <div className="font-semibold text-[28px]">Profile</div>
                </div>
                {user && <UserProfileDetail data={user} showShortDescription />}
            </div>
            <div className="h-full px-14 mt-10 mb-5">
                <div className="flex mb-5 space-x-5">
                    <div className="bg-primary w-1.5"></div>
                    <div className="font-semibold text-[28px] -mx-4">
                        Courses
                    </div>
                </div>
                <div className="space-x-10">
                    <div>
                        {certificates !== undefined &&
                            certificates.map(
                                (certificate: Certificate, index: number) => {
                                    return (
                                        <div
                                            key={certificate._id}
                                            className={`${
                                                index ===
                                                    certificates.length - 1 &&
                                                'pb-6'
                                            }`}
                                        >
                                            <HorizontalCourseCard
                                                key={certificate.course._id}
                                                data={
                                                    certificate.course as CoursePreview
                                                }
                                                clickMode={'view'}
                                            />
                                            {index !==
                                                certificates.length - 1 && (
                                                <Divider />
                                            )}
                                        </div>
                                    )
                                },
                            )}
                    </div>
                    {certificates && certificates.length === 0 && (
                        <div className="flex justify-center text-xl font-bold my-10">
                            No results found.
                        </div>
                    )}
                </div>
            </div>
            <div className="h-full px-14">
                <div className="flex mb-5 space-x-5">
                    <div className="bg-primary w-1.5"></div>
                    <div className="font-semibold text-[28px] -mx-4">
                        Certificates
                    </div>
                </div>
                <div>
                    {certificates?.map((certification, index) => (
                        <div
                            key={index}
                            className={`${
                                index === certificates.length - 1 && 'pb-6'
                            }`}
                        >
                            <CertificateCard
                                key={certification._id}
                                data={certification}
                            />
                            {index !== certificates.length - 1 && <Divider />}
                        </div>
                    ))}
                    {certificates?.length === 0 && (
                        <div className="flex justify-center text-xl font-bold my-10">
                            No results found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
