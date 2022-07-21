const isExpiredPoll = (deadlinePoll) => {
    const dateNow = new Date()
    const deadline = new Date(deadlinePoll)
    if(dateNow >= deadline) return true
    return false
}

const sortingByExpired = (a, b) => {
    var a = new Date(a.deadline)
    var b = new Date(b.deadline)
    if(a > b) return -1
    if(a < b) return 1
    return 0
}

export {
    isExpiredPoll,
    sortingByExpired
}