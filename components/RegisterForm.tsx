import { useState } from 'react';
import { useRouter } from 'next/router';  // Import the useRouter hook

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const router = useRouter();  // Initialize the useRouter hook

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        if (password !== confirmPassword) {
            console.log('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch(`${process.env.BACKEND_URL}/authentication/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {

                console.log("Successfully registered");
                router.push('/dashboard');  // Redirect to dashboard

                // Handle successful registration
            } else {
                console.log("Failed to register");
                // Handle error
            }
        } catch (err) {
            console.error(err);
            // Handle error
        } finally {
            setIsLoading(false);
        }
    };

    const checkPasswordMatch = (currentConfirmPassword: string) => {
        if (timer) {
            clearTimeout(timer);
        }
    
        setTimer(setTimeout(() => {
            if (password !== currentConfirmPassword) {
                setPasswordMismatch(true);
            } else {
                setPasswordMismatch(false);
            }
        }, 500));
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                    <input id="email" className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                        required
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                </div>
                <div className="mt-2">
                    <input id="password" className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name="password" type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                </div>
                <div className="mt-2">
                    <input id="confirmPassword"
                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => { 
                            setConfirmPassword(e.target.value); 
                            checkPasswordMatch(e.target.value); 
                        }}
                        required
                    />
                    {passwordMismatch && <span className="text-xs text-red-500">Passwords do not match</span>}
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Registering In...' : 'Register'}
                </button>
            </div>
        </form>
    )
}