export function formattedGender(gender) {
        switch(gender) {
            case 'male':
                return '男'
            case 'female':
                return '女'
            default:
                return ''
        }
}
export function formattedDate(date) {
        const baseDate = new Date(date)
        const year = baseDate.getFullYear()
        const month = ('0' + (baseDate.getMonth() + 1)).slice(-2)
        const day = ('0' + baseDate.getDate()).slice(-2)
        return `${year}/${month}/${day}`
}
