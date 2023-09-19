import {useEffect, useState} from "react";
import Contact from "Frontend/generated/com/example/application/db/Contact";
import {ContactService} from "Frontend/generated/endpoints";
import {Grid} from "@hilla/react-components/Grid";
import {GridColumn} from "@hilla/react-components/GridColumn";
import ContactModel from "Frontend/generated/com/example/application/db/ContactModel";
import ContactForm from "Frontend/ContactForm";

export default function App() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null | undefined>(null);

    useEffect(() => {
        ContactService.findAllFlux().onNext(contact => {
            setContacts(contacts => [...contacts, contact]);
        })
    }, []);

    async function saveContact(contact: Contact) {
        const saved = await ContactService.save(contact);
        setContacts(contacts.map(c => c.id === saved.id ? saved : c));
        setSelectedContact(saved);
    }

    return (
        <div className="flex flex-col gap-m p-m">
            <Grid
                items={contacts}
                onActiveItemChanged={e => setSelectedContact(e.detail.value)}
                selectedItems={[selectedContact]}
            >
                <GridColumn path="firstName"/>
                <GridColumn path="lastName"/>
                <GridColumn path="email"/>
                <GridColumn path="phoneNumber"/>
            </Grid>
            {selectedContact &&
                <ContactForm contact={selectedContact} onSubmit={saveContact}/>}
        </div>
    );
}
