import puppeteer, { ElementHandle } from "puppeteer"

export async function start(email: string, password: string): Promise<string> {
    const browser = await puppeteer.launch({ 
        headless: false,
        executablePath: '' // Path to your Chrome browser 
    })

    const page = await browser.newPage() 

    await page.goto('https://www.max.com/br/pt')

    // Click 'login' button
    await page.locator('div.d-none:nth-child(3) > div:nth-child(1) > a:nth-child(1)').click()
        
    await page.waitForNavigation()

    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 10000)));

    // Click 'accept cookies' button
    const cookiesBtn = '#onetrust-accept-btn-handler'
    await page.waitForSelector(cookiesBtn, { visible: true })
    await page.click(cookiesBtn)

    // Get email input field
    const emailField = await page.evaluateHandle(`document.querySelector("#layer-root-app-content > div.StyledPageContainer-Beam-Web-User__sc-6hfijb-0.lbeabk > div > main > div.StyledPageContentWrapper-Beam-Web-User__sc-6hfijb-3.tZvxf > gi-login-username-and-mvpd").shadowRoot.querySelector("div > div > div.login-username-container > div > gi-login-username").shadowRoot.querySelector("#login-username-input")`)
    if (emailField) await emailField.asElement()!.type(email)

    // Get password input field
    const passwordField = await page.evaluateHandle(`document.querySelector("#layer-root-app-content > div.StyledPageContainer-Beam-Web-User__sc-6hfijb-0.lbeabk > div > main > div.StyledPageContentWrapper-Beam-Web-User__sc-6hfijb-3.tZvxf > gi-login-username-and-mvpd").shadowRoot.querySelector("div > div > div.login-username-container > div > gi-login-username").shadowRoot.querySelector("#login-password-input")`)     
    if (passwordField) await passwordField.asElement()!.type(password)

    // Get 'sign in' button
    const signInButton = await page.evaluateHandle(`document.querySelector("#layer-root-app-content > div.StyledPageContainer-Beam-Web-User__sc-6hfijb-0.lbeabk > div > main > div.StyledPageContentWrapper-Beam-Web-User__sc-6hfijb-3.tZvxf > gi-login-username-and-mvpd").shadowRoot.querySelector("div > div > div.login-username-container > div > gi-login-username").shadowRoot.querySelector("gi-track-analytics-events > div > gi-form > form > div.button-group > button.button.submit-button.button--loud.button--medium.button--full-width")`)
    if (signInButton) await (signInButton as ElementHandle<Element>).click()

    //await browser.close()
    
    return 'Process completed!'
}
