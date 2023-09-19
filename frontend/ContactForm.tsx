import Contact from "Frontend/generated/com/example/application/db/Contact";
import {useForm} from "@hilla/react-form";
import ContactModel from "Frontend/generated/com/example/application/db/ContactModel";
import {TextField} from "@hilla/react-components/TextField";
import {Button} from "@hilla/react-components/Button";
import {useEffect} from "react";

interface ContactFormProps {
    contact: Contact;
    onSubmit: (contact: Contact) => Promise<void>;
}

export default function ContactForm({contact, onSubmit}: ContactFormProps) {

    const {model, field, submit, read} = useForm(ContactModel, {onSubmit});

    useEffect(() => {
        read(contact);
    }, [contact]);

    return (
        <div className="grid grid-cols-2 gap-s">
            <TextField label="First name" {...field(model.firstName)}/>
            <TextField label="Last name" {...field(model.lastName)}/>
            <TextField label="Email" {...field(model.email)}/>
            <TextField label="Phone number" {...field(model.phoneNumber)}/>
            <Button onClick={submit} theme="primary">Save</Button>
        </div>
    );
};