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

// 1.4 Spreadoperator – explanation and usage examples.

// transforma un array intr-o serie de argumente

let spread = [1,2,3,4,5];
// console.log(Math.max(spread)) // eroare
console.log(Math.max(...spread));

// folosit si la concatenare

let a = [1, 2, 3];
let b = [4, 5];
a = [...a, ...b];
console.log(spread.length === a.length && spread.every((val, i) => val === a[i]));

// exemplu personal (din licenta)
            // if (!analysis.needsData) {
            //     return {
            //         message: analysis.response,
            //         conversationHistory: [
            //             ...conversationHistory,
            //             { role: 'user', content: userMessage },
            //             { role: 'assistant', content: analysis.response },
            //         ],
            //     };
            // }
// bucata de cod din logica unui chatbot - daca chatbotul nu are nevoie de date din backend construim un istoric al conversatiei
// ca sa aibe tot contextul necesar pentru viitoare prompt-uri

// 1.5 Objects – how to iterate over an object and how to create a deep copy.

// avem obiecte de tip interface sau obiecte de tip type cu diferente notate anterior
type Car = {
    brand: string;
    model: string;
    specs: {
        year: number;
    }
}

const masina1: Car = { brand: "Audi", model: "A4", specs: { year: 2009 } };
const masina2: Car = { brand: "Toyota", model: "Corolla", specs: { year: 2013 } };
const masina3: Car = { brand: "Ford", model: "Fiesta", specs: { year: 2002 } };

const masini = [masina1, masina2, masina3];

// tipuri de iterari
console.log();

// 1. for..in
for(const key in masina1) {
    console.log(masina1[key as keyof Car]);
}

// 2. Object.keys
Object.keys(masina2).forEach(key => {
    console.log(masina2[key as keyof Car]);
});

// 3. Object.values
Object.values(masina3).forEach(value => {
    console.log(value);
}); 

// 4. Object.entries
Object.entries(masina1).forEach(([key, value]) => {
    console.log(key, value);
});

console.log();

// shallow copy - copiaza doar referinta daca avem obiecte imbricate
const shallowCopy = { ...masina1 };
shallowCopy.specs.year = 2020;
shallowCopy.brand = "BMW";
console.log(masina1.brand); // nu afecteaza masina1 pentru ca brandul nu este un obiect imbricat
console.log(masina1.specs.year); // afecteaza si masina1 pentru ca specs este un obiect imbricat

console.log();

// deep copy
const deepCopy = JSON.parse(JSON.stringify(masina1));
deepCopy.specs.year = 2021;
console.log(masina1.specs.year); // nu afecteaza masina1

console.log();

// 1.6 Arrays – accessor, iteration, and mutator methods

const numbers: number[] = [1, 2, 3, 4, 5];

// accessor methods - nu modifica array ul original

console.log(numbers.slice(1, 4));
console.log(numbers.concat([6, 10, 11]));
console.log(numbers.join("-"));
console.log(numbers.includes(1));

console.log();

// iteration methods
// numbers.forEach(num => console.log(num));
console.log(numbers.map(x => x * 2));
console.log(numbers.filter(x => x % 2 == 0));
console.log(numbers.reduce((acc, x) => acc + x, 0));
console.log(numbers.find(n => n > 3));
console.log(numbers.some(n => n > 4));
console.log(numbers.every(n => n > 0));

console.log();

// mutator methods - modifica array ul original
numbers.push(6);
console.log(numbers);

numbers.pop(); // sterge si returneaza ultimul element
console.log(numbers);

numbers.shift(); // sterge si returneaza primul element
console.log(numbers);

numbers.unshift(0); // adauga element la inceputul array ului
console.log(numbers);

numbers.splice(2, 1); // sterge elementul de la index 2
console.log(numbers);

numbers.sort((a, b) => b - a);
console.log(numbers);

numbers.reverse();
console.log(numbers);

// 1.7Promises and callbacks
console.log();

// a promise has 4 (care sunt de fapt 3) states: fulfilled, rejected, pending, settled
// fullfilled - action succeeded
// rejected - action failed
// pending - action is still ongoing
// settled - action is either fulfilled or rejected

type User = {
    id: number;
    name: string;
}

function fetchUser(userId: number): Promise<User> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 1) {
                resolve({ id: 1, name: "John Doe" });
            } else {
                reject(new Error("User not found"));
            }
        }, 1000);
    });
}

fetchUser(1)
    .then(user => {
        console.log("User fetched:", user);
        return user.name;
    })
    .then(userName => {
        console.log("User name:", userName);
    })
    .catch(error => {
        console.error("Error fetching user:", error);
    })
    .finally(() => {
        console.log("Operation completed");
    });

// 1.8 async await

const httpCodes = [102, 200, 201, 202, 400, 401, 403, 404, 500];
const LINK_PISICI = "https://http.cat/";

// for each la async await nu asteapta, in loc se foloseste for..of

async function fetchCatImage(code: number) {
    try {
        const response = await fetch(`${LINK_PISICI}${code}`);
        console.log("Pisica:", response.ok);
    } catch (error) {
        console.error("Eroare la fetch:", error);
    }
}
fetchCatImage(200);

// concurrency

async function fetchAllCatImages() {
    try {
        const responses = await Promise.all(httpCodes.map(code => fetch(`${LINK_PISICI}${code}`)));
        console.log("URL uri apelate:", responses.map(r => r.url));
    } catch (error) {
        console.error("Eroare la fetch:", error);
    }
}
fetchAllCatImages();

// 1.9 Closures