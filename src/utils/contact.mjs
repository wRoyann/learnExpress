import fs from "fs";

const dirPatch = "./src/data";
const dataParth = "./src/data/contacts.json";

if (!fs.existsSync(dirPatch)) {
    fs.mkdirSync(dirPatch);
}

if (!fs.existsSync(dataParth)) {
    fs.writeFileSync(dataParth, "[]", "utf-8");
}

export const loadContact = () => {
    const file = fs.readFileSync(dataParth, "utf-8");
    const contacts = JSON.parse(file);
    return contacts;
};

const saveContact = (contact) => {
    fs.writeFileSync(dataParth, JSON.stringify(contact, null, 2));
};

export const findContact = (name) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());

    return contact;
};

export const addContact = (contact) => {
    const contacts = loadContact();

    contacts.push(contact);
    saveContact(contacts);

    return contact;
};

export const updateContact = (name, updatedContact) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());

    if (!contact) {
        return null;
    }

    contact.nohp = updatedContact.nohp || contact.nohp;
    contact.email = updatedContact.email || contact.email;

    saveContact(contacts);

    return contact;
};
