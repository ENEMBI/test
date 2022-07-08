import Page from './page';

const inputEmail = 'input[name="Name"]';
const inputPassword = 'input[name="Pwd"]';
const btnLogin = 'button[type="submit"]';
/*
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login({ email, password }: { email?: string; password?: string }) {
        if (email) {
            await this.setValue(inputEmail, email);
        }
        if (password) {
            await this.setValue(inputPassword, password);
        }
        await this.click(btnLogin);
    }
}

export default new LoginPage();
