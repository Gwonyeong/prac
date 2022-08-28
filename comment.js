const comment =[{
    commentId : 1,
    content : "안녕하세요!"
}]
const recomment = [
{
    commentId : 1,
    recommentId : 1,
    content: "대댓글 달게요!"

},
{
    commentId : 1,
    recommentId : 2,
    content: "대댓글 달게요!222222222"
}
]
references: {
    model: 'recomment', // company migration define
    key: 'commentId'
}

const recommentData = await comment.findAll({
    include: [{
        model : recomment,

    }]
})



