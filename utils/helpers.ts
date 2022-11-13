export const handleGoBack = () => {
    const sidebar = document.getElementById('SideBar')
    const content = document.getElementById('content')
    const main = document.getElementById('main')

    if (sidebar && content) {
        sidebar?.classList.add(`h-[${content?.clientHeight}px]`)
        main?.classList.add('overflow-hidden')
        content.classList.add('app-transition-out')
        content.classList.remove('app-transition')
    }
}

export const handleGoPage = (e?: any) => {
    const sidebar = document.getElementById('SideBar')
    const content = document.getElementById('content')
    const main = document.getElementById('main')
    if (sidebar && content) {
        e?.target.parentElement.parentElement.parentElement.classList.remove(
            'accordion__open',
        )
        main?.classList.remove('overflow-hidden')
        content.classList.add('app-transition')
        content.classList.remove('app-transition-out')
    }
}
