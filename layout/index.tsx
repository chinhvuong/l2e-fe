import React, { ReactChild } from 'react'
import Footer from './footer'
import Header from './header'
import Sidebar from './sidebar'
import Breadcrumb from './breadcumb'
const Layout = ({ children }: { children: ReactChild }) => {
    // const [mainHeight, setMainHeight] = useState<any>()

    // useEffect(() => {
    //     const main = document.getElementById('Main')
    //     if (main) {
    //         setMainHeight(main.clientHeight)
    //         console.log(
    //             '🚀 ~ file: index.tsx ~ line 13 ~ useEffect ~ main.clientHeight',
    //             main.clientHeight,
    //         )
    //     }
    // }, [])

    return (
        <div>
            <Header />
            <main className={`limit sm:relative`}>
                <Breadcrumb />
                {/* {children} */}
                <div className="flex sm:flex-col gap-[30px]">
                    <div className="w-2/5 sm:w-full" id="SideBar">
                        <Sidebar />
                    </div>
                    <div
                        className="w-full app-transition -translate-x-full left-0 main-transition h-full sm:absolute top-0 px-4 bg-white"
                        id="Main"
                    >
                        {children}
                    </div>
                </div>
            </main>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Layout
