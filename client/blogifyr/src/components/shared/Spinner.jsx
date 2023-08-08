import 'tailwindcss/tailwind.css';

const Spinner = () => {
    return (
        <div className='flex justify-center items-center'>

        <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
        Processing
        </div>
    )
}

export default Spinner;