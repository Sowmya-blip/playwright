import {test,expect} from '@playwright/test';
test('assertions',async({page})=>{
    await page.goto('http://www.google.com')
    console.log(await page.title())

    //if the assertion is getting failed then i will get the error message in the console
    //even if the error occurs and we wanted to execute the next line then we go for soft assertions

    //toHaveTitle():- it will check for the title.
    await expect(page).toHaveTitle('Google');

    console.log('hii girlss')
    
    //toHaveURL():- it will check  whether the current webpage is having this URL or not.
    await expect(page).toHaveURL(/google\.com/);

    //toBeVisible():- it will check whether the element is visible or not.
    await expect(page.getByRole('combobox',{name:'Search'})).toBeVisible()

    //toBeHidden():- it will check whether the element is hidden or not.
    await expect(page.locator('//textarea[@id="APjFqb"]')).toBeHidden()

    //toHaveText():- it will check for the exact text of the element.
    await page.goto('https://demoapps.qspiders.com/ui?scenario=1')
    await expect(page.locator('//label[@for="name"]')).toHaveText('Name')

    //toContainText():- it will check for the partial text of the element.
    await page.goto('https://demoapps.qspiders.com/ui?scenario=1')
    await expect(page.locator('//label[@for="name"]')).toContainText('Nam')

    //toBeChecked():- it will check whether the checkbox or radio button is checked or not.
    await page.goto('https://demoapps.qspiders.com/ui/checkbox?sublist=0')
    await page.locator('#domain_a').check()
    await expect(page.locator('#domain_a')).toBeChecked()

    //toHaveValue():- it will check whether the element is having the value or not.
    await page.goto('https://demoapps.qspiders.com/ui?scenario=1')
    await page.locator('#name').fill('Sowmya')
    await expect(page.locator('#name')).toHaveValue('Sowmya')

})