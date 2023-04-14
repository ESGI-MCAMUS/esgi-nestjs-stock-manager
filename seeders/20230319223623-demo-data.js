('use strict');
const { faker } = require('@faker-js/faker/locale/fr');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    const suppliers = [];
    const products = [];
    const orders = [];

    const admin = {
      firstname: 'Admin',
      lastname: 'Admin',
      email: 'admin@example.com',
      password: '$2b$10$dQa80zlUa8giW/Ufk9H3Ee.Mu6LbtP5oSqA2IVYXhGjijbc.fzMz6',
      role: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(admin);

    const supplier = {
      firstname: 'Supplier',
      lastname: 'Supplier',
      email: 'supplier@example.com',
      password: '$2b$10$wWF6oCM0DAfRdj9zj8ZJwugVPNnKS/qv7UWJhYu.KUhWZnTMzefDO',
      role: 'SUPPLIER',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(supplier);

    const user = {
      firstname: 'User',
      lastname: 'User',
      email: 'user@example.com',
      password: '$2b$10$dQa80zlUa8giW/Ufk9H3Ee.Mu6LbtP5oSqA2IVYXhGjijbc.fzMz6',
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(user);

    for (let i = 0; i < 10; i++) {
      users.push({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'a_hased_password',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    for (let i = 0; i < 10; i++) {
      const randomUser = randomIntFromInterval(1, 10);
      suppliers.push({
        name: faker.company.name(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.address.streetAddress(),
        userId: randomUser,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    for (let i = 0; i < 20; i++) {
      const randomSupplier = randomIntFromInterval(1, 10);
      products.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        supplierId: randomSupplier,
        ean13: randomString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    for (let i = 0; i < 10; i++) {
      const randomUser = randomIntFromInterval(1, 10);
      // Randomly select multiple products
      const productIds = [];
      for (let j = 0; j < randomIntFromInterval(1, 5); j++) {
        productIds.push(randomIntFromInterval(1, 100));
      }
      orders.push({
        note: faker.lorem.sentence(),
        orderedById: randomUser,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Insert into Users table
    await queryInterface.bulkInsert('Users', users, {});
    // Insert into Suppliers table
    await queryInterface.bulkInsert('Suppliers', suppliers, {});
    // Insert into Products table
    await queryInterface.bulkInsert('Products', products, {});
    // Insert into Orders table
    await queryInterface.bulkInsert('Orders', orders, {});
  },

  async down(queryInterface, Sequelize) {
    // Truncate all tables
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.sequelize.query('TRUNCATE TABLE Users');
    await queryInterface.sequelize.query('TRUNCATE TABLE Suppliers');
    await queryInterface.sequelize.query('TRUNCATE TABLE Products');
    await queryInterface.sequelize.query('TRUNCATE TABLE Orders');
    await queryInterface.sequelize.query('TRUNCATE TABLE OrdersProducts');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  },
};

// Function that pick random number between min and max
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomString() {
  const length = 13;
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
