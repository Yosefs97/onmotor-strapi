module.exports = {
    routes: [
        {
            method: 'PUT',
            path: '/populars/:id/increment-view',
            handler: 'popular.incrementView',
        },
    ],
};
