import { createServer } from "http";
import { parse } from 'url';

const usuarios = [];

export const server = createServer((req, res)=>{
    let url = parse(req.url, true);

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    switch(url.pathname){
        default:
            res.end('Caminho não encontrado');
            break;    
        case '/addUser':
            fetch('https://randomuser.me/api/').then((dado)=>{
                return dado.json();
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
            });
            break;
        case '/users':
            res.end(JSON.stringify(usuarios));
            break;
    }
})