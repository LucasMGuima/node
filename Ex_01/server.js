import { createServer } from 'http';
import { parse } from 'url';
import { readFileSync, readFile } from 'fs';

function successPrint(str, res){
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(str);
}

export const server = createServer((req, res) => {
    let url = parse(req.url, true);

    switch (url.pathname){
      case '/teste':
        successPrint('Teste deu ok.', res);
        break;
      case '/nome':
        let usuario = url.query.usuario
        successPrint(`Olá ${usuario}.`, res);
        break;
      case '/arquivosync':
        let data = readFileSync('./arquivo.txt');
        successPrint(data, res);
        break;
      case '/arquivoasync':
        readFile('./arquivo.txt', (error, data) => {
          successPrint(data, res);
        });
        break;
      default:
        successPrint("Caminho não econtrado.", res);
        break;
    }
  });