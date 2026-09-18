export type EmploymentType = 'Vollzeit' | 'Teilzeit' | 'Werkstudent' | 'Praktikum' | 'Minijob'
export type SeniorityLevel = 'Junior' | 'Mid' | 'Senior'
export type RemoteOption = 'Hybrid' | 'Remote' | 'Vor Ort'
export type DepartmentType =
    | 'dmTECH – Backend Engineering'
    | 'dmTECH – Web Experience'
    | 'dmTECH – E-Commerce Platform'
    | 'dmTECH – Platform Engineering'
    | 'dmTECH – Data & Analytics'
    | 'dmTECH – AI & Search'
    | 'dmTECH – Quality Engineering'
    | 'dmTECH – Product Design'
    | 'dmTECH – Agile Coaching'
    | 'dmTECH – Security'
    | 'dmTECH – Business Analysis'
    | 'dmTECH – Program Management'
    | 'dmTECH – Supply Chain IT'
    | 'dmTECH – SAP Solutions'
    | 'dmTECH – IT Support'
    | 'dmTECH – Infrastructure'
    | 'Verkauf & Beratung'
    | 'Logistik'

export interface JobLocation {
    city: string
    postalCode: string
    lat: number | null
    lon: number | null
}

export interface Job {
    id: string
    title: string
    department: DepartmentType
    location: JobLocation
    employmentType: EmploymentType
    seniorityLevel: SeniorityLevel | null
    remote: RemoteOption
    tags: string[]
    postedAt: string
    description: string
}
