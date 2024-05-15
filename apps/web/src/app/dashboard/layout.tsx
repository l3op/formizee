import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { Navbar, Sidebar, Content } from './components';

async function DashboardLayout({
  children
}: Readonly<{ children: React.ReactNode }>): Promise<JSX.Element> {
  const supabase = createServerClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user.id) {
    redirect('/login');
  }

  return (
    <main className="flex h-full flex-col items-center overflow-x-clip bg-black lg:justify-center">
      <Navbar />
      <div className="flex h-[calc(100vh-3.5rem)] w-full flex-row">
        <Sidebar />
        <Content>{children}</Content>
      </div>
    </main>
  );
}

export default DashboardLayout;
