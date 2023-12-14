export default function PrimaryButton({
  className = '',
  disabled,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className={
        `inline-flex items-center px-4 py-2 border border-transparent rounded-md text-white text-sm  ${
          disabled
            ? 'opacity-50 bg-blue-500 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150'
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
