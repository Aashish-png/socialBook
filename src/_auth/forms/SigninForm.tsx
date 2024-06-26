
import { Button } from './../../../@/components/ui/button'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import {  singinValidation } from '@/lib/validation';
import Loader from '@/components/shared/Loader';
import { Link , useNavigate} from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast"
import {  useSignInAccount} from '@/lib/React-query/queriesAndMutation';
import { useUserContext } from '@/context/AuthContext';

export const SigninForm = () => {
    // const isLoading=false;
    const { toast } = useToast()
    const {checkAuthUser, isLoading:isUserLoading}=useUserContext()
    const navigate= useNavigate()

  // const {mutateAsync:createUserAccount, isPending:isCreatingUser}= useCreateUserAccount()

  const {mutateAsync:signInAccount}= useSignInAccount()


  // 1. Define your form.
  const form = useForm<z.infer<typeof singinValidation>>({
    resolver: zodResolver(singinValidation),
    defaultValues: {
      email: '',
      password: '',

    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof singinValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // const newUser =await createUserAccount(values)

    // console.log('newUser' , newUser)

    // if(!newUser){
    //   return toast({
    //     title: "Sign up failed. Please try again",
    //   })
    // }
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
          <img src="/assets/images/logo.png" alt="logo " />
          <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'> Log in to your Account </h2>
          <p className='text-light-3 small-medium md:base-regular'>Welcome back Please enter your details </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
      
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
          {isUserLoading?(<div className='flex-center gap-2'>
             <Loader/> Loading...
          </div>):'Sign in '}
        </Button>
        <p className='text-small-regular text-light-2 text-center mt-2'>

          Don't have an account ? <Link to='/sign-up' className='text-primary-500
          text-small-semibold ml-1'>sign up </Link>
        </p>
      </form>
      </div>
    </Form>

  )
}
