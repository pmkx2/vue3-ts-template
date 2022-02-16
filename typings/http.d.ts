/*! *****************************************************************************

***************************************************************************** */

declare namespace Http {
  interface options {
    url: string
    data?: any
    header?: any
    method?: string
    dataType?: string
    responseType?: string
    success(resolve?: any, reject?: any): void
    fail(reject?: any): void
    complete(resolve?: any): void
  }
}
