import { useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useJobsParams } from '@hooks/useJobsParams'
import { POSTAL_CODE_CITY_MAP } from '@helpers/postalCodeCityMap'
import type { DepartmentType, EmploymentType, RemoteOption, SeniorityLevel } from '@app-types/jobs'

interface AdvancedFiltersFormValues {
    postalCode: string
    city: string
    radius: string
    employmentType: EmploymentType | ''
    seniorityLevel: SeniorityLevel | ''
    remoteOption: RemoteOption | ''
    department: DepartmentType | ''
    postedAfter: string
    postedBefore: string
}

const RADIUS_OPTIONS = [10, 25, 50, 100]
const EMPLOYMENT_TYPE_OPTIONS: EmploymentType[] = ['Vollzeit', 'Teilzeit', 'Werkstudent', 'Praktikum', 'Minijob']
const SENIORITY_LEVEL_OPTIONS: SeniorityLevel[] = ['Junior', 'Mid', 'Senior']
const REMOTE_OPTION_OPTIONS: RemoteOption[] = ['Vor Ort', 'Hybrid', 'Remote']
const DEPARTMENT_OPTIONS: DepartmentType[] = [
    'dmTECH – Backend Engineering',
    'dmTECH – Web Experience',
    'dmTECH – E-Commerce Platform',
    'dmTECH – Platform Engineering',
    'dmTECH – Data & Analytics',
    'dmTECH – AI & Search',
    'dmTECH – Quality Engineering',
    'dmTECH – Product Design',
    'dmTECH – Agile Coaching',
    'dmTECH – Security',
    'dmTECH – Business Analysis',
    'dmTECH – Program Management',
    'dmTECH – Supply Chain IT',
    'dmTECH – SAP Solutions',
    'dmTECH – IT Support',
    'dmTECH – Infrastructure',
    'Verkauf & Beratung',
    'Logistik',
]

const DEFAULT_VALUES: AdvancedFiltersFormValues = {
    postalCode: '',
    city: '',
    radius: '',
    employmentType: '',
    seniorityLevel: '',
    remoteOption: '',
    department: '',
    postedAfter: '',
    postedBefore: '',
}

const labelClass = 'text-xs font-medium text-gray-500'
const inputClass =
    'w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dm-blue/20 focus:border-dm-blue text-gray-800 placeholder-gray-400 text-sm bg-white'
const selectClass =
    'w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dm-blue/20 focus:border-dm-blue text-gray-600 bg-white text-sm'

export const AdvancedFilters = () => {
    const {
        postalCode: postalCodeParam,
        city: cityParam,
        radius: radiusParam,
        employmentType: employmentTypeParam,
        seniorityLevel: seniorityLevelParam,
        remoteOption: remoteOptionParam,
        department: departmentParam,
        postedAfter: postedAfterParam,
        postedBefore: postedBeforeParam,
        updateParams,
    } = useJobsParams()

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        getValues,
        formState: { errors },
    } = useForm<AdvancedFiltersFormValues>({
        defaultValues: DEFAULT_VALUES,
    })

    useEffect(() => {
        reset({
            postalCode: postalCodeParam,
            city: cityParam,
            radius: radiusParam,
            employmentType: (employmentTypeParam as EmploymentType | '') || '',
            seniorityLevel: (seniorityLevelParam as SeniorityLevel | '') || '',
            remoteOption: (remoteOptionParam as RemoteOption | '') || '',
            department: (departmentParam as DepartmentType | '') || '',
            postedAfter: postedAfterParam,
            postedBefore: postedBeforeParam,
        })
    }, [])

    const postalCode = watch('postalCode')
    const mappedCity = POSTAL_CODE_CITY_MAP.get(postalCode.trim())

    useEffect(() => {
        if (mappedCity) {
            setValue('city', mappedCity)
        } else if (!postalCode.trim()) {
            setValue('city', '')
        }
    }, [postalCode, mappedCity, setValue])

    const onSubmit: SubmitHandler<AdvancedFiltersFormValues> = ({
        city,
        postalCode,
        radius,
        employmentType,
        seniorityLevel,
        remoteOption,
        department,
        postedAfter,
        postedBefore,
    }) => {
        updateParams({
            postalCode,
            city,
            radius,
            employmentType,
            seniorityLevel,
            remoteOption,
            department,
            postedAfter,
            postedBefore,
        })
    }

    const handleClearFilters = () => {
        reset(DEFAULT_VALUES)
        updateParams({
            postalCode: '',
            city: '',
            radius: '',
            employmentType: '',
            seniorityLevel: '',
            remoteOption: '',
            department: '',
            postedAfter: '',
            postedBefore: '',
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="pt-3 border-t border-gray-100">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                <label className="flex flex-col gap-1">
                    <span className={labelClass}>Postal code</span>
                    <input
                        {...register('postalCode', { pattern: { value: /^\d{5}$/, message: 'Must be 5 digits' } })}
                        type="text"
                        className={inputClass}
                    />
                    {errors.postalCode && <span className="text-xs text-red-500">{errors.postalCode.message}</span>}
                </label>
                <label className="flex flex-col gap-1">
                    <span className={labelClass}>City</span>
                    <input
                        {...register('city')}
                        type="text"
                        readOnly={!!mappedCity}
                        className={
                            mappedCity
                                ? 'w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed text-sm'
                                : inputClass
                        }
                    />
                </label>
                <label className="flex flex-col gap-1">
                    <span className={labelClass}>Radius</span>
                    <select
                        {...register('radius', {
                            validate: (v) =>
                                v && !getValues('city') && !getValues('postalCode')
                                    ? 'City or postal code required'
                                    : true,
                        })}
                        className={selectClass}
                    >
                        <option value="">Any</option>
                        {RADIUS_OPTIONS.map((r) => (
                            <option key={r} value={r}>
                                {r} km
                            </option>
                        ))}
                    </select>
                    {errors.radius && <span className="text-xs text-red-500">{errors.radius.message}</span>}
                </label>
                <label className="flex flex-col gap-1">
                    <span className={labelClass}>Employment type</span>
                    <select {...register('employmentType')} className={selectClass}>
                        <option value="">Any</option>
                        {EMPLOYMENT_TYPE_OPTIONS.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="flex flex-col gap-1">
                    <span className={labelClass}>Seniority</span>
                    <select {...register('seniorityLevel')} className={selectClass}>
                        <option value="">Any</option>
                        {SENIORITY_LEVEL_OPTIONS.map((l) => (
                            <option key={l} value={l}>
                                {l}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="flex flex-col gap-1">
                    <span className={labelClass}>Remote</span>
                    <select {...register('remoteOption')} className={selectClass}>
                        <option value="">Any</option>
                        {REMOTE_OPTION_OPTIONS.map((o) => (
                            <option key={o} value={o}>
                                {o}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="col-span-2 sm:col-span-1 lg:col-span-2 flex flex-col gap-1">
                    <span className={labelClass}>Department</span>
                    <select {...register('department')} className={selectClass}>
                        <option value="">Any</option>
                        {DEPARTMENT_OPTIONS.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="flex flex-col gap-1">
                    <span className={labelClass}>Posted after</span>
                    <input
                        {...register('postedAfter', {
                            validate: (v) => {
                                const before = getValues('postedBefore')
                                if (v && before && v > before) return 'Must be before end date'
                                return true
                            },
                        })}
                        type="date"
                        className={inputClass}
                    />
                    {errors.postedAfter && <span className="text-xs text-red-500">{errors.postedAfter.message}</span>}
                </label>
                <label className="flex flex-col gap-1">
                    <span className={labelClass}>Posted before</span>
                    <input
                        {...register('postedBefore', {
                            validate: (v) => {
                                const after = getValues('postedAfter')
                                if (v && after && v < after) return 'Must be after start date'
                                return true
                            },
                        })}
                        type="date"
                        className={inputClass}
                    />
                    {errors.postedBefore && <span className="text-xs text-red-500">{errors.postedBefore.message}</span>}
                </label>
            </div>
            <div className="flex justify-end gap-2 mt-3">
                <button
                    type="button"
                    onClick={handleClearFilters}
                    className="px-4 py-2.5 border border-gray-300 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-dm-blue/20 cursor-pointer"
                >
                    Clear filters
                </button>
                <button
                    type="submit"
                    className="px-6 py-2.5 bg-dm-blue text-white rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-dm-blue/30 focus:ring-offset-2 cursor-pointer"
                >
                    Apply
                </button>
            </div>
        </form>
    )
}
