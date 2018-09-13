exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

    return knex('meal_foods').del()
      .then(() => knex('foods').del())
      .then(() => knex('meals').del())
      .then(() => {
        return Promise.all([
          knex('foods').insert({name:"Bagel", calories: 220, id:1}),
          knex('foods').insert({name:"Turkey Sandwich", calories: 310, id:2}),
          knex('foods').insert({name:"Pickle", calories: 0, id:3})
          ]);
      })
      .then(() => {
        return Promise.all([
        // Inserts seed entries
        knex('meals').insert({id: 1, name: 'Breakfast'}),
        knex('meals').insert({id: 2, name: 'Snack'}),
        knex('meals').insert({id: 3, name: 'Lunch'}),
        knex('meals').insert({id: 4, name: 'Dinner'}),
        ]);
      })
      .then(() => {
        return Promise.all([
          knex('meal_foods').insert({meals_id:1, food_id:1}),
          knex('meal_foods').insert({meals_id:2, food_id:2}),
          knex('meal_foods').insert({meals_id:3, food_id:3}),
          knex('meal_foods').insert({meals_id:4, food_id:3}),
          knex('meal_foods').insert({meals_id:3, food_id:2}),
          knex('meal_foods').insert({meals_id:2, food_id:1})
        ]);
      })
      .then(() => console.log('Seeding complete!'))
      .catch(error => console.log(`Error seeding data: ${error}`));
};
