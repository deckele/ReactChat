var allClients = [];

module.exports = {
    getClients: () => {
        return allClients;
    },
    getClient: (id) => {
        return allClients.find(client => client.id === id);
    },
    addClient: (id, name) => {
        allClients.push({id, name});
    },
    updateClient: (id, newName) => {
        const client = allClients.find(client => client.id === id);
        client.name = newName;
    },
    removeClient: (id) => {
        var i = allClients.findIndex(client => client.id === id);
        if (i !== -1) {
            allClients.splice(i, 1);
        }
    }
};