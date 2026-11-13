import {test} from '@playwright/test'
import excel from 'exceljs'
import path from 'node:path'
test('multiple values from excel',async({page})=>{
    let book=new excel.Workbook()
    await book.xlsx.readFile(path.join(__dirname,'../testdata/practice.xlsx'))
    let sheet=await book.getWorksheet('Sheet1')
    let data=[]
    for(let i=2;i<=sheet.rowCount;i++){
        let username=await sheet.getRow(i).getCell(2).value
        let password=await sheet.getRow(i).getCell(3).value
        data.push({
            username,
            password
        })
    }
    for(let datas of data){
        await page.goto('https://practicetestautomation.com/practice-test-login/')
        await page.getByLabel('Username').fill(datas.username)
        await page.getByLabel('Password').fill(datas.password)
    }
})
