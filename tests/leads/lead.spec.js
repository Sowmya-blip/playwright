import {test} from '@playwright/test';
import logindata from '../../testdata/login.json';
import leadname from '../../testdata/lead.json';
import excel from 'exceljs'
import path from 'node:path'

test('leads module',async({page})=>{
    await page.goto('http://localhost:8888/')

    await page.locator('//input[@name="user_name"]').fill('admin')
    await page.locator('//input[@name="user_password"]').fill('admin')
    await page.click('//input[@id="submitButton"]')
    await page.click('//a[@href="index.php?module=Leads&action=index"]')

    await page.click('//img[@src="themes/softed/images/btnL3Add.gif"]')
    await page.locator('//select[@name="salutationtype"]').selectOption({value:'Ms.'})
    await page.locator('//input[@name="firstname"]').fill('srilatha')
    await page.locator('//input[@name="lastname"]').fill('gunreddy')
    await page.locator('//input[@name="company"]').fill('Amazon')
    await page.locator('//select[@name="industry"]').selectOption({value:"Engineering"})
    await page.locator('//input[@name="annualrevenue"]').fill('0')
    await page.locator('//input[@class="crmbutton small save"]').click()
    //! validating the lead
    //extracting the values from the input fields to validate them
    let firstname= await page.locator('//input[@name="firstname"]').inputValue();
    let lastname=await page.locator('//input[@name="lastname"]').inputValue();
    if(lastname.includes('gunreddy')&&firstname.includes('srilatha')){
        console.log('lead is created');
    }else{
        console.log('lead is not created');
    } 
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').click()
    await page.locator('//a[@href="index.php?module=Users&action=Logout"]').click()
})
//using json data
test('leads module2 from json',async({page})=>{
    await page.goto('http://localhost:8888/')
    await page.locator('//input[@name="user_name"]').fill(logindata.username)
    await page.locator('//input[@name="user_password"]').fill(logindata.password)
    await page.click('//input[@id="submitButton"]')
    await page.click('//a[@href="index.php?module=Leads&action=index"]')
    await page.click('//img[@src="themes/softed/images/btnL3Add.gif"]')
    await page.locator('//select[@name="salutationtype"]').selectOption({value:'Ms.'})
    await page.locator('//input[@name="firstname"]').fill(leadname.firstname)
    await page.locator('//input[@name="lastname"]').fill(leadname.lastname)
    await page.locator('//input[@name="company"]').fill(leadname.company)
    await page.locator('//select[@name="industry"]').selectOption({value:"Engineering"})
    await page.locator('//input[@name="annualrevenue"]').fill(leadname.annualrevenue)
    await page.locator('//input[@class="crmbutton small save"]').click()
    //! validating the lead
    //extracting the values from the input fields to validate them
    let firstname= await page.locator('//input[@name="firstname"]').inputValue();
    let lastname=await page.locator('//input[@name="lastname"]').inputValue();
    if(lastname.includes(leadname.lastname)&&firstname.includes(leadname.firstname)){
        console.log('lead is created');
    }else{
        console.log('lead is not created');
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
    let sheet= book.getWorksheet('leads')
    let data=[]
    for(let i=2;i<=sheet.rowCount;i++){
        let firstname=sheet.getRow(i).getCell(1).value
        let lastname=sheet.getRow(i).getCell(2).value
        let company=sheet.getRow(i).getCell(3).value
        let email=sheet.getRow(i).getCell(4).value
        data.push({
            firstname,
            lastname,
            company,
            email
        })
    }
    console.log(data)
    //pass multiple test data
    for(let datas of data){
        console.log('creating lead:',datas.firstname);
        await page.getByRole('link',{name:'Leads'}).first().click()
         await page.getByRole('img',{name:'Create Lead...'}).click()
         await page.locator('//input[@name="firstname"]').fill(datas.firstname)
         await page.locator('//input[@name="lastname"]').fill(datas.lastname)
         await page.locator('//input[@name="company"]').fill(datas.company)
         await page.getByRole('button',{name:'save'}).first().click()
    }
})
