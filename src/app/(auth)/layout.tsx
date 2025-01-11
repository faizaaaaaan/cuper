import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/logo.svg"
          alt="Createreel Logo"
          width={130}
          height={130}
          className="mx-auto"
        />
      </div>
      {children}
    </div>
  );
}