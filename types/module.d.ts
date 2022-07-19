declare module '*/provinces.json' {
  type provinceItem = {
    code: string, name: string, children?: any[]
  }
  const value: provinceItem[];
  export default value;
}

declare module '*/cities.json' {
  type cityItem = { code: string, name: string, provinceCode: string, children?: any[] }
  const value: cityItem[];
  export default value;
}

declare module '*/areas.json' {
  type areaItem = { code: string, name: string, cityCode: string, provinceCode: string, children?: any[] }
  const value: areaItem[];
  export default value;
}

declare module '*.json' {
  const value: any;
  export default value;
}
declare module '*.svg' {
  const value: any;
  export default value;
}