// import {test} from '@playwright/test'

// test('Window handling',async({page})=>{

//     await page.goto('https://the-internet.herokuapp.com/windows')

//     // Wait for new window
//     const newWindowPromise= page.waitForEvent('popup')

//     // Click link
//     await page.locator('//a[text()="Click Here"]').click()

//     // Capture new window
//     const newWindow = await newWindowPromise

//     await newWindow.waitForLoadState()

//     // Print title
//     console.log(await newWindow.title())

//     // Print URL
//     console.log(newWindow.url())

//     // Close child window
//     await newWindow.close()

//     // Parent window
//     console.log(page.url())

// })

export async function windowHandling(page,action){
    let [popup]=await Promise.all([
        page.waitForEvent('popup'),
        action
    ])
    return popup
}
export function dropdown(a,b){
    return a.selectOption(b)
}