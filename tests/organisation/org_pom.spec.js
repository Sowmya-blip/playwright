import {test} from '@playwright/test'

import logindata from '../../testdata/login.json'
import orgdata from '../../testdata/organization.json'

import {login} from '../../pages/login.js'
import { organization } from '../../pages/org.js'

test('org data pom',async({page})=>{
    const lobj = new login(page);

    await lobj.launch(logindata.url);

    await lobj.logindata(
        logindata.username,
        logindata.password
    );

    const organizationPom=new organization(page);

    await organizationPom.launch()

    await orgns.createOrg(
        orgdata.accountname,
        orgdata.website,
        orgdata.tickersymbol
    )
})