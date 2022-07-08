import Page from './page';

const btnAddNewInvoice = '//button[text()="Add New"]';
const inputSearchCustomer = 'input[name="search"]';
const btnProceed = '//button[text()="Proceed "]';
const headerGeneralInfo = '.header-preview.topsummary.noshadowbox';
const inputItemSearch = 'tr:last-child input[placeholder="Type to search"]';
const btnSearch = '//button[text()=" Search"]';
const listboxItems = '(//div[@role="listbox"]//span[contains(@class,"iname")])';
const btnAddDiscount = '(//a[@data-target="#modalAddDiscountPartLine"])';
const inputDiscoutValue = 'input[name="setDiscountItem.discountValue"]';
const btnSaveDiscount = '//button[text()="Save"]';
const btnActions = 'button[data-toggle="dropdown"]';
const btnSave = '//ul[@class="dropdown-menu"]//a[text()="Save"]';
const btnPreview = '//ul[@class="dropdown-menu"]//a[text()="Preview"]';
const btnDelete = '//ul[@class="dropdown-menu"]//a[text()="Delete"]';
const alert = '.alert';
const modalInvoicePreviewHeader = '//app-report-preview-dialog//h4[text()="Invoice Preview"]';
const modalInvoicePreview = '#reportContent';
const maskLoading = 'app-loading-mask .preloader ';
const btnModalYes = '//div[contains(@class,"warningModal")]//button//span[text()="Yes"]';
const frameInvoicePreview = '#contentHolder';

/*
 * sub page containing specific selectors and methods for a specific page
 */
class InvoicesPage extends Page {
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public itemListSelectCustomer(customer: string) {
        return `(//div[@class="customerlist"])[1]//b[contains(text(),"${customer}")]`;
    }

    public itemListSelectedCustomer(customer: string) {
        return `(//div[@class="customerlist"])[2]//b[contains(text(),"${customer}")]`;
    }

    public fieldPreviewDiscount(item: number) {
        return `div.table-responsive tbody tr:nth-child(${item}) td:nth-child(7)`;
    }

    public fieldTotal(item: number) {
        return `table.dataTable tbody tr:nth-child(${item}) td:nth-child(10)`;
    }

    public fieldPreviewTotal(item: number) {
        return `div.table-responsive tbody tr:nth-child(${item}) td:nth-child(8)`;
    }

    public async selectCustomer(customer: string) {
        await this.click(this.itemListSelectCustomer(customer));
        await browser.pause(2000);
    }

    public async isCustomerDisplayed(customer: string) {
        return await this.isElementDisplayed(this.itemListSelectCustomer(customer));
    }

    public async isSelectedCustomerDisplayed(customer: string) {
        return await this.isElementDisplayed(this.itemListSelectedCustomer(customer));
    }

    public async isHeaderGeneralInfoDisplayed() {
        return await this.isElementDisplayed(headerGeneralInfo);
    }

    public async clickBtnAddNewInvoice() {
        await this.click(btnAddNewInvoice);
    }

    public async clickBtnProceed() {
        await this.click(btnProceed);
    }

    public async getAlertText() {
        await this.waitForElementDisplayed(alert);
        await this.waitUntilNotDisplayed(maskLoading);
        return await this.getElementText(alert);
    }

    public async getDiscountByIndexText(itemNumber: number) {
        return await this.getElementByIndexText(btnAddDiscount, itemNumber);
    }

    public async getFieldPreviewDiscountByIndexText(itemNumber: number) {
        await this.scrollElementIntoViewTop(this.fieldPreviewDiscount(itemNumber));
        return await this.getElementText(this.fieldPreviewDiscount(itemNumber));
    }

    public async getFieldTotalByIndexText(itemNumber: number) {
        return await this.getElementText(this.fieldTotal(itemNumber));
    }

    public async getFieldPreviewTotalByIndexText(itemNumber: number) {
        return await this.getElementText(this.fieldPreviewTotal(itemNumber));
    }

    public async searchForCustomer(customer: string) {
        await this.click(inputSearchCustomer);
        await this.setValue(inputSearchCustomer, customer);
        await this.click(btnSearch);
        await browser.pause(4000);
    }

    public async setInputItemSearchValue(item: string) {
        await this.setValue(inputItemSearch, item);
    }

    public async selectItem(itemNumber) {
        await this.click(inputItemSearch);
        await this.scrollElementByIndexIntoViewBottom(listboxItems, itemNumber);
        await this.clickByIndex(listboxItems, itemNumber);
    }

    public async setDiscount({ itemNumber, discount }: { itemNumber: number; discount: number }) {
        await this.clickByIndex(btnAddDiscount, itemNumber);
        await this.setValue(inputDiscoutValue, discount);
        await this.click(btnSaveDiscount);
        await this.waitUntilElementByIndexIncludesText(btnAddDiscount, itemNumber, '$');
    }

    public async saveInvoice() {
        await this.click(btnActions);
        await this.click(btnSave);
    }

    public async previewInvoice() {
        await this.click(btnActions);
        await this.click(btnPreview);
        await this.waitForElementDisplayed(modalInvoicePreviewHeader);
        await browser.switchToFrame(await browser.$(frameInvoicePreview));
        await this.waitForElementDisplayed(modalInvoicePreview);
    }

    public async deleteInvoice() {
        await browser.refresh();
        await browser.switchToParentFrame();
        await this.click(btnActions);
        await this.click(btnDelete);
        await this.click(btnModalYes);
    }
}

export default new InvoicesPage();
