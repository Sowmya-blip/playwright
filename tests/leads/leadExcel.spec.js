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