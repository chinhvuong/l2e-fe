import React from 'react'
import UserInfo from './user-info'
import Nav from './navigator'

const Sidebar = () => {
    return (
        <div className="shadow-40 px-6 py-9 rounded-2xl">
            <UserInfo />
            <Nav />
        </div>
    )
}

export default Sidebar
