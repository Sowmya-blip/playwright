
import { expect } from '@playwright/test';

export class leads{
    #lead;
    #createlead;
    #salutationtype;
    #firstname;
    #lastname;
    #company;
    #save;
    #validationText;

    constructor(page) {

        this.#lead = page.locator('//a[@href="index.php?module=Leads&action=index"]');

        this.#createlead = page.locator('//img[@src="themes/softed/images/btnL3Add.gif"]');

        this.#salutationtype = page.locator('//select[@name="salutationtype"]');

        this.#firstname = page.locator('//input[@name="firstname"]');

        this.#lastname = page.locator('//input[@name="lastname"]');

        this.#company = page.locator('//input[@name="company"]');

        this.#save = page.locator('//input[@class="crmbutton small save"]');

        this.#validationText = page.locator('//span[@class="dvHeaderText"]');
    }

    async leadmethod() {
        await this.#lead.click();
    }

    async createlead(firstname, lastname, company) {
        await this.#createlead.click();

        await this.#salutationtype.selectOption({ label: 'Ms.' });

        await this.#firstname.fill(firstname);

        await this.#lastname.fill(lastname);

        await this.#company.fill(company);

        await this.#save.click();
    }

    async validation(lastname) {
        await expect(this.#validationText).toContainText(lastname);
    }
}
