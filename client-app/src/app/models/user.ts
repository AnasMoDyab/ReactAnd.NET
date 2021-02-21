export interface User {
    username: string;
    displayName: string;
    token: string;
    image?: string;
}


export interface UserFormValue {
    emai: string;
    password: string;
    displayName: string;
    username?: string;

}