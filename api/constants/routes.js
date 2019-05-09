const routes = {
    port: process.env.PORT || 4000,
    health: '/health',
    postForm: '/postForm',
    makeDonation: '/makeDonation',
    makeDonationStatus: '/makeDonationStatus',
    fetchDonation: '/fetchDonation'
};

module.exports = routes;
