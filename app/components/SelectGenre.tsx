export default function SelectGenre({ value, title }) {
  return (
    <form className="flex items-center gap-1 bg-secondary-200 p-2 rounded-md border border-primary-200 text-primary-900">
      <input
        type="checkbox"
        value={value}
        className="w-4 h-4 text-primary-500 border-gray-300 cursor-pointer"
      />
      <label>{title}</label>
    </form>
  );
}
