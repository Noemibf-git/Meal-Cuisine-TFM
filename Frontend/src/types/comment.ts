export type Comment = {
  id: number
  content: string
  user_id: number
  recipe_id: number
  user?: {
    id: number
    username: string
  }
}