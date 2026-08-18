// primitives data types
let x : number
let y : string
let z : boolean
let a : Date
let b : string[]
let c : any

//enum
enum ContactStatus{
    Active = "active",
    Inactive = "inactive",
    New = "new"
}
//interfaces
interface Contact extends Address {
    id : number;
    name: ContractName;
    birthDate?: Date;
    status : ContactStatus;

}

interface Address {
    line1: string;
    line2: string;
    province: string;
    region: string;
    postalCode: string;
}

let primaryContact : Contact = {
    birthDate: new Date("01-01-1980"),
    id: 12345,
    name: "Jamie Johnson",
    line1: "681 cubao",
    line2: "simulong",
    province: "metro manila",
    region: "ncs",
    postalCode: "22309",
    status : ContactStatus.Active
}

//Type Aliases
type ContractName = string

//Typing Functions
interface Contact2{
    id: number;
    name: string;
    clone?(name: string) : Contact2
}

function clone(source: Contact2): Contact2 {
    return Object.assign({}, source);
}

const aa: Contact2 = { id: 123, name: "Homer Simpson"};
const bb = clone(aa)


//Generics - Defining a metatype using generics
interface Contact3{
    id: number;
    name: string;
   
}

interface UserContact<TexternalId> {
    id: number
    name: string
    username: string
    externalId: TexternalId
    laodExternalId(): Task<TexternalId>
}
function clone3<T1, T2 extends T1>(source: T1): T2 {
    return Object.assign({}, source);
}

const aa3: Contact3 = { id: 123, name: "Homer Simpson"};
const bb3 = clone3<Contact3, UserContact>(aa3)

const dateRange = { startDate : Date.now(), endDate: Date.now() }
const dateRangeCopy = clone3(dateRange)

// Combining Multiple types wit UNION Types
type ContactBirthDate = Date | number | string //union type

type AddressableContact = Contact4 & Address //creating new interface by combining multiple types

type ContactStatus4 = "active" | "inactive" | "new" // alternative to enum values by directly defining the possible values of the type

interface Contact4 {
    id : number;
    name: ContractName;
    birthDate?: ContactBirthDate;
    status : ContactStatus4;

}

function getBirthDate(contact: Contact4){
    if(typeof contact.birthDate === "number"){
        return new Date(contact.birthDate);
    }else if (typeof contact.birthDate === "string"){
        return Date.parse(contact.birthDate);
    }else{
        return contact.birthDate;
    }
}

let primaryContact4 : Contact4 = {
    id: 3434,
    name: "Jamie Johnson",
    status : "active"
}

// keyof operator
type ContractName5 = string
type ContactStatus5 = "active" | "inactive" | "new"
type ContactBirthDate5 = Date | number | string //union type

interface Contact5 {
    id : number;
    name: ContractName5;
    birthDate?: ContactBirthDate5;
    status : ContactStatus5;
    email ?: string;

}

let primaryContact5 : Contact5 = {
    id: 3434,
    name: "Jamie Johnson",
    status : "active"
}

type ContactFields = keyof Contact5 // "id" | "name" | "birthDate" | "status" | "email"

function getValue<T>(source : T, propertyName : keyof T){
    return source[propertyName]
}

const value = getValue({min: 1, max: 200 , name : "example"},"name"); // "example"

//typeof operator

const xx = "string"
const yy = true;
console.log(typeof xx); // "string"
console.log(typeof yy); // "boolean"

type ContractName6 = string
type ContactStatus6 = "active" | "inactive" | "new"
type ContactBirthDate6 = Date | number | string //union type

interface Contact6 {
    id : number;
    name: ContractName6;
    birthDate?: ContactBirthDate6;
    status : ContactStatus6;  
}

function toContact(nameOrContact : string | Contact6): Contact6{
    if(typeof nameOrContact === "object"){
        return{
            id: nameOrContact.id,
            name: nameOrContact.name,
            status: nameOrContact.status
        }
    }
    else{
        return {
            id: 0,
            name: nameOrContact,
            status: "active"
        }
    }
}

const myType6 = { min: 1, max:200 }

function save(source: typeof myType6){

}
console.log(typeof myType6) // "object"

//Indexed access types
type ContactStatus7 = "active" | "inactive" | "new" //alternative to enum values by directly defining the possible values of the type

interface Address7{
    street: string;
    province: string;
    postalCode: string;
}

interface Contact7{
    id : number;
    name: string;
    status : ContactStatus7;
    address: Address7;
}

type Awesome7 = Contact7["address"]["postalCode"]; // = string      indexed access type

interface ContactEvent7 {
    contactId: Contact7["id"];
}

interface ContactDeletedEvents7 extends ContactEvent7{

}

interface ContactStatusChangedEvent7 extends ContactEvent7{
    oldStatus: Contact7["status"];
    newStatus: Contact7["status"];
}

interface ContactEvents7{
    deleted: ContactDeletedEvents7;
    statusChanged: ContactStatusChangedEvent7;
}

function getValue7<T, U extends keyof T>(source: T, propertyName: U){
    return source[propertyName];
}

function handleEvent<T extends keyof ContactEvents7>(eventName: T, handler: (evt: ContactEvents7[T]) => void){ //generic function with constraints that the type T must be a key of ContactEvents7
    if(eventName === "statusChanged"){
        handler({contactId: 1, oldStatus : "active", newStatus: "inactive"})
    }
}

handleEvent("statusChanged", (evt) => evt)

// defining dynamic but limited types with records

let x8 : Record<string, string | number | boolean | Function> = { name : "Wrune Bayne" }; //Record type with string keys and values of type string, number, boolean or Function
x8.number = 1234
x8.active = true
x8.log = () => console.log("Hello World")

let x9 : string | number  =  "hello world";

type ContactStatus8 = "active" | "inactive" | "new" //alternative to enum values by directly defining the possible values of the type

interface Address8{
    street: string;
    province: string;
    postalCode: string;
}

interface Contact8{
    id : number;
    name: string;
    status : ContactStatus8;
    address: Address8;
}

interface Query {
    sort ?: 'asc' | 'desc';
    matches(val) : boolean;
}

function searchContacts(contacts: Contact8[], query: Record<keyof Contact8, Query>){
    return contacts.filter(contact => {
        for (const property of Object.keys(contact) as (keyof Contact8)[]){
            //get the query object for this property
            const propertyQuery = query[property];
            //check to see if it matches
            if(propertyQuery && propertyQuery.matches(contact[property])){
                return true;
            }
        }
        return false;
    })
}

const filteredContacts = search ContactStatus(
    [],
    {
    id: {matches: (id) => id === 123},
    name: {matches : (name) => name === "Carol Waever"},
    }
);


//resource management with the "using" statement
class TempData {
    private filePath: string;

    constructor(id?: string){
        this.filePath = `${id || new Date().toISOString()}.txt`;
    }

    write(data: string){
        fs.writeFileSync(this.filePath, data);
    }
    clear(){
        fs.unlinkSync(this.filePath);
    }
    [Symbol.dispose](){
        this.clear();
    }
}

function writeTempData(){
    using temp = new TempData(); //using statement will automatically call the dispose method when the block is exited
    temp.write("Hello World");
   
}

writeTempData()