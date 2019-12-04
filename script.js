const fs = require('fs');
const parseIngredients = require('./parseIngredients');

// Get names of all files with recipes
const files = fs.readdirSync('../data/meals');

console.log(files);

// Get the content from each file and parse it to js object
files.forEach(filename => {
    const recipes = JSON.parse(fs.readFileSync(`../data/meals/${filename}`));

    recipes.recipes.forEach((recipe, index) => {
        // Get the id of the recipe
        const recipeId = recipe.recipe_id;

        // Open a file with ingredients (the name of the file is the id + .json)
        const recipeDetails = JSON.parse(fs.readFileSync(`../data/recipes/${recipeId}.json`));

        const ingredients = recipeDetails.recipe.ingredients;

        try {
            parseIngredients(ingredients);
        } catch (e) {
            // Remove recipe that causes error
            recipes.recipes.splice(index, 1);
            recipes.count = recipes.count - 1;

            console.log(`Removed ${recipeId}`);
        }
    });

    fs.writeFileSync(`../data/meals/${filename}`, JSON.stringify(recipes));
});