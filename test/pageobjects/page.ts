/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
const defaultTimeout = 10000;
const advancedBtn = '#details-button, #advancedButton';
const proceedLnk = '#proceed-link, #exceptionDialogButton';

export default class Page {
    public async getElement(element: string) {
        return await $(element);
    }

    public async getAllElements(element: string) {
        return await $$(element);
    }

    public async getAllElementsByText(element: string, text: string) {
        return await $$(element + `[contains(.,'${text}')]`);
    }

    public async getElementByIndex(element: string, index: number) {
        return await $(element + `[${index}]`);
    }

    public async getElementByText(element: string, text: string) {
        return await $(element + `[contains(.,'${text}')]`);
    }

    // public async getElementByIndex(element: string, index: number): Promise<any> {
    //     return await (await this.getAllElements(element)[index]);
    // }

    public async isElementDisplayed(element: string) {
        return await (await this.getElement(element)).isDisplayed();
    }

    public async isElementByIndexDisplayed(element: string, index: number) {
        return await (await this.getElementByIndex(element, index)).isDisplayed();
    }

    public async isElementByTextDisplayed(element: string, text: string) {
        return await (await this.getElementByText(element, text)).isDisplayed();
    }

    public async isElementClickable(element: string) {
        return await (await this.getElement(element)).isClickable();
    }

    public async isElementByIndexClickable(element: string, index: number) {
        return await (await this.getElementByIndex(element, index)).isClickable();
    }

    public async isElementSelected(element: string) {
        return await (await this.getElement(element)).isSelected();
    }

    public async isElementByIndexSelected(element: string, index: number) {
        return await (await this.getElementByIndex(element, index)).isSelected();
    }

    public async isElementExisting(element: string) {
        return await (await this.getElement(element)).isExisting();
    }

    public async isElementByIndexExisting(element: string, index: number) {
        return await (await this.getElementByIndex(element, index)).isExisting();
    }

    public async isElementByTextExisting(element: string, text: string) {
        return await (await this.getElementByText(element, text)).isExisting();
    }

    public async waitForElementDisplayed(element: string) {
        await (await this.getElement(element)).waitForDisplayed();
    }

    public async waitForElementNotDisplayed(element: string) {
        await (await this.getElement(element)).waitForDisplayed({ reverse: true });
    }

    public async waitForElementDisplayedByIndex(element: string, index: number) {
        await (await this.getElementByIndex(element, index)).waitForDisplayed();
    }

    public async waitForElementClickable(element: string, timeout = defaultTimeout) {
        await (await this.getElement(element)).waitForClickable({ timeout: timeout });
    }

    public async waitForElementClickableByIndex(element: string, index: number) {
        await (await this.getElementByIndex(element, index)).waitForClickable();
    }

    public async waitForElementClickableByText(element: string, text: string) {
        await (await this.getElementByText(element, text)).waitForClickable();
    }

    public async waitForElementExists(element: string) {
        await (await this.getElement(element)).waitForExist();
    }

    public async waitForElementExistsByIndex(element: string, index: number) {
        await (await this.getElementByIndex(element, index)).waitForExist();
    }

    public async waitUntilDisplayed(element: string, timeout = defaultTimeout) {
        await browser.waitUntil(
            async () => {
                return await (await this.getElement(element)).isDisplayed();
            },
            { timeout: timeout }
        );
    }

    public async waitUntilNotDisplayed(element: string, timeout = defaultTimeout) {
        await browser.waitUntil(
            async () => {
                return !(await (await this.getElement(element)).isDisplayed());
            },
            { timeout: timeout }
        );
    }

    public async waitUntilSelected(element: string) {
        await browser.waitUntil(async () => {
            return await (await this.getElement(element)).isSelected();
        });
    }

    public async waitUntilSelectedByIndex(element: string, index: number) {
        await browser.waitUntil(async () => {
            return await (await this.getElementByIndex(element, index)).isSelected();
        });
    }

    public async click(element: string) {
        await this.waitForElementClickable(element);
        await (await this.getElement(element)).click();
    }

    public async clickByIndex(element: string, index: number) {
        await this.waitForElementClickableByIndex(element, index);
        await (await this.getElementByIndex(element, index)).click();
    }

    public async clickByText(element: string, text: string) {
        await this.waitForElementClickableByText(element, text);
        await (await this.getElementByText(element, text)).click();
    }

    public async doubleClick(element: string) {
        await this.waitForElementClickable(element);
        await (await this.getElement(element)).doubleClick();
    }

    public async moveTo(element: string) {
        await this.waitForElementClickable(element);
        await (await this.getElement(element)).moveTo();
    }

    public async dragAndDrop(element: string, target: string) {
        await this.waitForElementClickable(element);
        await (await this.getElement(element)).dragAndDrop(await this.getElement(target));
    }

    public async dragAndDropByText(element: string, text: string, target: string) {
        await this.waitForElementClickable(element);
        await (await this.getElementByText(element, text)).dragAndDrop(await this.getElement(target));
    }

    public async dragAndDropByPosition(element: string, X: number, Y: number) {
        await this.waitForElementClickable(element);
        await (await this.getElement(element)).dragAndDrop({ x: X, y: Y });
    }

    public async selectElementByAttribute(element: string, attr, text: string) {
        await this.waitForElementClickable(element);
        await (await this.getElement(element)).selectByAttribute(attr, text);
    }
    public async selectElementByVisibleText(element: string, text: string) {
        await this.waitForElementClickable(element);
        await (await this.getElement(element)).selectByVisibleText(text);
    }

    public async selectElementByIndex(element: string, index: number) {
        await this.waitForElementClickable(element);
        await (await this.getElement(element)).selectByIndex(index);
    }

    public async getElementText(element: string) {
        await this.waitForElementDisplayed(element);
        return await (await this.getElement(element)).getText();
    }

    public async getElementByTextText(element: string, text: string) {
        await this.waitForElementDisplayed(element);
        return await (await this.getElementByText(element, text)).getText();
    }

    public async getElementByIndexText(element: string, index: number): Promise<string> {
        await this.waitForElementDisplayedByIndex(element, index);
        return await (await this.getElementByIndex(element, index)).getText();
    }

    public async waitUntilElementIncludesText(element: string, text: string) {
        await browser.waitUntil(async () => {
            return await (await this.getElementText(element)).includes(text);
        });
    }

    public async waitUntilElementByIndexIncludesText(element: string, index: number, text: string, timeout = defaultTimeout) {
        await browser.waitUntil(
            async () => {
                return await (await this.getElementByIndexText(element, index)).includes(text);
            },
            { timeout: timeout }
        );
    }

    public async getElementValue(element: string) {
        await this.waitForElementDisplayed(element);
        return await (await this.getElement(element)).getValue();
    }

    public async getElementByIndexValue(element: string, index: number) {
        await this.waitForElementDisplayedByIndex(element, index);
        return await (await this.getElementByIndex(element, index)).getValue();
    }

    public async waitUntilElementIncludesValue(element: string, value) {
        await browser.waitUntil(async () => {
            return await (await this.getElementValue(element)).includes(value);
        });
    }

    public async waitUntilElementByIndexIncludesValue(element: string, index: number, value) {
        await browser.waitUntil(async () => {
            return await (await this.getElementByIndexValue(element, index)).includes(value);
        });
    }

    public async getElementAttribute(element: string, attribute) {
        await this.waitForElementExists(element);
        return await (await this.getElement(element)).getAttribute(attribute);
    }

    public async getElementByIndexAttribute(element: string, index: number, attribute) {
        await this.waitForElementExistsByIndex(element, index);
        return await (await this.getElementByIndex(element, index)).getAttribute(attribute);
    }

    public async waitUntilElementIncludesAttribute(element: string, attribute, text: string) {
        await browser.waitUntil(async () => {
            return await (await this.getElementAttribute(element, attribute)).includes(text);
        });
    }

    public async waitUntilElementByIndexIncludesAttribute(element: string, index: number, attribute, text: string) {
        await browser.waitUntil(async () => {
            return await (await this.getElementByIndexAttribute(element, index, attribute)).includes(text);
        });
    }

    public async scrollElementIntoViewTop(element: string) {
        await (await this.getElement(element)).scrollIntoView();
    }

    public async scrollElementIntoViewBottom(element: string) {
        await (await this.getElement(element)).scrollIntoView(false);
    }

    public async scrollElementByIndexIntoViewTop(element: string, index: number) {
        await (await this.getElementByIndex(element, index)).scrollIntoView();
    }

    public async scrollElementByIndexIntoViewBottom(element: string, index: number) {
        await (await this.getElementByIndex(element, index)).scrollIntoView(false);
    }

    public async scrollElementByTextIntoViewTop(element: string, text: string) {
        await (await this.getElementByText(element, text)).scrollIntoView();
    }

    public async scrollElementByTextIntoViewBotton(element: string, text: string) {
        await (await this.getElementByText(element, text)).scrollIntoView(false);
    }

    public async setValue(element: string, value) {
        await this.waitForElementDisplayed(element);
        await (await this.getElement(element)).setValue(value);
    }

    public async setValueByIndex(element: string, index: number, value) {
        await this.waitForElementDisplayedByIndex(element, index);
        await (await this.getElementByIndex(element, index)).setValue(value);
    }

    public async addValue(element: string, value) {
        await this.waitForElementDisplayed(element);
        await (await this.getElement(element)).addValue(value);
    }

    public async addValueByIndex(element: string, index: number, value) {
        await this.waitForElementDisplayedByIndex(element, index);
        await (await this.getElementByIndex(element, index)).addValue(value);
    }

    public async clearValue(element: string) {
        await this.waitForElementDisplayed(element);
        await (await this.getElement(element)).clearValue();
    }

    public async clearValueByIndex(element: string, index: number) {
        await this.waitForElementDisplayedByIndex(element, index);
        await (await this.getElementByIndex(element, index)).clearValue();
    }

    public async cleanValue(element: string) {
        let valueLength = (await this.getElementValue(element)).length;
        let backSpaces = new Array(valueLength).fill('Backspace');
        await this.addValue(element, backSpaces);
    }

    public async clickBackspace(element: string) {
        await this.addValue(element, 'Backspace');
    }

    public async getListSize(element: string): Promise<number> {
        return (await this.getAllElements(element)).length;
    }

    public async getListSizeByText(element: string, text: string): Promise<number> {
        return (await this.getAllElementsByText(element, text)).length;
    }

    public async isBrowserAdvancedBtnDisplayed() {
        return await this.isElementDisplayed(advancedBtn);
    }

    public async clickBrowserAdvancedBtn() {
        await this.click(advancedBtn);
    }

    public async clickBrowserProceedLnk() {
        await this.click(proceedLnk);
    }

    public async clickEnterKey() {
        await browser.keys('\uE007');
    }

    public async clickBackSpaceKey() {
        await browser.keys('\ue003');
    }

    public async clickArrowUpKey() {
        await browser.keys('\ue013');
    }

    public async clickArrowDownKey() {
        await browser.keys('\ue015');
    }

    public async displayBlock(element: string) {
        //@ts-ignore
        await browser.execute(async (el) => (el.style.display = 'block'), await $(element));
    }
    public async refreshPage() {
        await browser.refresh();
        await browser.pause(1000);
    }
    public async clearSessionStorage() {
        await browser.execute('window.sessionStorage.clear()');
        await browser.refresh();
    }
    public async switchToTab(index: number) {
        let tab = await browser.getWindowHandles();
        await browser.switchToWindow(tab[index - 1]);
    }
    public async switchToLastTab() {
        let tab = await browser.getWindowHandles();
        await browser.switchToWindow(tab[tab.length - 1]);
    }

    public async switchToFrame(element: string) {
        await browser.switchToFrame(this.getElement(element));
    }
}
