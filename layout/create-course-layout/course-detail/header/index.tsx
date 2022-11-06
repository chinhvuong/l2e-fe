import * as React from 'react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'
import Button from '@/components/core/button'
import { useCourse } from '@/api/hooks/useCourse'
import { useAppSelector } from '@/hooks'
import { getAllIntendedLearners } from '@/store/course/intended-learners/selectors'

export interface IHeaderProps {}

export default function Header() {
    const goBack = () => {
        Router.back()
    }

    const { useUpdateCourse } = useCourse()
    const { mutate: updateCourse } = useUpdateCourse({
        onError: () => {},
        onSuccess: (response) => {
            console.log(response)
        },
    })

    const updateCourseDetail = () => {
        // updateCourse({
        //     _id: '635cae4b1a5c467718478182',
        //     name: 'Node.js, Express, MongoDB & More: The Complete Bootcamp 2022',
        //     overview:
        //         'Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps',
        //     description:
        //         '<p>Welcome to the Complete Web Development Bootcamp, <strong>the only course you need</strong> to learn to code and become a full-stack web developer. With 150,000+ ratings and a 4.8 average, my Web Development course is one of the HIGHEST RATED courses in the history of Udemy! At 65+ hours, this Web Development course is without a doubt the <strong>most comprehensive</strong> web development course available online. Even if you have <strong>zero</strong> programming experience, this course will take you from <strong>beginner to mastery</strong>. Here&#x27;s why:</p><ul><li>The course is taught by the <strong>lead instructor</strong> at the App Brewery, London&#x27;s <strong>leading in-person programming bootcamp</strong>.</li><li>The course has been updated to be <strong>2022 ready</strong> and you&#x27;ll be learning the latest tools and technologies used at large companies such as Apple, Google and Netflix.</li><li>This course doesn&#x27;t cut any corners, there are beautiful <strong>animated explanation videos</strong> and tens of <strong>real-world projects</strong> which you will get to build.</li><li>The curriculum was developed over a period of <strong>four years</strong>, with comprehensive student testing and feedback.</li><li>We&#x27;ve taught over a <strong>million</strong> students how to code and many have gone on to <strong>change their lives</strong> by becoming professional developers or starting their own tech startup.</li><li>You&#x27;ll save yourself <strong>over $12,000</strong> by enrolling, but still get access to the same teaching materials and learn from the same instructor and curriculum as our in-person programming bootcamp.</li><li>The course is <strong>constantly updated</strong> with new content, with new projects and modules determined by students - that&#x27;s you!</li></ul>',
        //     price: 765,
        //     language: 'en',
        //     requirements: [
        //         "No programming experience needed - I'll teach you everything you need to know",
        //         'A computer with access to the internet',
        //         'No paid software required',
        //         "I'll walk you through, step-by-step how to get all the software installed and set up",
        //     ],
        //     goals: [
        //         'You will build 16 web development projects for your portfolio, ready to apply for junior developer jobs.',
        //         'You will learn the latest technologies, including Javascript, React, Node and even Web3 development.',
        //         'You will master both front and back-end development, becoming a full-stack developer by the end of the course.',
        //         'After the course you will be able to build ANY website you want.',
        //         'Build fully-fledged websites and web apps for your startup or business.',
        //         'Work as a freelance web developer.',
        //         'Master frontend development with React',
        //         'Master backend development with Node',
        //         'Learn professional developer best practices.',
        //     ],
        //     thumbnail:
        //         'https://dlearn-storage.herokuapp.com/1565838_e54e_16-1666667317389-428475149.jpg',
        //     include: {
        //         duration: '65 hours on-demand video',
        //         resource: '49 downloadable resources',
        //         assignments: 'Assignments',
        //         certificate: 'Certificate of completion',
        //         lifetimeAccess: 'Full lifetime access',
        //         device: 'Access on mobile and TV',
        //         articles: '85 articles',
        //         exercise: '8 coding exercises',
        //     },
        //     category: '6357fe17934b49535b9c7af9',
        // })
    }

    return (
        <div className="flex items-center justify-between bg-black h-[65px] w-full fixed top-0 z-10 cursor-pointer px-5">
            <div
                className="flex items-center space-x-3"
                onClick={() => goBack()}
            >
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="text-xl bg-black text-white"
                />
                <div className="text-white">Back</div>
            </div>
            <Button>
                <div
                    className="font-semibold"
                    onClick={() => updateCourseDetail()}
                >
                    Save
                </div>
            </Button>
        </div>
    )
}
