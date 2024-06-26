
import { Button } from './../../../@/components/ui/button'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { singupValidation } from '@/lib/validation';
import Loader from '@/components/shared/Loader';
import { Link , useNavigate} from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount} from '@/lib/React-query/queriesAndMutation';
import { useUserContext } from '@/context/AuthContext';

export const SignupForm = () => {
    // const isLoading=false;
    const { toast } = useToast()
    const {checkAuthUser, isLoading:isUserLoading}=useUserContext()
    const navigate= useNavigate()

  const {mutateAsync:createUserAccount, isPending:isCreatingUser}= useCreateUserAccount()

  const {mutateAsync:signInAccount, isPending:isSigningIn}= useSignInAccount()


  // 1. Define your form.
  const form = useForm<z.infer<typeof singupValidation>>({
    resolver: zodResolver(singupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',

    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof singupValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newUser =await createUserAccount(values)

    console.log('newUser' , newUser)

    if(!newUser){
      return toast({
        title: "Sign up failed. Please try again",
      })
    }
    isSigningIn
    const session = await signInAccount({
      email:values.email,
      password:values.password,
    })
    if(!session){
      return toast({title:'sign in failed, Please try again.'})
    }

    
    const isLoggedIn= await checkAuthUser()
    if(isLoggedIn){
      form.reset();

      navigate('/') 
    }else{
    return    toast({title:'Sign up failed. Please try again.'})
    }
    // const session = await signInAccount()
  }
  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
          <img src="/assets/images/logo.svg" alt="logo " />
          <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'> Create a new account</h2>
          <p className='text-light-3 small-medium md:base-regular'>To use social Book enter your  details </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name </FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' className='shad-input' {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' className='shad-input' {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"  className='shad-button_primary'>
          {isCreatingUser || isSigningIn || isUserLoading ?(<div className='flex-center gap-2'>
             <Loader/> Loading...
          </div>):'Sign up '}
        </Button>
        <p className='text-small-regular text-light-2 text-center mt-2'>

          Already have an account ? <Link to='/sign-in' className='text-primary-500
          text-small-semibold ml-1'>Log in</Link>
        </p>
      </form>
      </div>
    </Form>

  )
}
