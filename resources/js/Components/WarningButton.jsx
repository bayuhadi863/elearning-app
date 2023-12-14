export default function WarningButton({
  className = '',
  disabled,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className={
        `inline-flex items-center px-4 py-2 text-gray-900 text-sm border border-transparent rounded-md ${
          disabled
            ? 'opacity-50 bg-amber-400 hover:bg-amber-400 cursor-not-allowed'
            : ' bg-amber-400 hover:bg-amber-500 focus:bg-amber-500 active:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition ease-in-out duration-150'
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
