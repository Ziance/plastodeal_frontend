interface IResponseTransformerOptions {
  hierachreyFieldName?: string
  booleanFields?: string[]
}

interface IResponseTransformerData {
  Properties: Array<any>
}

export default class ResponseTransformer {
  private data: Array<IResponseTransformerData> | IResponseTransformerData | any

  private options?: IResponseTransformerOptions

  constructor(
    data: Array<IResponseTransformerData> | IResponseTransformerData,
    options?: IResponseTransformerOptions
  ) {
    this.data = data
    this.options = options
  }

  public transformResponsetoJSON() {
    if (this.data instanceof Array) {
      return this.transformArrayResponsetoJSON()
    }
    return this.transformObjectResponsetoJSON()
  }

  private transformObjectResponsetoJSON() {
    this.data.Properties.forEach((item: any) => {
      this.data[item.Name] = item.Data
    })
    delete this.data.Properties
    return this.data
  }

  private transformArrayResponsetoJSON() {
    return this.data.map((item: any) => {
      const data = item
      data.Properties.forEach((property: any) => {
        const field = property
        if (field.Data === "False") {
          // TODO: need to pass the colum name as well which we need to convert to boolean
          data[field.Name] = ResponseTransformer.convertToBoolean(field.Data)
          data[`${field.Name}Caption`] = "No"
        } else if (field.Data === "True") {
          // TODO: need to pass the colum name as well which we need to convert to boolean
          data[field.Name] = ResponseTransformer.convertToBoolean(field.Data)
          data[`${field.Name}Caption`] = "Yes"
        } else if (
          this.options &&
          this.options.hierachreyFieldName &&
          this.options.hierachreyFieldName === field.Name
        ) {
          field.Data = field.Data.replaceAll("][", ",")
          data[field.Name] = field.Data === "" ? [] : JSON.parse(field.Data)
        } else if (field.Name === "Date") {
          data.UnixDate = Date.parse(field.Data)
        } else {
          data[field.Name] = field.Data
        }
        delete data.Properties
      })
      return data
    })
  }

  private static convertToBoolean(data: string) {
    let field: unknown = data
    if (data === "False") {
      field = false
    } else if (data === "True") {
      field = true
    }
    return field
  }
}
