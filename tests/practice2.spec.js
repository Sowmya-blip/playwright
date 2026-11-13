import {test} from '@playwright/test'
import excel from 'exceljs'
import path from 'node:path'

test('data from excel-2',async({page})=>{
    let book=new excel.Workbook()
    await book.xlsx.readFile(path.join(__dirname,'../testdata/practice.xlsx'))
     let sheet=  book.getWorksheet('Sheet2')
    let url=  sheet.getRow(2) .getCell(4).toString()
    let name= sheet.getRow(2).getCell(1).toString()
    let email= sheet.getRow(2).getCell(2).toString()
    let password=sheet.getRow(2).getCell(3).toString()
    await page.goto(url)
    await page.getByLabel('Name').fill(name)
    await page.getByLabel('Email Id').fill(email)
    await page.getByLabel('Password').fill(password)``
    await page.click('//button[@class="disabled:cursor-not-allowed focus:outline-none disabled:opacity-30 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:shadow-outline"]')````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````2222222222222222222222
})