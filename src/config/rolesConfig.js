const admin = "admin";
const user = "user";
const company = "company";
module.exports = {
  city: {
    create: [admin],
    read: [admin, user, company],
    update: [admin],
    delete: [admin],
  },
  airplane: {
    create: [admin, company],
    read: [admin, user, company],
    update: [admin, company],
    delete: [admin, company],
  },
  flight: {
    create: [admin, company],
    read: [admin, user, company],
    update: [admin, company],
    delete: [admin, company],
  },
  airport: {
    create: [admin],
    read: [admin, user, company],
    update: [admin],
    delete: [admin],
  },
};
