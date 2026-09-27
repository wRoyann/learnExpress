import express from "express";
import { addContact, findContact, loadContact, updateContact } from "./utils/contact.mjs";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/contacts", (req, res) => {
    const load = loadContact();
    res.json(load);
    console.log(load);
});

app.post("/api/contacts/add", (req, res) => {
    const { name, email, nohp } = req.body;

    if (!name?.trim() || !email?.trim() || !nohp) {
        return res.status(400).json({
            message: "Name, email, dan nohp wajib diisi",
        });
    }

    const newContact = addContact(req.body);

    res.status(201).json({
        message: "Contact berhasil di tambahkan!",
        data: newContact,
    });
});

app.get("/api/contacts/detail/:name", (req, res) => {
    const contact = findContact(req.params.name);

    if (!contact) {
        return res.status(404).json({
            message: "User tidak ditemukan",
        });
    }
    res.json(contact);
    console.log(contact);
});

app.put("/api/contacts/detail/update/:name", (req, res) => {
    const contact = findContact(req.params.name);
    const { nohp, email } = req.body;

    if (!contact) {
        return res.status(404).json({
            message: "User tidak ditemukan",
        });
    }

    const update = updateContact(req.params.name, { nohp, email });

    res.json({
        message: "Data berhasil di update",
        data: update,
    });
});

app.use((req, res, next) => {
    res.status(404);
    res.send("Error 404!");
    next();
});

app.listen(PORT, () => {
    console.log(`App listeng in http://localhost:${PORT}`);
});
