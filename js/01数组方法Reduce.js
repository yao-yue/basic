var a = [1,2,3,4,5,6,7,8,9]
a.reduce((prev, next) => {
    console.log('+'+prev,next);
    if (prev > next) {
        return prev;
    } else {
        return next
    };
})
console.log(a)