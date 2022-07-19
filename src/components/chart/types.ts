export type Dataset = {
  label?: string,
  backgroundColor: string | string[],
  data: number[]
}
export type Datasets = Dataset[]
export type ChartData = {
  labels: string[],
  datasets: Datasets
}