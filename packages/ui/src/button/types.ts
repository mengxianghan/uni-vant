export const buttonType = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const
export type ButtonType = (typeof buttonType)[number]

export const buttonSize = ['large', 'normal', 'small', 'mini'] as const
export type ButtonSize = (typeof buttonSize)[number]

export const buttonIconPosition = ['left', 'right'] as const
export type ButtonIconPosition = (typeof buttonIconPosition)[number]

export const openType = ['feedback', 'share', 'getUserInfo', 'contact', 'getPhoneNumber', 'launchApp', 'openSetting', 'chooseAvatar', 'agreePrivacyAuthorization', 'uploadDouyinVideo', 'im', 'getAuthorize', 'lifestyle', 'contactShare', 'openGroupProfile', 'openGuildProfile', 'openPublicProfile', 'shareMessageToFriend', 'addFriend', 'addColorSign', 'addGroupApp', 'addToFavorites', 'chooseAddress', 'chooseInvoiceTitle', 'login', 'subscribe', 'favorite', 'watchLater', 'openProfile']
export type ButtonOpenType = (typeof openType)[number]

export const formType = ['submit', 'reset']
export type ButtonFormType = (typeof formType)[number]
