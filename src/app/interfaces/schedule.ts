export interface Schedule {
  _id?: string
  title: string,
  description: string,
  date: {
    startDate: Date,
    endDate: Date
  },
  image: string
}
