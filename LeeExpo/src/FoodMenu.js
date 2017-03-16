function MenuItem(name , time , special='', sametime=''){
        this.name = name;
        this.time = time;
        this.state = 0;
        this.special = special;
        this.sametime = sametime;
        this.clickme = false;
        this.needtofire = false;
}
function Menu(name ,time){
    this.menu = [];
    this.newitem = function(name , time ){
            const NewEntry = new MenuItem(name ,time);
            this.menu.push(NewEntry);
            return this;
    }
};


let LeeMenu = new Menu();
let Slaw = LeeMenu.newitem('Slaw', 5 );
let HotAndSour = LeeMenu.newitem('Hot & Sour', 20 );
let Samosa = LeeMenu.newitem('Samosa',20 );
let Tofu = LeeMenu.newitem('Tofu', 20 );
let GoatCheese = LeeMenu.newitem('Goat-Cheese', 25 );
let Fritters = LeeMenu.newitem('Fritters',20 );
let Letteccups = LeeMenu.newitem('Lettuce-Cups' , 25);
let FallSaled = LeeMenu.newitem('Fall-Salad', 25 );
let Gratin = LeeMenu.newitem('Gratin', 25 );
let Octopus = LeeMenu.newitem('Octopus', 25 );
let CheungFun = LeeMenu.newitem('Chung-Fun' ,20);
let Ravioli = LeeMenu.newitem('Ravioli', 25 );
let Scallop = LeeMenu.newitem('Scallop', 20 );
let TunaTartar = LeeMenu.newitem('Tuna-Tartar', 25 );
let Shrimp = LeeMenu.newitem('Garlic-Shrimp' , 25 );
let Cod = LeeMenu.newitem('Black-Cod' , 15 );
let Springrolls = LeeMenu.newitem('Springrolls' , 10 );
let Charsui = LeeMenu.newitem('Char-Su', 30)
let Lamb = LeeMenu.newitem('Lamb'  , 30);
let Striploin = LeeMenu.newitem('Striploin' , 40);
let BeefTaco = LeeMenu.newitem('Beef-Taco', 15 );
let ThaiSatay = LeeMenu.newitem('Thai-Satay', 25 );
let BraisedBeef = LeeMenu.newitem('Braised-Beef' ,20 );
let PorkRibs = LeeMenu.newitem('Pork-Ribs', 35 );
let Curry = LeeMenu.newitem('Chicken-Curry' , 20 );

let FoodMenu = LeeMenu.menu;

export {MenuItem , FoodMenu};
