
import { test } from '@playwright/test';
import { login } from '../../pages/login.js';
import logindata from '../../testdata/login.json';

test('login pom', async ({ page }) => {

    const lobj = new login(page);

    await lobj.launch(logindata.url);

    await lobj.logindata(
        logindata.username,
        logindata.password
    );

});
