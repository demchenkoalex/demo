export enum FetchingState {
  Loading,
  LoadingMore,
  None,
  Refreshing
}

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  per_page: number
  total: number
  total_pages: number
}

export interface User {
  avatar: string
  first_name: string
  id: number
  last_name: string
}
