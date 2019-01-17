/**
 * 验证器函数
 */

//  手机号验证
export function validatePhone(value) {
    let valid = false
    let type = ''
    let message = ''
    const phoneReg = /^1[34578]\d{9}$/;
    if(!value) {
        valid = true
        type ='warning'
        message = '手机号不能为空'
    } else if(!phoneReg.test(value)) {
        valid = true
        type = 'warning'
        message = '手机号不合法'
    } else {
        valid = false
        type = ''
        message = ''
    }
    return { valid, type, message }
}

// 验证码 
export function validateCode(value) {
    let valid = false
    let type = ''
    let message = ''
    if(!value) {
        valid = true
        type ='warning'
        message = '验证码不能为空'
    } else {
        valid = false
        type = ''
        message = ''
    }

    return { valid, type, message }
}

// 密码
export function validatePassword(pw1, pw2) {
    let valid = false
    let type = ''
    let message = ''
    if(!pw1) {
        valid = true
        type ='warning'
        message = '密码不能为空'
        return { valid, type, message }
    } else if(pw2) {
        if(pw1 !== pw2) {
            valid = true
            type ='warning'
            message = '两次密码输入不一致'
        }
    } else {
        valid = false
        type = ''
        message = ''
    }

    return { valid, type, message }
}

// 确认密码
export function validateConfirmPassword(pw1, pw2) {
    let valid = false
    let type = ''
    let message = ''
    if(!pw2) {
        valid = true
        type ='warning'
        message = '确认密码不能为空'
        return { valid, type, message }
    } 
    
    if(pw2 !== pw1) {
        valid = true
        type ='warning'
        message = '两次密码输入不一致'
    } else {
        valid = false
        type = ''
        message = ''
    }

    return { valid, type, message }
} 