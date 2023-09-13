// DB
const mysql = require("mysql2/promise");

const client = mysql.createPool(process.env.CONNECTION_STRING);

async function selectCustomers() {
    const results = await client.query("SELECT * FROM clientes;");
    return results[0];
}

async function selectCustomer(id){
    const results = await client.query("SELECT * FROM clientes WHERE id=?;", [id]);
    return results[0];
}

async function insertCustomer(customer){
    const values = [customer.nome, customer.idade, customer.uf];
    await client.query("INSERT INTO clientes(nome,idade,uf) VALUES (?,?,?);", values);
}


async function updateCustomer(id, customer){
    const values = [customer.nome, customer.idade, customer.uf, id];
    await client.query("UPDATE clientes SET nome=?,idade=?,uf=? WHERE id=?;", values);
}

async function deleteCustomer(id){
    const values = [id];
    await client.query("DELETE FROM clientes  WHERE id=?;", values);
}

module.exports = {
    selectCustomers,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer
}