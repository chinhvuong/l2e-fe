import React from 'react'
import './styles.scss'

const Footer = () => {
    return (
        <>
            <div className="footer-container">
                <div className="footer-inner">
                    <div className="flex justify-between">
                        <div>
                            <p>Bảo trợ bởi tập đoàn MB</p>
                        </div>
                        <div className="footer-inner__right">
                            <div>
                                <p>Chính sách hỗ trợ</p>
                            </div>
                            <div>
                                <p>Danh mục sản phẩm</p>
                            </div>
                            <div>
                                <p>Bài viết</p>
                            </div>
                            <div>
                                <img
                                    src="/images/footer.png"
                                    alt="me"
                                    width="auto"
                                    height="auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-mobile-container">
                <div className="footer-inner">
                    <div className="flex justify-between">
                        <div>
                            <p>Chính sách hỗ trợ</p>
                            <p>Danh mục sản phẩm</p>
                            <p>Bài viết</p>
                            <p>Bảo trợ bởi tập đoàn MB</p>
                        </div>
                        <div className="footer-inner__right">
                            <img
                                src="/images/footer.png"
                                alt="me"
                                width="auto"
                                height="auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
