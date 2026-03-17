// 1.1 ES6 Methods

// Arrow functions

function add(a: number, b: number): number {
    return a + b;
}

let addArrow = (a: number, b: number) => a + b;
let addArrow2 = (a: number, b: number): number => { return a + b }; // nu trebuie neaparat specificat return type la o functie simpla arrow

console.log(addArrow2(2, 3));

// Object Destructuring

const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    eyeColor: 'blue'
};

// extragere primele X elemente din structura
const { firstName, lastName } = person;
console.log(firstName);

// Array Destructuring

const fruits = ["Banana", "Orange", "Apple"];
// extragere primele X elemente din arrat
let [f1, f2] = fruits;
console.log(f1, f2);

// For/of loop

let allFruits: string = "";
for (const f of fruits) {
    allFruits += f + " ";
}
console.log(allFruits);

// Maps/Sets

const map = new Map();
map.set("a", 1);
map.set("b", 2);
console.log(map.get("a"));

const set = new Set([1,2,2,2,2,3]);
console.log(set);

// Classes

class Person {
    private readonly name: string;

    public constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }
}

const personObj = new Person("Andrei");
console.log(personObj.getName());

interface Shape {
    getArea : () => number;
}

class Rectangle implements Shape {
    // protected readonly = pot fi accesate de clasa curenta si cele care o mostenesc dar nu pot fi schimbate
    public constructor(protected readonly width: number, protected readonly height: number) {}

    public getArea(): number {
        return this.width * this.height;
    }
}

let rectangle: Rectangle = new Rectangle(5, 10);
console.log(rectangle.getArea());

class Square extends Rectangle {
    public constructor(width: number) {
        super(width, width);
    }
}

let square: Square = new Square(10);
console.log(square.getArea());

// 1.2 Difference between var let const

function exVar() { // var este utilizabila oriunde in blocul functiei odata ce a fost initializata
    var name = "Azorel";
    console.log(name);
    if (true) {
        var name2 = "Cutu";
        console.log(name2)
    }
    console.log(name2);
}
exVar();

console.log();

function exLetConst() { // let si const sunt block scoped, const nu poate fi reatribuit
    let name = "Azorel";
    const name3 = "Rex";

    console.log(name);
    console.log(name3);

    if (true) {
        let name2 = "Cutu";
        const name4 = "Max";

        console.log(name2);
        console.log(name4);
    }

    // console.log(name2); // eroare
    // console.log(name4); // eroare
}
exLetConst();

// 1.3 TypeScriptTypes and Interfaces

interface UserInterface {
    name: string;
    age: number;
}

type UserType = {
    name: string;
    age: number;
}

interface UserInterface { // interfetele pot fi extinse dupa initializare, la type trebuie totul definit din start
    email: string;
}

// Inheritence: ambele, dar la interfata se face clasic cu extends, la type se face cu &

interface AdminInterface extends UserInterface {
    role: string;
}

type AdminType = UserType & {
    role: string;
}

// Type suporta tipuri multiple
type ID_Type = string | number;