/**
 * @version 1.3.0 버전이나 
 * @see https://naver.com 이곳을 참고하라는 뜻
 * @deprecated 이거 쓰지 마세요. (함수에 줄 그어짐)
 * @param {Number} a 숫자 a를 넣으세요. 
 * @param {Number} b 숫자 b를 넣으세요. 
 * @returns 두개를 더한 값
 */
function add(a, b) {
    return a + b; //위 param 처럼 타입을 정의 해 놓으면 a와 b가 숫자타입인 것을
    //컴퓨터가 알 수 있음.
}
add()
add(5,3); //add를 작성 해보세요!

/** @type {string} */
let name = "조권영"
//이렇게 타입을 미리 작성도 할 수있음.