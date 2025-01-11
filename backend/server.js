const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "repro.anyrt.hu",
    user: "vakond",
    password: "G59tothegrave*",
    database: "nextlevel",
    port: 13333
});

// Alapértelmezett végpont
app.get('/', (req, res) => {
    return res.json("From Backend Side");
});

// Minden felhasználó lekérése
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Email alapján `email_verificated` frissítése
app.get('/verify', (req, res) => {
    const { email } = req.query; // Kivesszük az email paramétert a query-ből
    if (!email) {
        return res.status(400).json({ message: "Email parameter is missing" });
    }

    const sql = "UPDATE users SET email_verificated = 1 WHERE email = ?";
    db.query(sql, [email], (err, result) => {
        if (err) return res.json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Email not found" });
        }
        return res.json({ message: "User verified successfully" });
    });
});

// Szerver indítása
app.listen(8081, () => {
    console.log("listening");
});
