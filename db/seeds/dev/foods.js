
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

    return knex('meal_foods').del()
      .then(() => knex('meals').del())
      .then(() => knex('foods').del())
      .then(() => {
        return Promise.all([
        // Inserts seed entries
        knex('foods').insert({id: 1, name: 'Bagel', calories: 220}),
        knex('foods').insert({id: 2, name: 'Turkey', calories: 125}),
        knex('foods').insert({id: 3, name: 'Chicken and Veges', calories: 310}),
        knex('foods').insert({id: 4, name: 'Eggs', calories: 85}),
        ]);
      })
      .then(() => console.log('Seeding complete!'))
      .catch(error => console.log(`Error seeding data: ${error}`));
};
