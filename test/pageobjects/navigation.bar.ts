import Page from './page';

const tabInvoices = 'nav.navbar a[href="/invoicesTab"]';
/*
 * sub page containing specific selectors and methods for a specific page
 */
class NavigationBar extends Page {
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async goToInvoicesTab() {
        await this.click(tabInvoices);
    }
}

export default new NavigationBar();
