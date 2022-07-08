import loginPage from '../pageobjects/login.page';
import navigationBar from '../pageobjects/navigation.bar';
import invoicesPage from '../pageobjects/invoices.page';
import { admin } from '../../environment/account.json';
import { numberWithCommas, shuffle } from '../utilities/helper';
let firstDiscount: string;
let firstTotal: string;
let secondDiscount: string;
let secondTotal: string;
var randomNums = shuffle();
describe('Test', () => {
    before('Login.', async () => {
        await browser.url('https://onetrackui.azurewebsites.net/login');
        await loginPage.login({ email: admin.email, password: admin.password });
        expect(browser).not.toHaveUrlContaining('login');
    });

    it('Should go to invoices tab.', async () => {
        await navigationBar.goToInvoicesTab();
        expect(browser).toHaveUrlContaining('invoicesTab/list');
    });

    it('Should go to invoice creation page.', async () => {
        await invoicesPage.clickBtnAddNewInvoice();
        expect(browser).toHaveUrlContaining('invoicesTab/overview/0');
    });

    it('Should seach for "Agape Mechanical" customer by "agape".', async () => {
        await invoicesPage.searchForCustomer('agape');
        expect(await invoicesPage.isCustomerDisplayed('Agape Mechanical')).toBe(true);
    });

    it('Should select "Agape Mechanical" customer.', async () => {
        await invoicesPage.selectCustomer('Agape Mechanical');
        expect(await invoicesPage.isSelectedCustomerDisplayed('Agape Mechanical')).toBe(true);
    });

    it('Should click proceed btn.', async () => {
        await invoicesPage.clickBtnProceed();
        expect(await invoicesPage.isHeaderGeneralInfoDisplayed()).toBe(true);
    });

    it('Should select items and set discounts of 10%.', async () => {
        await invoicesPage.selectItem(randomNums.next().value);
        await invoicesPage.setDiscount({ itemNumber: 1, discount: 10 });
        firstDiscount = await invoicesPage.getDiscountByIndexText(1);
        firstTotal = await invoicesPage.getFieldTotalByIndexText(1);
        await invoicesPage.selectItem(randomNums.next().value);
        await invoicesPage.setDiscount({ itemNumber: 2, discount: 10 });
        secondDiscount = await invoicesPage.getDiscountByIndexText(2);
        secondTotal = await invoicesPage.getFieldTotalByIndexText(2);
    });

    it('Should save invoice.', async () => {
        await invoicesPage.saveInvoice();
        expect(await invoicesPage.getAlertText()).toContain('Success! Invoice successfully saved');
    });

    it('Should preview invoice.', async () => {
        await invoicesPage.previewInvoice();
        expect(await invoicesPage.getFieldPreviewDiscountByIndexText(1)).toBe(numberWithCommas(firstDiscount));
        expect(await invoicesPage.getFieldPreviewTotalByIndexText(1)).toBe(numberWithCommas(firstTotal));
        expect(await invoicesPage.getFieldPreviewDiscountByIndexText(2)).toBe(numberWithCommas(secondDiscount));
        expect(await invoicesPage.getFieldPreviewTotalByIndexText(2)).toBe(numberWithCommas(secondTotal));
    });

    it('Should delete invoice.', async () => {
        await invoicesPage.deleteInvoice();
    });
});
