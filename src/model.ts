
interface Geopoint {
    Latitude : number;
    Longitude: number;
}

export interface Entry {
    id: string;
    Address: string;
    Name: string;
    Order_id: string;
    Price:BigInteger;
    Contact_no : BigInteger;
    Location: {Latitude : string;
        Longitude: string;};
    Latitude:string;
    Longitude:string;
    Reason: string;
    Status: string;
}

export function toEntry(doc: firebase.firestore.DocumentSnapshot): Entry {
    return {id: doc.id, ...doc.data() as Entry };
}
