import { DocumentNode } from "graphql/language"
import { print as printGraphQL } from "graphql/language/printer"

export default function fetchGraphQL<TData, TVariables>(
  query: DocumentNode,
  variables?: TVariables,
  options?: RequestInit
): Promise<TData> {
  return fetch(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:8000/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: printGraphQL(query),
        variables,
      }),
      cache: "default",
      ...options,
    }
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.errors) {
        throw new Error(
          res.errors.map((error: any) => error.message).join("\n")
        )
      }
      return res.data as TData
    })
}

export function fetchAPI(path: string, options?: RequestInit) {
  return fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + path ||
      "http://localhost:8000" + path,
    {
      method: "POST",
      cache: "default",
      ...options,
    }
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.errors) {
        throw new Error(
          res.errors.map((error: any) => error.message).join("\n")
        )
      }
      return res
    })
}
