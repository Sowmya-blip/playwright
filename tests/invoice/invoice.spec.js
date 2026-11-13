import {test} from '@playwright/test'
import logindata from '../../testdata/login.json'
import invoicedata from '../../testdata/invoice.json'
import excel from 'exceljs'
import path from 'node:path'

test('invoice module',async ({page}) => {
       //! login to the application
    await page.goto('http://localhost:8888/')
    await page.locator('//input[@name="user_name"]').fill('admin')
    await page.locator('//input[@name="user_password"]').fill('admin')
    await page.locator('//input[@id="submitButton"]').click()

    await page.locator("//a[text()='More']").hover()
    await page.locator('//a[@name="Invoice"]').click()
    await page.locator('//img[@title="Create Invoice..."]').click()
    await page.locator('//input[@name="subject"]').fill('asdfgh')
    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()
    
    //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()
})
test('invoice module json data ',async ({page}) => {
       //! login to the application
    await page.goto('http://localhost:8888/')
    await page.locator('//input[@name="user_name"]').fill(logindata.username)
    await page.locator('//input[@name="user_password"]').fill(logindata.password)
    await page.locator('//input[@id="submitButton"]').click()

    await page.locator("//a[text()='More']").hover()
    await page.locator('//a[@name="Invoice"]').click()
    await page.locator('//img[@title="Create Invoice..."]').click()
    await page.locator('//input[@name="subject"]').fill(invoicedata.subject)
    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()
    
    //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()
})
test.only(' data from excel',async({page})=>{

    //login
    await page.goto('http://localhost:8888/')
    await page.locator('//input[@name="user_name"]').fill('admin')
    await page.locator('//input[@name="user_password"]').fill('admin')

    await page.click('//input[@id="submitButton"]')

    //read excel file
    let book=new excel.Workbook()

    await book.xlsx.readFile(path.join(__dirname,'../../testdata/New Microsoft Excel Worksheet.xlsx'))
    let sheet= book.getWorksheet('invoice')
    let data=[]
    for(let i=2;i<=sheet.rowCount;i++){
        let subject=sheet.getRow(i).getCell(1).value
        
        data.push({
            subject
        })
    }
    console.log(data)
    //pass multiple test data
    for(let datas of data){
         await page.locator("//a[text()='More']").hover()
    await page.locator('//a[@name="Invoice"]').click()
    await page.locator('//img[@title="Create Invoice..."]').first().click()
    await page.locator('//input[@name="subject"]').fill(datas.subject)
    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()
    }
})




