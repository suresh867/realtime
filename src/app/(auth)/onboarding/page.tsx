import OnboardingForm from '@/components/elements/forms/OnboardingForm'
import { getUser } from '@/lib/actions/getUser'
import { getUserNames } from '@/lib/actions/getUserNames'
import { authOptions } from '@/lib/utils/auth'
import { getServerSession } from 'next-auth'
import Head from 'next/head'
import { redirect } from 'next/navigation'

const Page = async () => {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/login');
    const data = await getUser(session.user.id)
    const userInfoFromDb = data as User;
    if (!userInfoFromDb) return <div>Loading....</div>
    if (userInfoFromDb) redirect('/dashboard')
    const unData = await getUserNames();
    const usernames: string[] = unData as string[]
    const sessionData = {
        id: session.user.id!,
        email: session.user.email!,
        imageUrl: session.user.image!,
        fullName: session.user.name!,
    }
    return (
        <>
            <Head>
                <title>Complete Your Profile</title>
            </Head>
            <main className="h-full w-full flex flex-col">
                <section className='flex gap-4 py-2 flex-col-reverse lg:flex-row items-center justify-center w-full h-full min-h-screen sm:px-10 lg:px-20'>
                    <div className='w-full h-full lg:w-1/2 flex items-center justify-center'>
                        <OnboardingForm sessionData={sessionData} usernames={usernames} />
                    </div>
                </section>
            </main>
        </>
    )
}

export default Page
