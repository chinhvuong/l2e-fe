import { useTranslation } from 'next-i18next'

export const useTransHook = () => {
    const { t } = useTranslation('common')
    console.log(
        '🚀 ~ file: hooks.ts ~ line 5 ~ useTransHook ~ t',
        t('NOTIFICATION'),
    )
    return { t }
}
