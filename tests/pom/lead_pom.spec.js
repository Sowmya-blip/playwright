
import { test } from '@playwright/test';

import logindata from '../../testdata/login.json';
import leaddata from '../../testdata/lead.json';

import { leads } from '../../pages/lead.js';
import { login } from '../../pages/login.js';

test('leads pom', async ({ page }) => {

    const lobj = new login(page);

    await lobj.launch(logindata.url);

    await lobj.logindata(
        logindata.username,
        logindata.password
    );

    const leadobj = new leads(page);

    await leadobj.leadmethod();

    await leadobj.createlead(
        leaddata.firstname,
        leaddata.lastname,
        leaddata.company
    );

    await leadobj.validation(leaddata.lastname);

});
