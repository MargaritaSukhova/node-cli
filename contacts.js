const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

async function updateContacts(contacts) {
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
}

async function getContactById(contactId) {
	const contacts = await listContacts();
	const result = contacts.find((contact) => contact.id === contactId);
	return result || null;
}

async function removeContact(contactId) {
	const contacts = await listContacts();
	const index = contacts.findIndex((contact) => contact.id === contactId);
	if (index === -1) return null;
	const [deletedContact] = contacts.splice(index, 1);
	updateContacts(contacts);
	return deletedContact;
}

async function addContact(name, email, phone) {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};
	contacts.push(newContact);
	updateContacts(contacts);
	return newContact;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
