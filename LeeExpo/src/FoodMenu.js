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
let Slaw = LeeMenu.newitem('Slaw', 15 );
let HotAndSour = LeeMenu.newitem('Hot & Sour', 22 );
let Samosa = LeeMenu.newitem('Samosa',25 );
let Tofu = LeeMenu.newitem('Tofu', 27 );
let GoatCheese = LeeMenu.newitem('Goat-Cheese', 31 );
let Fritters = LeeMenu.newitem('Fritters',33 );
let Letteccups = LeeMenu.newitem('Lettuce-Cups' , 34);
let FallSaled = LeeMenu.newitem('Fall-Salad', 40 );
let Gratin = LeeMenu.newitem('Gratin', 47 );
let Octopus = LeeMenu.newitem('Octopus', 53 );
let CheungFun = LeeMenu.newitem('Chung-Fun' ,59);
let Ravioli = LeeMenu.newitem('Ravioli', 63 );
let Scallop = LeeMenu.newitem('Scallop', 68 );
let TunaTartar = LeeMenu.newitem('Tuna-Tartar', 74 );
let Shrimp = LeeMenu.newitem('Garlic-Shrimp' , 80 );
let Cod = LeeMenu.newitem('Black-Cod' , 83 );
let Springrolls = LeeMenu.newitem('Springrolls' , 88 );
let Charsui = LeeMenu.newitem('Char-Su', 100)
let Lamb = LeeMenu.newitem('Lamb'  , 110);
let Striploin = LeeMenu.newitem('Striploin' , 140);
let BeefTaco = LeeMenu.newitem('Beef-Taco', 70 );
let ThaiSatay = LeeMenu.newitem('Thai-Satay', 100 );
let BraisedBeef = LeeMenu.newitem('Braised-Beef' ,117 );
let PorkRibs = LeeMenu.newitem('Pork-Ribs', 120 );
let Curry = LeeMenu.newitem('Chicken-Curry' , 125 );

let FoodMenu = LeeMenu.menu;

export {MenuItem , FoodMenu};

