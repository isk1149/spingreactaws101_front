import {API_BASE_URL} from "../api-config";

export const call = (api, method, request) => {
    let headers = new Headers({
        "Content-Type":"application/json",
    });

    //로컬스토리지에서 ACCESS_TOKEN 가져오기
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };
    if (request) {
        //GET method
        options.body = JSON.stringify(request);
    }
    return fetch(options.url, options).then(response => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 403) { //인증에 실패해 접근이 거부된 경우
            window.location.href = "/login"; //redirect
        } else {
            Promise.reject(response);
            throw Error(response);
        }
    }).catch(error => {
        console.log("http error");
        console.log(error);
    });
};

export const signup = (userDTO) => {
    return call("/auth/signup", "POST", userDTO);
};

export const signin = (userDTO) => {
    return call("/auth/signin", "POST", userDTO)
    .then(response => {
        if (response.token) {
            //로컬스토리지에 토큰 저장
            localStorage.setItem("ACCESS_TOKEN", response.token);
            //토큰이 존재하는 경우 todo화면으로 리다이렉트
            window.location.href="/";
        }
    })
};

export const signout = () => {
    localStorage.setItem("ACCESS_TOKEN", null);
    window.location.href = "/login";
};