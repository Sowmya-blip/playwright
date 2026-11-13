import {test} from '@playwright/test'
import { log } from 'node:console'
import opportunitiesdata from '../../testdata/opportunities.json'
import logindata from '../../testdata/login.json'
import excel from 'exceljs'
import path  from 'node:path'

test('Opportunity json data',async({page}) =>{
       //!login to the application
    await page.goto('http://localhost:8888/')
    await page.locator('//input[@name="user_name"]').fill(logindata.username)
    await page.locator('//input[@name="user_password"]').fill(logindata.password)
    await page.locator('//input[@id="submitButton"]').click()

    await page.getByRole('link',{name:"OPPORTUNITIES"}).click()
    await page.locator('//img[@title="Create Opportunity..."]').click()
    
    await page.locator('//input[@name="potentialname"]').fill(opportunitiesdata.potentialname)
    await page.locator('//select[@name="sales_stage"]').selectOption({value:"Qualification"})
    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()

    //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()
})
test('opportunities module',async ({page}) =>{
       //!login to the application
    await page.goto('http://localhost:8888/')
    await page.locator('//input[@name="user_name"]').fill('admin')
    await page.locator('//input[@name="user_password"]').fill('admin')
    await page.locator('//input[@id="submitButton"]').click()

    await page.getByRole('link',{name:"OPPORTUNITIES"}).click()
    await page.locator('//img[@title="Create Opportunity..."]').click()
    
    await page.locator('//input[@name="potentialname"]').fill('Testing')
    await page.locator('//select[@name="sales_stage"]').selectOption({value:"Qualification"})
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
    let sheet= book.getWorksheet('leads')
    let data=[]
    for(let i=2;i<=sheet.rowCount;i++){
        let potentialname=sheet.getRow(i).getCell(1).value
        
        data.push({
            potentialname
        })
    }
    console.log(data)
    //pass multiple test data
    for(let datas of data){
        console.log('creating lead:',datas.potentialname);
        
    await page.getByRole('link',{name:"OPPORTUNITIES"}).first().click()
    await page.locator('//img[@title="Create Opportunity..."]').click()
    await page.locator('//input[@name="potentialname"]').fill(datas.potentialname)
    await page.locator('//select[@name="sales_stage"]').selectOption({value:"Qualification"})
    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()
    }
})

