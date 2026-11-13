import {test} from '@playwright/test';
import { log } from 'node:console'
import orgdata from '../../testdata/organization.json'
import logindata from '../../testdata/login.json'
import excel from 'exceljs'
import path from 'node:path'

test('organisation module',async({page})=>{
    //!login to the application
    await page.goto('http://localhost:8888/')
    await page.locator('//input[@name="user_name"]').fill('admin')
    await page.locator('//input[@name="user_password"]').fill('admin')
    await page.locator('//input[@id="submitButton"]').click()

    await page.getByRole('link',{name:"Organizations"}).click()
    //creating organisation
    await page.locator('//img[@title="Create Organization..."]').click()
    await page.locator('//input[@name="accountname"]').fill('Qspider5')
    await page.locator('//input[@name="website"]').fill('meesho')
    await page.locator('//input[@name="tickersymbol"]').fill('uhusxsn')
    await page.locator('//select[@name="industry"]').selectOption({value:'Banking'})
    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()

    //validating
    let accountname= await page.locator('//input[@name="accountname"]').inputValue()

    if(accountname.includes('Qspider5')){
        console.log('organisation is created');
    }
    else{
        console.log('organisation is not created');
    }

    //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()
     await page.locator('//input[@name="user_name"]').fill('admin')
    await page.locator('//input[@name="user_password"]').fill('admin')
    await page.locator('//input[@id="submitButton"]').click()
    await page.click('//img[@src="themes/softed/images/btnL3Calendar.gif"]')
    await page.click("//b[text()='November 2026']/ancestor::div[@id='miniCal']//a[text()='29']")
})
//using json
test('organization ddt ',async({page})=>{
    await page.goto('http://localhost:8888/')
    await page.locator('//input[@name="user_name"]').fill(logindata.username)
    await page.locator('//input[@name="user_password"]').fill(logindata.password)
    await page.click('//input[@id="submitButton"]')

    await page.getByRole('link',{name:"Organizations"}).click()
    await page.locator('//img[@title="Create Organization..."]').click()
    await page.locator('//input[@name="accountname"]').fill(orgdata.accountname)
    await page.locator('//input[@name="website"]').fill(orgdata.website)
    await page.locator('//input[@name="tickersymbol"]').fill(orgdata.tickersymbol)
    await page.locator('//select[@name="industry"]').selectOption({value:'Banking'})
    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()

    //validating
   let accountname= await page.locator('//input[@name="accountname"]').inputValue()

    if(accountname.includes(orgdata.accountname)){
        console.log('organisation is created');
    }
    else{
        console.log('organisation is not created');
    }

})
//using excel data
test.only('leads data from excel',async({page})=>{

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
        let accountname=sheet.getRow(i).getCell(1).value
        let website=sheet.getRow(i).getCell(2).value
        let tickersymbol=sheet.getRow(i).getCell(3).value
        data.push({
            accountname,
            website,
            tickersymbol
        })
    }
    console.log(data)
    //pass multiple test data
    for(let datas of data){
        
     await page.getByRole('link',{name:'Organizations'}).first().click()
    await page.locator('//img[@title="Create Organization..."]').click()
    await page.locator('//input[@name="accountname"]').fill(datas.accountname)
    await page.locator('//input[@name="website"]').fill(datas.website)
    await page.locator('//input[@name="tickersymbol"]').fill(datas.tickersymbol)
    await page.locator('//select[@name="industry"]').selectOption({value:'Banking'})
    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()
    }
})

