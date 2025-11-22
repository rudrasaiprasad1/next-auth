interface PostPageProps {
  params: {
    id: string;
  };
}
export default async function ProfileIdPage({ params }: PostPageProps) {
  const { id } = await params;
  return (
    <div className="flex h-screen justify-center align-middle  items-center inset-0 ">
      <div className="flex flex-col items-center align-middle justify-center inset-0 gap-3">
        <h1 className="text-3xl bg-amber-500 text-black font-bold rounded-lg p-2">
          Profile : {`${id}`}
        </h1>

        <button type="submit" className="border rounded-lg p-1 w-full ">
          {`${id}`}
        </button>
      </div>
    </div>
  );
}
