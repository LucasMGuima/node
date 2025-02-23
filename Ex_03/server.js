import { createServer } from 'http';
import { EventEmitter } from 'events';

const emissor = new EventEmitter();

const states = {
    0:"aguardando",
    1:"trabalhando",
    2:"finalizado"
}

// Lista onde armazenar as tarefas
const tarefas = [
    { id: 1, descricao: 'Tarefa 1', status: states[1] },
    { id: 2, descricao: 'Tarefa 2', status: states[0] },
    { id: 3, descricao: 'Tarefa 3', status: states[0] }
];

// Listeners
emissor.on('finalizar_tarefa', (tarefa, rand_num) => {
    tarefa.status = states[2];
    console.log(`Finalizado: Tarefa ${tarefa.id} concluída. (número sortedao: ${rand_num})`)
});
emissor.on('listar_tarefas_abertas', (tarefas) => {
    const tarefas_aguardando = tarefas.filter(t => t.status === states[0]);
    if(tarefas_aguardando.length <= 0){
        console.log(`Aguardando: Não há tarefas aguardando`);
    }else{
        const ids = tarefas_aguardando.map(t => t.id).join(', ');
        console.log(`Aguardando: Tarefas ${ids} aguardando.`);
    }
});
emissor.on('nova_tarefa', (tarefas) => {
    const primeiro_aguardando = tarefas.find(t => t.status === states[0])
    if(primeiro_aguardando != undefined){
        primeiro_aguardando.status = states[1];
        console.log(`Trabalhando: Tarefa ${primeiro_aguardando.id} iniciada.`);
    }
});
emissor.on('processando_tarefa', (tarefa, rand_num) => {
    console.log(`Trabalhando: Tarefa ${tarefa.id} está em andamento. (número sorteado: ${rand_num})`)
});

function processador_tarefas(){
    const tarefa = tarefas.find(t => t.status === states[1]);
    if(tarefa == undefined){
        console.log("Não há tarefas em processamento.");
    }else{
        const rand_num = Math.random().toFixed(2);
        if(rand_num > 0.7){
            emissor.emit('finalizar_tarefa', tarefa, rand_num);
            emissor.emit('nova_tarefa', tarefas);
            emissor.emit('listar_tarefas_abertas', tarefas);
        }else{
            emissor.emit('processando_tarefa', tarefa, rand_num);
            emissor.emit('listar_tarefas_abertas', tarefas);
        }
        console.log();
    }
}

export const server = createServer((req, res) => {
    setInterval(processador_tarefas, 5000);
})