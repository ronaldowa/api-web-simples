require("dotenv").config();

const express = require("express");

const app  = express();

const db = require("./db");

app.use(express.json()); 

// Delete
app.delete("/clientes/:id", async (request, response) =>{
    const id = parseInt(request.params.id);
    await db.deleteCustomer(id);
    response.json(204)
})

// Atualizar
app.patch("/clientes/:id", async (request, response) =>{
    const id = parseInt(request.params.id);
    const customer = request.body;
    await db.updateCustomer(id, customer);
    response.sendStatus(200);
})

// Cadastrar
app.post("/clientes", async  (request, response) =>{
    const customer = request.body;
    await db.insertCustomer(customer);
    response.sendStatus(201)

})

app.get("/clientes/:id", async  (request, response) =>{
    const id = parseInt(request.params.id);
    const results = await db.selectCustomer(id);
    response.json(results)
})



app.get('/clientes', async (request, response) => {
    const results = await db.selectCustomers();
    response.json(results);
})


app.get("/", (request, response, netx) =>{
    response.json({
        message:"It's alive!"
    })
})

app.listen(process.env.PORT, () =>{
    console.log("App now is running!");
})

