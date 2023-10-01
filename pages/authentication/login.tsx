import DefaultLayout from '@/components/DefaultLayout';
import LoginForm from '@/components/LoginForm';
import Link from 'next/link';

export default function Login() {
  return (
    <DefaultLayout>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />


          <Link className="mt-10 text-center text-sm text-gray-500" href="/authentication/register">
              Not a member?
          </Link>
        </div>
      </div>
    </DefaultLayout>
  )
}
