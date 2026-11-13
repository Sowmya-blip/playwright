
export class login {
    #username;
    #password;
    #save;
    #page;

    constructor(page){
        this.#page = page;
        this.#username = page.locator('//input[@name="user_name"]');
        this.#password = page.locator('//input[@name="user_password"]');
        this.#save = page.locator('//input[@id="submitButton"]');
    }
    
    async launch(url) {
        await this.#page.goto(url);
    }

    async logindata(un, pass) {
        await this.#username.fill(un);
        await this.#password.fill(pass);
        await this.#save.click();
    }
}
