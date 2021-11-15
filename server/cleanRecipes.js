function readRecipes (recipes) {
  return recipes.map(({ recipe, _links }) => {
    return {
      dietLabels: recipe.dietLabels,
      image: recipe.image,
      label: recipe.label,
      totalTime: recipe.totalTime,
      recipeId: getRecipeId(_links.self.href),
      dishType: recipe.dishType
    }
  })
}

function getRecipeId (href) {
  const splitBySlash = href.split('/')
  const index = splitBySlash.length - 1
  const splitByQuery = splitBySlash[index].split('?')
  const recipeId = splitByQuery[0]
  return recipeId
}

module.exports = {
  readRecipes
}
