export class organization{
   #accountname
   #website
   #tickersymbol
   #page
   constructor(page){
    this.#page=page
    this.#accountname=page.locator('//input[@name="accountname"]')
    this.#website=page.locator('//input[@name="website"]')
    this.#tickersymbol=page.locator('//input[@name="tickersymbol"]')
   }   
   async createOrg(an,web,tick){
    await this.#accountname.fill(an)
    await this.#website.fill(web)
    await this.#tickersymbol.fill(tick)
   }
}