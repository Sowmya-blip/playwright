import {test} from '@playwright/test'
import excel from 'exceljs'
import path from 'node:path'

test('data from excel',async({page})=>{
    let book=new excel.Workbook()
    await book.xlsx.readFile(path.join(__dirname,'../testdata/practice.xlsx'))
    let sheet= await book.getWorksheet('Sheet1')
    let url= await sheet.getRow(2) .getCell(1).toString()
    let username= await sheet.getRow(2).getCell(2).toString()
    let password=await sheet.getRow(2).getCell(3).toString()
    await page.goto(url)
    await page.getByLabel('Username').fill(username)
    await page.getByLabel('Password').fill(password)
})