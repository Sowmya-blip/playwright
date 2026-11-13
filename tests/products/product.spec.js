import {test} from '@playwright/test'
import { log } from 'node:console'
import logindata from '../../testdata/login.json'
import productsdata from '../../testdata/products.json'
import excel from 'exceljs'
import path from 'node:path'

test('product module',async ({page})=> {
       //! login to the application
    await page.goto('http://localhost:8888/')
    await page.locator('//input[@name="user_name"]').fill('admin')
    await page.locator('//input[@name="user_password"]').fill('admin')
    await page.locator('//input[@id="submitButton"]').click()

    await page.getByRole('link',{name:"Products"}).click()
    await page.locator('//img[@title="Create Product..."]').click()

    await page.locator('//input[@name="productname"]').fill('mobile')
    await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()

     //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()
})
test('product module from json data ',async ({page})=> {
       //! login to the application
    await page.goto('http://localhost:8888/')
    await page.locator('//input[@name="user_name"]').fill(logindata.username)
    await page.locator('//input[@name="user_password"]').fill(logindata.password)
    await page.locator('//input[@id="submitButton"]').click()

    await page.getByRole('link',{name:"Products"}).click()
    await page.locator('//img[@title="Create Product..."]').click()

    await page.locator('//input[@name="productname"]').fill(productsdata.productname)
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
    let sheet= book.getWorksheet('products')
    let data=[]
    for(let i=2;i<=sheet.rowCount;i++){
        let productname=sheet.getRow(i).getCell(1).value
        
        data.push({
            productname
        })
    }
    console.log(data)
    //pass multiple test data
    for(let datas of data){

        await page.getByRole('link',{name:"Products"}).first().click()
        await page.locator('//img[@title="Create Product..."]').click()

        await page.locator('//input[@name="productname"]').fill(datas.productname)
        await page.locator('(//input[@title="Save [Alt+S]"])[1]').click()

    }
})

