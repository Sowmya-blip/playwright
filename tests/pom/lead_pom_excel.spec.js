
import { test } from '@playwright/test';
import logindata from '../../testdata/login.json';
import { login } from '../../pages/login.js';
import { leads } from '../../pages/lead.js'
import ExcelJS from 'exceljs';
import path from 'node:path';

test('lead data from excel pom', async ({ page })=>{
    // Login
    const loginobj = new login(page);

    await loginobj.launch(logindata.url);

    await loginobj.logindata(
        logindata.username,
        logindata.password
    );
    // Read Excel file
    const book = new ExcelJS.Workbook();

    await book.xlsx.readFile(
        path.resolve('testdata', 'New Microsoft Excel Worksheet.xlsx')
    );
    const sheet = book.getWorksheet('leads');
    if (!sheet){
        throw new Error('Worksheet named leads not found');
    }
    // Read Excel data
    const data = [];

    for (let i = 2; i <= sheet.rowCount; i++) {

        const firstname = sheet.getRow(i).getCell(1).value;
        const lastname = sheet.getRow(i).getCell(2).value;
        const company = sheet.getRow(i).getCell(3).value;

        if (firstname && lastname && company){
            data.push({
                firstname: String(firstname),
                lastname: String(lastname),
                company: String(company)
            });
        }
    }

    console.log(data);

    // Create multiple leads
    for (const datas of data) {

        console.log('Creating lead:', datas.firstname);

        const leadpage = new leads(page);

        await leadpage.leadmethod();

        await leadpage.createlead(
            datas.firstname,
            datas.lastname,
            datas.company
        );

        await leadpage.validation(datas.lastname);
    }

});
