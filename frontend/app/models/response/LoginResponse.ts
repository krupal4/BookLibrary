export class LoginResponse {
    public token: string;
    public userId: number;
    
    constructor() {
        this.token = "";
        this.userId = 0;
    }
}