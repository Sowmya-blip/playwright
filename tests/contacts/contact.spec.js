import {test} from '@playwright/test'
import logindata from '../../testdata/login.json'
import leaddata from '../../testdata/lead.json'
import excel from 'exceljs'
import path from 'node:path'

test.only('contact module',async({page}) =>{

    // Login to application
    await page.goto('http://localhost:8888/')

    await page.locator('//input[@name="user_name"]').fill('admin')
    await page.locator('//input[@name="user_password"]').fill('admin')
    await page.locator('//input[@id="submitButton"]').click()

    // Click Contacts
    await page.getByRole('link',{name:'CONTACTS'}).click()

    // Create Contact
    await page.locator('//img[@title="Create Contact..."]').click()

    // Creating contact
    await page.locator('//select[@name="salutationtype"]').selectOption({value:"Ms."})
    await page.locator('//input[@name="firstname"]').fill('sowmya')
    await page.locator('//input[@name="lastname"]').fill('gunreddy')
    await page.locator('//input[@name="account_name"]').click()
    const newWindowPromise =page.waitForEvent('popup')
    await page.locator('//img[@src="themes/softed/images/select.gif"]').click()
    const newWindow = await newWindowPromise

    await newWindow.waitForLoadState()

    console.log('Child window title:',await newWindow.title())

    console.log('Child window URL:',newWindow.url())

    // Close child window
    await newWindow.close()

    // Parent window URL
    console.log('Parent window URL:',page.url())



    // Validation
    let firstname = await page.locator('//input[@name="firstname"]').inputValue()
    let lastname = await page.locator('//input[@name="lastname"]').inputValue()

    if(firstname.includes('sowmya') && lastname.includes('gunreddy')){
        console.log('Contact is created successfully')
    }else{
        console.log('Contact is not created')
    }

    // Logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()

})
    test('contact data using json',async ({page}) =>{
    //login to the application
    await page.goto('http://localhost:8888/')
    await page.locator('//input[@name="user_name"]').fill(logindata.username)
    await page.locator('//input[@name="user_password"]').fill(logindata.password)
    await page.locator('//input[@id="submitButton"]').click()

    await page.getByRole('link',{name:'CONTACTS'}).click()
    await page.locator('//img[@title="Create Contact..."]').click()

    //creating contact
    await page.locator('//select[@name="salutationtype"]').selectOption({value:"Ms."})
    await page.locator('//input[@name="firstname"]').fill(leaddata.firstname)
    await page.locator('//input[@name="lastname"]').fill(leaddata.lastname)
    
    let firstname= await page.locator('//input[@name="firstname"]').inputValue();
    let lastname=await page.locator('//input[@name="lastname"]').inputValue();
    if(lastname.includes(leaddata.lastname)&&firstname.includes(leaddata.firstname)){
        console.log('contact  is created');
    }else{
        console.log('contact is not created');
    }
    //! logout
    await page.locator('//img[@src="themes/softed/images/user.PNG"]').hover()
    await page.locator('//a[text()="Sign Out"]').click()
    })
    test('contact data using excel',async({page})=>{
         //login
            await page.goto('http://localhost:8888/')
            await page.locator('//input[@name="user_name"]').fill('admin')
            await page.locator('//input[@name="user_password"]').fill('admin')
        
            await page.click('//input[@id="submitButton"]')
        
            //read excel file
            let book=new excel.Workbook()
        
            await book.xlsx.readFile(path.join(__dirname,'../../testdata/New Microsoft Excel Worksheet.xlsx'))
            let sheet= book.getWorksheet('contact')
            let data=[]
            for(let i=2;i<=sheet.rowCount;i++){
                let firstname=sheet.getRow(i).getCell(1).value
                let lastname=sheet.getRow(i).getCell(2).value
            
                data.push({
                    firstname,
                    lastname,
                })
            }
            console.log(data)
            //pass multiple test data
            for(let datas of data){
                console.log('creating lead:',datas.firstname);
                 await page.getByRole('link',{name:'CONTACTS'}).first().click()
                 await page.locator('//img[@title="Create Contact..."]').click()
                 await page.locator('//input[@name="firstname"]').fill(datas.firstname)
                 await page.locator('//input[@name="lastname"]').fill(datas.lastname)
    }
    })
