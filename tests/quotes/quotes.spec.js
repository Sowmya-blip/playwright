import {test} from '@playwright/test'
import excel from 'exceljs'
import path from 'node:path'
import { windowHandling } from '../windowhandling'
import { dropdown } from '../windowhandling'

test.only('contact module',async ({page}) =>{
    //! login to the application
    await page.goto('http://localhost:8888/')
    await page.locator('//input[@name="user_name"]').fill('admin')
    await page.locator('//input[@name="user_password"]').fill('admin')
    await page.locator('//input[@id="submitButton"]').click()
    await page.locator("//a[text()='More']").hover()
    await page.locator('//a[@name="Quotes"]').click()
    await page.locator('//img[@title="Create Quote..."]').click()
    await page.locator('//input[@name="subject"]').fill('playwright')
    //utils
    let newtab1=await windowHandling(page,page.locator('(//img[@src="themes/softed/images/select.gif"])[1]').click());
    await newtab1.locator('//input[@id="search_txt"]').click();

    await page.locator('//textarea[@name="bill_street"]').fill('4-6-184,kumarpally,hanamkonda')
    await page.locator('//textarea[@name="ship_street"]').fill('Temple bustop ,kphb,hyderabad')

    await page.locator('//input[@name="qty1"]').fill('2')
    await page.locator('//input[@name="listPrice1"]').fill('10')

    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()
    //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()
})
test('leads data from excel',async({page})=>{

    //login
    await page.goto('http://localhost:8888/')
    await page.locator('//input[@name="user_name"]').fill('admin')
    await page.locator('//input[@name="user_password"]').fill('admin')

    await page.click('//input[@id="submitButton"]')

    //read excel file
    let book=new excel.Workbook()

    await book.xlsx.readFile(path.join(__dirname,'../../testdata/New Microsoft Excel Worksheet.xlsx'))
    let sheet= book.getWorksheet('organization')
    let data=[]
    for(let i=2;i<=sheet.rowCount;i++){
        let subject=sheet.getRow(i).getCell(1).text
        let bill_street=sheet.getRow(i).getCell(2).text
        let ship_street=sheet.getRow(i).getCell(3).text
        let qty1=sheet.getRow(i).getCell(4).text
        let listPrice1=sheet.getRow(i).getCell(5).text
        data.push({
           subject,
           bill_street,
           ship_street,
           qty1,
           listPrice1
        })
    }
    console.log(data)
    //pass multiple test data
    for(let datas of data){
    await page.locator("//a[text()='More']").hover()
    await page.locator('//a[@name="Quotes"]').click()
    await page.locator('//img[@title="Create Quote..."]').first().click()
    await page.locator('//input[@name="subject"]').fill(datas.subject)

    await page.locator('//select[@name="quotestage"]').selectOption({value:"Accepted"})

    await page.locator('//textarea[@name="bill_street"]').fill(datas.bill_street)
    await page.locator('//textarea[@name="ship_street"]').fill(datas.ship_street)

    await page.locator('//input[@name="qty1"]').fill(datas.qty1)
    await page.locator('//input[@name="listPrice1"]').fill(datas.listPrice1)

    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()
    }
})

