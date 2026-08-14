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