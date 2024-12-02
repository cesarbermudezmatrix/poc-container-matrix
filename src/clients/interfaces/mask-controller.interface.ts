export interface IObj {
  [property: string]: any;
}

export interface IMaskController {
  init(data: IObj): Array<any> | IObj;
}
