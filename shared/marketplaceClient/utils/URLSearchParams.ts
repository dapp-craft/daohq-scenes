
type QueryParams = { [key: string]: string | number | boolean };

export class URLSearchParams {
  private params: QueryParams = {};

  constructor(params: QueryParams = {}) {
    this.params = params;
  }

  toString(){
    return Object.entries(this.params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  }

  public getParams(): Object {
    return this.params;
  }

  public append(key: string, value: string) {
    Object.assign(this.params, { [key]: value });
  }

}
