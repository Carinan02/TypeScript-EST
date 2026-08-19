interface Customerr{ //declaration merging
    /**saves the customer somewhere */
    save(): void
}
class Customerr{

}

const customer = new Customerr()
customer.save = function(){

}

const myVar = window.MY_VAR 