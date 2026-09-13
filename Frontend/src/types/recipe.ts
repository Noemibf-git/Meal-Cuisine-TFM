export type Recipe = {
  id: number
  title: string
  description: string | null
  imagen: string | null
  ingredients?: RecipeIngredient[]
  steps?: RecipeStep[]
  user_id: number

}

export type RecipeIngredient = {
  id: number
  name: string
  pivot: {
    quantity: number
    unit: string | null
  }
}

export type RecipeStep = {
  id: number
  step_number: number
  description: string
}