import { useState } from "react"
import { DocumentNode } from "graphql/language"
import { print as printGraphQL } from "graphql/language/printer"

export default function fetchGraphQL<TData, TVariables>(
  query: DocumentNode,
  variables?: TVariables,
  options?: RequestInit
): Promise<TData> {
  return fetch(
    process.env.GRAPHQL_ENDPOINT || "http://localhost:8000/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: printGraphQL(query),
        variables,
      }),
      cache: "no-cache",
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
