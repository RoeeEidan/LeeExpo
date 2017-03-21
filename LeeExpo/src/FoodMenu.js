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
LeeMenu.newitem('Slaw', 15 );
LeeMenu.newitem('Hot & Sour', 22 );
LeeMenu.newitem('Samosa',25 );
LeeMenu.newitem('Tofu', 27 );
LeeMenu.newitem('Goat-Cheese', 31 );
LeeMenu.newitem('Fritters',33 );
LeeMenu.newitem('Lettuce-Cups' , 34);
LeeMenu.newitem('Fall-Salad', 40 );
LeeMenu.newitem('Gratin', 47 );
LeeMenu.newitem('Octopus', 53 );
LeeMenu.newitem('Cheung-Fun' ,59);
LeeMenu.newitem('Ravioli', 63 );
LeeMenu.newitem('Scallop', 68 );
LeeMenu.newitem('Tuna-Tartar', 74 );
LeeMenu.newitem('Garlic-Shrimp' , 80 );
LeeMenu.newitem('Black-Cod' , 83 );
LeeMenu.newitem('Springrolls' , 88 );
LeeMenu.newitem('Char-Su', 100)
LeeMenu.newitem('Lamb'  , 110);
LeeMenu.newitem('Striploin' , 140);
LeeMenu.newitem('Beef-Taco', 70 );
LeeMenu.newitem('Thai-Satay', 100 );
LeeMenu.newitem('Braised-Beef' ,117 );
LeeMenu.newitem('Pork-Ribs', 120 );
LeeMenu.newitem('Chicken-Curry' , 125 );

let FoodMenu = LeeMenu.menu;

export {MenuItem , FoodMenu};

