/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

// import { BenchmarkDataContainer } from "../redux/emissionfactor/types"
// import { CodeItems } from "../redux/"

// /* eslint-disable security/detect-unsafe-regex */
export function camelToKebab(str: string) {
  return str
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace("-", "")
}

export function hasClass(el: any, className: any) {
  if (el.classList) {
    return el.classList.contains(className)
  }
  return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`))
}

export function addClass(el: any, className: any) {
  if (el.classList) el.classList.add(className)
  else if (!hasClass(el, className)) {
    el.className = `${el.className} ${className}`
  }
}

export function decimalFormatter(value: number, precision: number): string {
  if (!value) value = 0
  if (!precision) precision = 2
  return value.toFixed(precision)
}

export const CSVtoArray = (text: any) => {
  const reValid =
    /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/
  const reValue =
    /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g

  // Return empty array if input string is not well formed CSV string.
  if (!reValid.test(text)) return []

  const a = [] // Initialize array to receive values.
  text.replace(
    reValue, // "<String with comma value in it>" the string using replace with callback.
    (m0: any, m1?: string, m2?: string, m3?: any) => {
      // Remove backslash from \' in single quoted values.
      if (m1 || m1 === "") a.push(m1.replace(/\\'/g, "'"))
      // Remove backslash from \" in double quoted values.
      else if (m2 || m2 === "") a.push(m2.replace(/\\"/g, '"'))
      else if (m3 || m3 === "") a.push(m3)
      return "" // Return empty string.
    }
  )
  // Handle special case of empty last value.
  if (/,\s*$/.test(text)) a.push("")
  return a
}

export function downloadCSVTemplate(data: any, templateFileName: string) {
  const csvContent = `data:text/csv;charset=utf-8,${data
    .map((row: any[]) => row.join(","))
    .join("\n")}`
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", `${templateFileName}.csv`)
  document.body.appendChild(link)
  link.click()
}

export const history = {
  navigate: (a: any, b?: any) => {},
  location: (a: any, b?: any) => {},
}

export const handleResetFilter = (dataGridRef: any) => {
  dataGridRef.current?.instance.beginUpdate()
  dataGridRef.current?.instance.clearFilter()
  dataGridRef.current?.instance.getVisibleColumns().forEach((column: { dataField: null }) => {
    if (column.dataField != null) {
      dataGridRef.current?.instance.columnOption(
        column.dataField,
        "selectedFilterOperation",
        undefined
      )
    }
  })
  dataGridRef.current?.instance.endUpdate()
}

// export const extractResponseData = (data: Array<BenchmarkDataContainer>) => {
//   const codeItems: CodeItems[] = data.map((container) => ({
//     Name: container.Properties[1].Data,
//     Description: container.Properties[2].Data,
//     Id: container.Properties[0].Data,
//   }))
//   return codeItems
// }
