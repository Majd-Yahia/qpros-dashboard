import RootLayout from '@/components/Layout';
export default Index;

function Index() {
    return (
        <RootLayout>
            <main className="flex-1">
                <div className="py-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                    </div>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                        <div className="py-4 mx-auto w-full flex justify-center items-center">
                            <h1>First Post</h1>
                        </div>
                    </div>
                </div>
            </main>
        </RootLayout>
    );
}
