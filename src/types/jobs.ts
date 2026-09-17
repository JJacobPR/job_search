export type EmploymentType = 'Vollzeit' | 'Teilzeit' | 'Werkstudent' | 'Praktikum' | 'Minijob'
export type SeniorityLevel = 'Junior' | 'Mid-Level' | 'Senior'

export interface JobLocation {
    city: string
    postalCode: string
    lat: number | null
    lon: number | null
}

export interface Job {
    id: string
    title: string
    department: string
    location: JobLocation
    employmentType: EmploymentType
    seniorityLevel: SeniorityLevel | null
    remote: string
    tags: string[]
    postedAt: string
    description: string
}
