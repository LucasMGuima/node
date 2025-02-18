import { createServer } from "http";
import { parse } from 'url';

const usuarios = [];

export const server = createServer((req, res)=>{
    let url = parse(req.url, true);

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    switch(url.pathname){
        default:
            res.end('Caminho não encontrado');
            console.log(url);
            break;    
        case '/addUser':
            fetch('https://randomuser.me/api/').then( response =>{
                return response.json();
            }).then((usuario) => {
                let u = usuario.results[0];
                // Pega os dados importantes
                let novo_usario = {
                    'id': `${usuarios.length + 1}`,
                    'nome': `${u.name.first} ${u.name.last}`,
                    'email': `${u.email}`,
                    'username': `${u.login.username}`,
                    'password': `${u.login.password}`
                }
                usuarios.push(novo_usario);
                res.end("Usuário armazenado no \"banco\".");
            }).catch(error=>{
                throw new Error('Erro ao buscar os dados');
            });
            break;
        case '/users':
            let resp = "";
            usuarios.forEach((usuario) => {
                resp = resp.concat(`id = ${usuario.id}\nnome = ${usuario.nome}\nemail = ${usuario.email}\n================================\n`);
            });
            res.end(resp);
            break;
        case '/user':
            let id = url.query.id;
            id = parseInt(id, 10);
            let usuario = usuarios[id - 1];
            res.end(`id = ${usuario.id}\nnome = ${usuario.nome}\nemail = ${usuario.email}\nusername = ${usuario.username}\nsenha = ${usuario.password}\n`);
            break;
    }
})