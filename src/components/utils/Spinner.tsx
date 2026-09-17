interface SpinnerProps {
    text?: string
    size?: 'small' | 'medium' | 'big'
}

const sizeMap = {
    small: 'h-5 w-5 border-2',
    medium: 'h-10 w-10 border-4',
    big: 'h-16 w-16 border-4',
}

export const Spinner = ({ text, size = 'medium' }: SpinnerProps) => (
    <div className="flex flex-col items-center gap-3">
        <div className={`animate-spin rounded-full border-dm-blue border-t-dm-yellow ${sizeMap[size]}`} />
        {text && <p className="text-dm-blue text-sm font-medium">{text}</p>}
    </div>
)
