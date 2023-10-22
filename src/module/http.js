import { routing } from "./config/routing"
import { make_uuid } from "./common"

export const csrf_token = async () => {
    const response = await fetch(`${routing.api.http}/csrf_token`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    return await response.json()
}

export const json_request = async (url, data) => {



    const csrf = await csrf_token()
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "X-CSRFToken": csrf.token
        },
        body: JSON.stringify(data),
        credentials: "include"
    })
    return await response.json()
}




export const login = async (username, password) => {
    const request = await fetch(`${routing.api.http}/auth/login/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    const response = await request.json()
    
    if(response.non_field_errors) {return 403}

    const connect_account_request = await json_request(`${routing.api.http}/account/`, {
        command: "set_token",
        access_token: response.access_token,
        refresh_token: response.refresh_token
    })

    return  connect_account_request
}


export const signup = async (email, username, password1, password2, name, group_name, is_memberregistration=false, secret_key=null, access_key=null) => {
    if(email === "" || username === "" || password1 === "" || password2 === ""){
        return {status: 400, message: "全て埋めてください"}
    } else if(password1 === "" || password2 === ""){
        return {status: 400, message: "パスワードが一致しません"}
    }

    const request = await fetch(`${routing.api.http}/auth/registration/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password1: password1,
            password2: password2,
        })
    })

    const response = await request.json()
    console.log(response)
    if(response.email){
        if(response.email[0].includes("already")){
            return {response: 403, "message": "そのメールアドレスはすでに使用されています"}
        } else if(response.email[0].includes("valid")){
            return {response: 403, "message": "正しいメールアドレスを入力してください"}
        }
    }
    else if (response.username){
        return {resonse: 403, "message": "そのユーザーネームはすでに使用されています"}
    }
    else if (response.password1){
        if(response.password1[0].includes("short")){
            return {response: 403, "message": "パスワードが短すぎます。最低8文字以上で登録してください。"}
        }
    }
    else if(response.non_field_errors){
        return {response: 403, "message": "パスワードがユーザネームもしくはメールアドレスと似ているので登録できません。"}
    }
    else {
        const connect_account_request = await json_request(`${routing.api.http}/account/`, {
            command: "set_token",
            access_token: response.access_token,
            refresh_token: response.refresh_token
        })
        if(is_memberregistration){
           const registraion_request = await json_request(`${routing.api.http}/account/`, {
               command: "member_registraion",
               secret: secret_key,
               access: access_key,
               name: name,
           })
           return {response: 200}
        } else {
            if(group_name == "" || name == "" ){
                return {response: 403, message: "会社名/ご本人様のお名前を入力してください"}
            }
            const registration_request = await json_request(`${routing.api.http}/account/`, {
                command: "create_organization",
                organization_id: make_uuid(),
                organization_name: group_name,
                username: name
            })
             return {response: 200}
        }
        
    }
}



export const has_account = async () => {
    const has_account_request = await json_request(`${routing.api.http}/account/`, {
        command: "has_account?"
    })
    if(!has_account_request.response){
        window.location.href = "/auth/login"
    }
    return has_account_request.response
}



export const can_access = async () => {
    const can_access_request = await json_request(`${routing.api.http}/account/`, {
        command: "is_accessable?"
    })
    return can_access_request.response
}


export const renew_token = async () => {
    const get_refresh_token = await json_request(`${routing.api.http}/account/`,{
            command: "get_refresh_token"
        })
    const refresh_token = await get_refresh_token.token
    const get_new_token = await json_request(`${routing.api.http}/auth/token/refresh/`, {
        refresh: refresh_token
    })
    const set_token_request = await json_request(`${routing.api.http}/account/`, {
        command: "set_token",
        access_token: get_new_token.access,
        refresh_token: get_new_token.refresh
    })
    return 200
}


export const binary_request = async (url, params) => {
    const formdata = new FormData()

    for(let i in params){
        formdata.append(i, params[i])
    }
    const request = await fetch(url, {
        method: 'POST',
        credentials: "include",
        headers: {},
        body: formdata
    })

    return await request.json()

}