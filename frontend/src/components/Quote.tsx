export function Quote() {
  return (
    <div className="hidden h-full flex-col justify-center bg-zinc-100 px-16 lg:flex">
      <blockquote className="max-w-md text-xl font-medium text-zinc-800">
        "The customer support I received was exceptional. The support team
        went above and beyond to address my concerns."
      </blockquote>
      <div className="mt-4">
        <div className="font-semibold text-zinc-900">Julia Hart</div>
        <div className="text-sm text-zinc-500">CEO, Acme Inc</div>
      </div>
    </div>
  );
}
