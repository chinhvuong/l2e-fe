import React from 'react'
import './styles.scss'
import { useTransHook } from '@/locales/hooks'
const Footer = () => {
    const { t } = useTransHook()
    return (
        <>
            <div className="footer-container">
                <div className="footer-inner">
                    <div className="flex justify-between">
                        <div>
                            <p>{t('COPORATE_SPONSOR')}</p>
                        </div>
                        <div className="footer-inner__right ">
                            <div>
                                <p>{t('SUPPORTING_POLICY')}</p>
                            </div>
                            <div>
                                <p>{t('CATEGORY')}</p>
                            </div>
                            <div>
                                <p>{t('POST')}</p>
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
                            <p>{t('COPORATE_SPONSOR')}</p>
                            <p>{t('SUPPORTING_POLICY')}</p>
                            <p>{t('CATEGORY')}</p>
                            <p>{t('POST')}</p>
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
