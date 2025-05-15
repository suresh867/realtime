"use client"
// import LoadingPage from '@/components/pages/LoadingPage'
import { Button } from '@/components/ui/button'
import { signIn, useSession } from "next-auth/react"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
const Page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/onboarding");
        }
    }, [status, router]);

    async function loginWithGoogle() {
        setIsLoading(true);
        try {
            await signIn("google", { callbackUrl: "/onboarding" });
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    if (status === "loading") {
        return <div>Loading....</div>
    }
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid  gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Hassle free login with Google and start shopping.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <Button
                            variant="outline"
                            className="w-full flex items-center gap-2 py-7 cursor-pointer"
                            onClick={loginWithGoogle}
                        >
                            <div className='h-7 w-7 flex items-center justify-center'>
                                <svg
                                    viewBox="-0.5 0 48 48"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#000000"
                                >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <title>Google-color</title>
                                        <desc>Created with Sketch.</desc>
                                        <defs> </defs>
                                        <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                                <g id="Google" transform="translate(401.000000, 860.000000)">
                                                    <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4">
                                                    </path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            Continue with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Button
                            onClick={loginWithGoogle}
                            className={"p-0 bg-transparent underline hover:bg-transparent text-muted-foreground"}
                        >
                            {isLoading && "loading"}
                            Sign up
                        </Button>
                    </div>
                </div>
            </div>
            <div className="bg-muted lg:block">
                <Image
                    src="/login.jpg"
                    alt="Image"
                    width={1200}
                    height={1500}
                    className="h-[60vh] w-full object-contain relative top-36"
                />
            </div>
        </div>
    )
}

export default Page